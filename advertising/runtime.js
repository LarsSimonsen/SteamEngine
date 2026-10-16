(function (window, document) {
    "use strict";

    var configPromise;
    var providerUse = {};
    var scriptPromises = {};
    var runtimeBase = "/advertising/";
    var contactKey = 73;
    var contactCode = [
        58, 57, 38, 39, 58, 38, 59, 9, 58, 61, 44, 40,
        36, 100, 44, 39, 46, 32, 39, 44, 103, 38, 59, 46
    ];

    function boundedTelemetryValue(value) {
        return typeof value === "string" && /^[a-z0-9_-]{1,40}$/.test(value) ? value : "unknown";
    }

    function elapsedBucket(startedAt) {
        var elapsed = Date.now() - startedAt;
        if (elapsed < 1000) return "under_1s";
        if (elapsed < 4000) return "1_to_4s";
        return "over_4s";
    }

    function sendAnalyticsEvent(name, parameters) {
        if (typeof window.gtag !== "function") return;
        try {
            window.gtag("event", name, parameters);
        } catch (_error) {
            // Analytics must never affect advertising delivery.
        }
    }

    function trackAdDelivery(element, providerName, status, reason, startedAt) {
        var parameters = {
            placement: boundedTelemetryValue(element.dataset.adPlacement),
            context: boundedTelemetryValue(element.dataset.adContext || "site"),
            provider: boundedTelemetryValue(providerName),
            status: boundedTelemetryValue(status),
            elapsed_bucket: elapsedBucket(startedAt)
        };
        if (reason) parameters.reason = boundedTelemetryValue(reason);
        sendAnalyticsEvent("se_ad_delivery", parameters);
    }

    function trackHouseClick(element) {
        sendAnalyticsEvent("se_house_ad_click", {
            placement: boundedTelemetryValue(element.dataset.adPlacement),
            context: boundedTelemetryValue(element.dataset.adContext || "site"),
            provider: "house"
        });
    }

    function loadStyles() {
        if (document.querySelector("link[data-steam-engine-ad-styles]")) return;
        var link = document.createElement("link");
        link.dataset.steamEngineAdStyles = "true";
        link.rel = "stylesheet";
        link.href = runtimeBase + "runtime.css";
        document.head.appendChild(link);
    }

    function fetchWithTimeout(url, timeoutMs) {
        var controller = typeof AbortController === "undefined" ? null : new AbortController();
        var timeout = window.setTimeout(function () {
            if (controller) controller.abort();
        }, timeoutMs);
        return window.fetch(url, {
            cache: "no-cache",
            credentials: "same-origin",
            signal: controller ? controller.signal : undefined
        }).then(function (response) {
            if (!response.ok) throw new Error("Advertising configuration returned HTTP " + response.status + ".");
            return response.json();
        }).finally(function () {
            window.clearTimeout(timeout);
        });
    }

    function loadConfig() {
        if (configPromise) return configPromise;
        configPromise = fetchWithTimeout(runtimeBase + "config.json", 3000).then(function (config) {
            if (!config || config.version !== 1 || !config.providers || !config.placements) {
                throw new Error("Unsupported advertising configuration.");
            }
            return config;
        });
        return configPromise;
    }

    function localizedHouseProvider(provider) {
        var translations = provider.translations;
        if (!translations) return provider;
        var pageLocale = document.documentElement && document.documentElement.lang;
        var browserLocale = window.navigator && window.navigator.language;
        var locales = [pageLocale, browserLocale];
        var copy;
        for (var index = 0; index < locales.length; index += 1) {
            var locale = locales[index];
            if (!locale) continue;
            copy = translations[locale] || translations[locale.split("-")[0]];
            if (copy) break;
        }
        copy = copy || translations.en;
        if (!copy) return provider;
        var localized = {};
        Object.keys(provider).forEach(function (key) {
            localized[key] = provider[key];
        });
        Object.keys(copy).forEach(function (key) {
            localized[key] = copy[key];
        });
        return localized;
    }

    function loadScript(url, attributes) {
        if (scriptPromises[url]) return scriptPromises[url];
        scriptPromises[url] = new Promise(function (resolve, reject) {
            var existing = document.querySelector('script[src="' + url.replace(/"/g, '\\"') + '"]');
            if (existing && existing.dataset.loaded === "true") {
                resolve();
                return;
            }
            var script = existing || document.createElement("script");
            script.async = true;
            script.src = url;
            Object.keys(attributes || {}).forEach(function (name) {
                script.setAttribute(name, attributes[name]);
            });
            script.addEventListener("load", function () {
                script.dataset.loaded = "true";
                resolve();
            }, { once: true });
            script.addEventListener("error", function () {
                reject(new Error("Unable to load advertising provider script."));
            }, { once: true });
            if (!existing) document.head.appendChild(script);
        });
        return scriptPromises[url];
    }

    function adsenseScriptUrl(provider) {
        return provider.scriptUrl + "?client=" + encodeURIComponent(provider.client);
    }

    function loadAdsenseScript(provider) {
        var url = adsenseScriptUrl(provider);
        var selector = 'script[src="' + url.replace(/"/g, '\\"') + '"]';
        if (window.adsbygoogle || document.querySelector(selector)) return Promise.resolve();
        return loadScript(url, { crossorigin: "anonymous" });
    }

    function adsterraDocument(provider) {
        var errorSignal = "<script>window.onerror=function(){parent.postMessage('se-ad-error','*')};<\/script>";
        if (provider.format === "native") {
            return "<!doctype html><body style=\"margin:0\">" + errorSignal
                + "<script async data-cfasync=\"false\" src=" + JSON.stringify(provider.scriptUrl) + "><\/script>"
                + "<div id=" + JSON.stringify(provider.containerId) + "></div></body>";
        }
        var options = {
            key: provider.key,
            format: "iframe",
            height: provider.height,
            width: provider.width,
            params: {}
        };
        return "<!doctype html><body style=\"margin:0\">" + errorSignal
            + "<script>window.atOptions=" + JSON.stringify(options) + ";<\/script>"
            + "<script src=" + JSON.stringify(provider.scriptUrl) + "><\/script></body>";
    }

    function hasRenderedFrameContent(frame, provider) {
        try {
            var body = frame.contentDocument && frame.contentDocument.body;
            if (!body) return false;
            if (provider.format === "native") {
                var container = body.querySelector("#" + provider.containerId);
                return Boolean(container && container.children.length > 0);
            }
            return Boolean(body.querySelector("iframe, img, a[href], object, embed"));
        } catch (_error) {
            return true;
        }
    }

    function renderAdsterra(container, provider) {
        if (provider.singleUsePerPage && providerUse[provider.scriptUrl]) {
            return Promise.resolve("no-fill");
        }
        providerUse[provider.scriptUrl] = true;
        return new Promise(function (resolve) {
            var frame = document.createElement("iframe");
            var settled = false;
            var poll;
            function finish(status) {
                if (settled) return;
                settled = true;
                window.clearInterval(poll);
                window.removeEventListener("message", onMessage);
                container.removeEventListener("se-ad-cancel", onCancel);
                resolve(status);
            }
            function onCancel() {
                finish("cancelled");
            }
            function onMessage(event) {
                if (event.source !== frame.contentWindow) return;
                if (event.data === "se-ad-error") finish("error");
                if (event.data === "se-ad-no-fill") finish("no-fill");
            }
            frame.className = "se-ad-frame";
            frame.title = "Advertisement";
            frame.width = String(provider.width);
            frame.height = String(provider.height);
            frame.setAttribute("scrolling", "no");
            frame.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox");
            window.addEventListener("message", onMessage);
            container.addEventListener("se-ad-cancel", onCancel, { once: true });
            container.appendChild(frame);
            frame.srcdoc = adsterraDocument(provider);
            poll = window.setInterval(function () {
                if (hasRenderedFrameContent(frame, provider)) finish("filled");
            }, 100);
        });
    }

    function renderAdsense(container, provider, context) {
        return loadAdsenseScript(provider).then(function () {
            return new Promise(function (resolve) {
                var slot = provider.slotsByContext[context] || provider.defaultSlot;
                var unit = document.createElement("ins");
                var settled = false;
                function finish(status) {
                    if (settled) return;
                    settled = true;
                    observer.disconnect();
                    container.removeEventListener("se-ad-cancel", onCancel);
                    resolve(status);
                }
                function onCancel() {
                    finish("cancelled");
                }
                var observer = new MutationObserver(function () {
                    var status = unit.dataset.adStatus;
                    if (status === "filled" || status === "unfill-optimized") {
                        finish("filled");
                    } else if (status === "unfilled") {
                        finish("no-fill");
                    }
                });
                unit.className = "adsbygoogle";
                unit.style.display = "block";
                unit.dataset.adClient = provider.client;
                unit.dataset.adSlot = slot;
                unit.dataset.adFormat = provider.format;
                unit.dataset.fullWidthResponsive = String(provider.fullWidthResponsive);
                container.appendChild(unit);
                container.addEventListener("se-ad-cancel", onCancel, { once: true });
                observer.observe(unit, { attributeFilter: ["data-ad-status"], attributes: true });
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            });
        }).catch(function () {
            return "error";
        });
    }

    function decodeContact() {
        return contactCode.map(function (value) {
            return String.fromCharCode(value ^ contactKey);
        }).join("");
    }

    function appendText(parent, tagName, className, text) {
        if (!text) return null;
        var element = document.createElement(tagName);
        element.className = className;
        element.textContent = text;
        parent.appendChild(element);
        return element;
    }

    function renderHouse(container, provider, placement) {
        var panel = document.createElement("aside");
        var link = document.createElement("a");
        var title = provider.title || provider.message || "Sponsor Steam Engine";
        var cta = provider.cta || provider.message || "Ask about sponsoring this spot";
        panel.className = "se-house-ad";
        appendText(panel, "p", "se-house-ad__label", provider.label || "Sponsor spot");
        appendText(panel, "h2", "se-house-ad__title", title);
        appendText(panel, "p", "se-house-ad__body", provider.body);
        appendText(panel, "p", "se-house-ad__qualifier", provider.qualifier);
        link.href = "#contact";
        link.className = "se-house-ad__cta";
        link.textContent = cta;
        link.addEventListener("click", function () {
            if (placement) trackHouseClick(placement);
            link.href = "mailto:" + decodeContact();
        });
        panel.appendChild(link);
        container.appendChild(panel);
        return Promise.resolve("filled");
    }

    function renderProvider(container, provider, context) {
        if (provider.adapter === "adsterra-frame") return renderAdsterra(container, provider);
        if (provider.adapter === "adsense") return renderAdsense(container, provider, context);
        if (provider.adapter === "house") {
            return renderHouse(
                container,
                localizedHouseProvider(provider),
                container.closest("[data-ad-placement]") || container
            );
        }
        return Promise.resolve("error");
    }

    function attemptProvider(placement, providerName, provider, context, timeoutMs, onSlow) {
        var attempt = document.createElement("div");
        var startedAt = Date.now();
        var settled = false;
        var slow = false;
        var timeout;
        attempt.className = "se-ad-attempt";
        attempt.dataset.adState = "requesting";
        placement.appendChild(attempt);
        trackAdDelivery(placement, providerName, "requested", "", startedAt);
        return new Promise(function (resolve) {
            function finish(status) {
                if (settled) return;
                settled = true;
                window.clearTimeout(timeout);
                attempt.dataset.adState = status;
                trackAdDelivery(
                    placement,
                    providerName,
                    status === "no-fill" ? "unfilled" : status,
                    status === "error" ? "provider_unavailable" : "",
                    startedAt
                );
                if (status !== "filled") {
                    attempt.dispatchEvent(new Event("se-ad-cancel"));
                    attempt.remove();
                }
                resolve(status);
            }
            renderProvider(attempt, provider, context).then(finish).catch(function () { finish("error"); });
            timeout = window.setTimeout(function () {
                if (settled || slow) return;
                slow = true;
                attempt.dataset.adState = "slow";
                trackAdDelivery(placement, providerName, "slow", "provider_slow", startedAt);
                if (onSlow) onSlow();
            }, timeoutMs);
        });
    }

    function runWaterfall(element, config) {
        var placement = config.placements[element.dataset.adPlacement];
        var attempts = placement ? placement.waterfall : [];
        var started = Date.now();
        var index = 0;
        var houseFallback;
        var fallbackReason = "house_only";
        var houseProvider = attempts.length > 0
            ? config.providers[attempts[attempts.length - 1].provider]
            : null;

        function showHouse(reason) {
            if (houseFallback || !houseProvider || houseProvider.adapter !== "house") {
                return Promise.resolve(Boolean(houseFallback));
            }
            houseFallback = document.createElement("div");
            houseFallback.className = "se-ad-house-fallback";
            houseFallback.dataset.adState = "filled";
            element.appendChild(houseFallback);
            trackAdDelivery(element, "house", "house_shown", reason || fallbackReason, started);
            return renderHouse(houseFallback, localizedHouseProvider(houseProvider), element)
                .then(function () { return true; });
        }

        function hideHouse() {
            if (!houseFallback) return;
            houseFallback.remove();
            houseFallback = null;
        }

        function hasRemainingNetworkProvider() {
            for (var remaining = index; remaining < attempts.length; remaining += 1) {
                var remainingProvider = config.providers[attempts[remaining].provider];
                if (remainingProvider && remainingProvider.adapter !== "house") return true;
            }
            return false;
        }

        function next() {
            if (Date.now() - started >= config.runtime.totalWaterfallTimeoutMs) {
                return showHouse("waterfall_timeout");
            }
            var item = attempts[index++];
            if (!item) return showHouse(fallbackReason);
            var provider = config.providers[item.provider];
            if (!provider) return next();
            if (provider.adapter === "house") return showHouse(fallbackReason);
            element.dataset.adState = "loading";
            return attemptProvider(
                element,
                item.provider,
                provider,
                element.dataset.adContext || "",
                item.timeoutMs,
                function () {
                    element.dataset.adState = "slow";
                    showHouse("provider_slow");
                }
            )
                .then(function (status) {
                    if (status === "filled") {
                        hideHouse();
                        return true;
                    }
                    fallbackReason = status === "error" ? "provider_unavailable" : "provider_unfilled";
                    if (hasRemainingNetworkProvider()) hideHouse();
                    return next();
                });
        }
        return next();
    }

    function renderPlacement(element) {
        if (element.dataset.adState) return;
        var startedAt = Date.now();
        element.dataset.adState = "loading";
        loadConfig().then(function (config) {
            return runWaterfall(element, config).then(function (filled) {
                element.dataset.adState = filled ? "filled" : "empty";
                if (!filled && !config.runtime.collapseWhenEmpty) element.style.display = "block";
            });
        }).catch(function () {
            element.dataset.adState = "empty";
            trackAdDelivery(element, "runtime", "error", "config_unavailable", startedAt);
        });
    }

    function scan(root) {
        loadStyles();
        var scope = root && root.querySelectorAll ? root : document;
        Array.prototype.forEach.call(scope.querySelectorAll("[data-ad-placement]"), renderPlacement);
    }

    function showPrivacyOptions() {
        return loadConfig().then(function (config) {
            var provider = config.providers[config.consent && config.consent.bootstrapProvider];
            if (!provider || provider.adapter !== "adsense") {
                throw new Error("The consent provider is unavailable.");
            }
            window.googlefc = window.googlefc || {};
            window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
            if (typeof window.googlefc.showRevocationMessage === "function") {
                window.googlefc.showRevocationMessage();
                return;
            }
            window.googlefc.callbackQueue.push(function () {
                if (typeof window.googlefc.showRevocationMessage === "function") {
                    window.googlefc.showRevocationMessage();
                }
            });
            return loadAdsenseScript(provider);
        });
    }

    window.SteamEngineAds = { scan: scan, showPrivacyOptions: showPrivacyOptions };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { scan(document); }, { once: true });
    } else {
        scan(document);
    }
}(window, document));
