import fs from "node:fs";
import path from "node:path";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const runtimeSource = fs.readFileSync(path.resolve("advertising/runtime.js"), "utf8");
const runtimeStyles = fs.readFileSync(path.resolve("advertising/runtime.css"), "utf8");
const adsterraScriptUrl = "https://www.highperformanceformat.com/test-zone/invoke.js";
const adsenseScriptUrl = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-test";

const prepareAnalytics = (): ReturnType<typeof vi.fn> => {
    const gtag = vi.fn();
    Object.defineProperty(window, "gtag", {
        configurable: true,
        writable: true,
        value: gtag,
    });
    return gtag;
};

const houseProvider = {
    adapter: "house",
    label: "Sponsor spot",
    title: "Sponsor Steam Engine",
    body: "Reach over 20k monthly users of vaping calculators, battery references, and coil-building tools.",
    qualifier: "Relevant technical products and services only.",
    cta: "Ask about sponsoring this spot",
};

const testConfig = {
    version: 1,
    runtime: {
        collapseWhenEmpty: true,
        configTimeoutMs: 100,
        totalWaterfallTimeoutMs: 1000,
    },
    consent: { mode: "none", timeoutMs: 100 },
    providers: {
        first: { adapter: "unavailable" },
        second: { adapter: "unavailable" },
        house: houseProvider,
    },
    placements: {
        "calculator-footer": {
            waterfall: [
                { provider: "first", timeoutMs: 100 },
                { provider: "second", timeoutMs: 100 },
                { provider: "house", timeoutMs: 100 },
            ],
        },
    },
};

const evaluateRuntime = (config: unknown): void => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(config),
        ok: true,
    }));
    window.eval(runtimeSource);
};

const adsterraConfig = (waterfall: unknown[]) => ({
    version: 1,
    runtime: {
        collapseWhenEmpty: true,
        configTimeoutMs: 100,
        totalWaterfallTimeoutMs: 1000,
    },
    consent: { mode: "none", timeoutMs: 100 },
    providers: {
        adsterra: {
            adapter: "adsterra-frame",
            format: "banner",
            key: "test-zone",
            scriptUrl: adsterraScriptUrl,
            width: 300,
            height: 250,
            singleUsePerPage: true,
        },
        adsense: {
            adapter: "adsense",
            client: "ca-pub-test",
            scriptUrl: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
            defaultSlot: "1234567890",
            slotsByContext: {},
            format: "auto",
            fullWidthResponsive: true,
        },
        house: houseProvider,
    },
    placements: {
        "calculator-footer": { waterfall },
    },
});

const addPlacement = (count = 1): void => {
    document.body.innerHTML = Array.from({ length: count }, () => '<div aria-label="Advertisement" '
        + 'data-ad-context="ohm" data-ad-placement="calculator-footer"></div>').join("");
};

const getPlacement = (index = 0): HTMLElement => document.querySelectorAll<HTMLElement>(
    '[data-ad-placement="calculator-footer"]',
)[index];

const waitForSlowAd = async (placement = getPlacement()): Promise<void> => {
    await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "slow"));
    await waitFor(() => expect(placement.querySelector(".se-ad-house-fallback")).not.toBeNull());
};

const sendAdsterraMessage = (message: "se-ad-error" | "se-ad-no-fill", frame: HTMLIFrameElement): void => {
    window.dispatchEvent(new MessageEvent("message", {
        data: message,
        source: frame.contentWindow,
    }));
};

const prepareAdsense = (status: "filled" | "unfilled"): void => {
    const script = document.createElement("script");
    script.setAttribute("src", adsenseScriptUrl);
    script.dataset.loaded = "true";
    document.head.appendChild(script);
    Object.defineProperty(window, "adsbygoogle", {
        configurable: true,
        writable: true,
        value: {
            push: vi.fn(() => {
                const unit = document.querySelector<HTMLElement>("ins.adsbygoogle");
                if (unit) unit.dataset.adStatus = status;
            }),
        },
    });
};

const adsenseTcfConfig = () => ({
    ...adsterraConfig([
        { provider: "adsense", timeoutMs: 100 },
        { provider: "house", timeoutMs: 20 },
    ]),
    consent: {
        mode: "adsense-tcf",
        bootstrapProvider: "adsense",
    },
    providers: {
        ...adsterraConfig([]).providers,
        adsense: {
            ...adsterraConfig([]).providers.adsense,
            tcfVendorId: 755,
        },
    },
});

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.documentElement.lang = "en";
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    delete (window as Window & { SteamEngineAds?: unknown }).SteamEngineAds;
    delete (window as Window & { adsbygoogle?: unknown }).adsbygoogle;
    delete (window as Window & { __tcfapi?: unknown }).__tcfapi;
    delete (window as Window & { googlefc?: unknown }).googlefc;
    delete (window as Window & { gtag?: unknown }).gtag;
});

describe("advertising runtime", () => {
    it("falls through multiple failed providers to the house ad", async () => {
        document.body.innerHTML = '<div aria-label="Advertisement" data-ad-context="ohm" '
            + 'data-ad-placement="calculator-footer"></div>';
        const style = document.createElement("style");
        style.textContent = runtimeStyles;
        document.head.appendChild(style);

        evaluateRuntime(testConfig);

        const heading = await screen.findByRole("heading", { name: "Sponsor Steam Engine" });
        expect(heading).toBeVisible();
        expect(getComputedStyle(heading.closest(".se-house-ad")!).boxSizing).toBe("border-box");
        expect(screen.getByText(/20k monthly users/)).toBeVisible();
        expect(screen.getByText("Relevant technical products and services only.")).toBeVisible();
        const link = screen.getByRole("link", { name: "Ask about sponsoring this spot" });
        expect(link).toHaveAttribute("href", "#contact");
        link.addEventListener("click", (event) => event.preventDefault(), { capture: true });
        fireEvent.click(link);
        const address = "sponsor@steam-engine.org";
        expect(link).toHaveAttribute("href", `mailto:${address}`);
        const placement = document.querySelector('[data-ad-placement="calculator-footer"]');
        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        expect(runtimeSource).not.toContain("lars.simonsen@gmail.com");
    });

    it("uses house-ad copy for the page locale", async () => {
        document.documentElement.lang = "de";
        document.body.innerHTML = '<div aria-label="Advertisement" data-ad-context="ohm" '
            + 'data-ad-placement="calculator-footer"></div>';
        const localizedConfig = {
            ...testConfig,
            providers: {
                ...testConfig.providers,
                house: {
                    ...houseProvider,
                    translations: {
                        en: houseProvider,
                        de: {
                            label: "Sponsorenplatz",
                            title: "Steam Engine sponsern",
                            body: "Erreichen Sie monatlich über 20.000 Nutzer von Dampf-Rechnern.",
                            qualifier: "Nur relevante technische Produkte und Dienstleistungen.",
                            cta: "Fragen Sie nach der Sponsoring-Möglichkeit für diesen Platz",
                        },
                    },
                },
            },
        };

        evaluateRuntime(localizedConfig);

        expect(await screen.findByText("Sponsorenplatz")).toBeVisible();
        expect(screen.getByRole("heading", { name: "Steam Engine sponsern" })).toBeVisible();
        expect(screen.getByText("Erreichen Sie monatlich über 20.000 Nutzer von Dampf-Rechnern.")).toBeVisible();
        expect(screen.getByText("Nur relevante technische Produkte und Dienstleistungen.")).toBeVisible();
        expect(screen.getByRole("link", {
            name: "Fragen Sie nach der Sponsoring-Möglichkeit für diesen Platz",
        })).toBeVisible();
    });

    it("collapses an unknown placement without loading a provider", async () => {
        document.body.innerHTML = '<div aria-label="Advertisement" data-ad-placement="unknown"></div>';

        evaluateRuntime(testConfig);

        await waitFor(() => expect(screen.getByLabelText("Advertisement"))
            .toHaveAttribute("data-ad-state", "empty"));
    });

    it("keeps a slow Adsterra attempt mounted and places the house message below it", async () => {
        addPlacement();
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        const children = Array.from(placement.children);
        expect(children[0]).toHaveClass("se-ad-attempt");
        expect(children[0]).toHaveAttribute("data-ad-state", "slow");
        expect(children[0].querySelector("iframe")).not.toBeNull();
        expect(children[1]).toHaveClass("se-ad-house-fallback");

        sendAdsterraMessage("se-ad-error", children[0].querySelector("iframe")!);
        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
    });

    it("does not start a second network provider when Adsterra is slow", async () => {
        addPlacement();
        prepareAdsense("filled");
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "adsense", timeoutMs: 100 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        expect(document.querySelectorAll('script[src*="adsbygoogle.js"]').length).toBe(1);

        sendAdsterraMessage("se-ad-error", placement.querySelector("iframe")!);
        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        expect(placement.querySelector("ins.adsbygoogle")).not.toBeNull();
    });

    it("removes the temporary house message after a late Adsterra fill", async () => {
        addPlacement();
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        const frame = placement.querySelector("iframe")!;
        const body = document.createElement("body");
        body.innerHTML = "<img alt=\"test creative\">";
        Object.defineProperty(frame, "contentDocument", { configurable: true, value: { body } });

        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        expect(frame.isConnected).toBe(true);
        expect(placement.querySelector(".se-ad-house-fallback")).toBeNull();
    });

    it("advances after an explicit Adsterra error and hides the house message when AdSense fills", async () => {
        addPlacement();
        prepareAdsense("filled");
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "adsense", timeoutMs: 100 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        sendAdsterraMessage("se-ad-error", placement.querySelector("iframe")!);

        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        expect(placement.querySelector(".se-ad-house-fallback")).toBeNull();
        expect(placement.querySelector("ins.adsbygoogle")).not.toBeNull();
    });

    it("gives responsive AdSense units the full available width", async () => {
        addPlacement();
        const style = document.createElement("style");
        style.textContent = runtimeStyles;
        document.head.appendChild(style);
        prepareAdsense("filled");
        evaluateRuntime(adsterraConfig([
            { provider: "adsense", timeoutMs: 100 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        const attempt = placement.querySelector<HTMLElement>(".se-ad-attempt")!;
        const unit = attempt.querySelector<HTMLElement>("ins.adsbygoogle")!;
        expect(getComputedStyle(attempt).width).toBe("100%");
        expect(getComputedStyle(unit).flexBasis).toBe("100%");
        expect(getComputedStyle(unit).minWidth).toBe("0px");
        expect(getComputedStyle(unit).width).toBe("100%");
    });

    it("advances after an explicit Adsterra no-fill result", async () => {
        addPlacement();
        prepareAdsense("filled");
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "adsense", timeoutMs: 100 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        sendAdsterraMessage("se-ad-no-fill", placement.querySelector("iframe")!);

        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        expect(placement.querySelector("ins.adsbygoogle")).not.toBeNull();
    });

    it("leaves the house message visible after all network providers definitively fail", async () => {
        addPlacement();
        prepareAdsense("unfilled");
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "adsense", timeoutMs: 100 },
            { provider: "house", timeoutMs: 20 },
        ]));

        const placement = getPlacement();
        await waitForSlowAd(placement);
        sendAdsterraMessage("se-ad-error", placement.querySelector("iframe")!);

        await waitFor(() => expect(placement).toHaveAttribute("data-ad-state", "filled"));
        const link = placement.querySelector(".se-ad-house-fallback a");
        expect(link).toBeVisible();
        expect(placement.querySelector(".se-ad-house-fallback")).not.toBeNull();
        expect(placement.querySelector("iframe")).toBeNull();
    });

    it("keeps the existing single-use-per-page behavior", async () => {
        addPlacement(2);
        evaluateRuntime(adsterraConfig([
            { provider: "adsterra", timeoutMs: 20 },
            { provider: "house", timeoutMs: 20 },
        ]));

        await waitFor(() => expect(document.querySelectorAll("iframe")).toHaveLength(1));
        expect(getPlacement(1).querySelector("iframe")).toBeNull();
        expect(getPlacement(1).querySelector(".se-ad-house-fallback")).not.toBeNull();

        const firstFrame = getPlacement().querySelector("iframe")!;
        sendAdsterraMessage("se-ad-error", firstFrame);
        await waitFor(() => expect(getPlacement()).toHaveAttribute("data-ad-state", "filled"));
    });

    it("lets AdSense consume the CMP signal without querying it in the publisher runtime", async () => {
        addPlacement();
        prepareAdsense("filled");
        const tcfApi = vi.fn();
        Object.defineProperty(window, "__tcfapi", {
            configurable: true,
            writable: true,
            value: tcfApi,
        });

        evaluateRuntime(adsenseTcfConfig());

        await waitFor(() => expect(getPlacement()).toHaveAttribute("data-ad-state", "filled"));
        expect(tcfApi).not.toHaveBeenCalled();
        expect(document.querySelector("ins.adsbygoogle")).not.toBeNull();
    });

    it("queues a manual unit without waiting for a preloaded head tag to fire load again", async () => {
        addPlacement();
        const headTag = document.createElement("script");
        headTag.src = adsenseScriptUrl;
        document.head.appendChild(headTag);
        evaluateRuntime(adsenseTcfConfig());

        await waitFor(() => expect(document.querySelectorAll('script[src*="adsbygoogle.js"]')).toHaveLength(1));
        await waitFor(() => expect(document.querySelector("ins.adsbygoogle")).not.toBeNull());
        expect((window as Window & { adsbygoogle?: unknown }).adsbygoogle).toEqual([{}]);
    });

    it("requests an AdSense unit when the CMP API is not exposed to publisher code", async () => {
        addPlacement();
        prepareAdsense("filled");
        evaluateRuntime(adsenseTcfConfig());

        await waitFor(() => expect(getPlacement()).toHaveAttribute("data-ad-state", "filled"));
        expect((window as Window & { __tcfapi?: unknown }).__tcfapi).toBeUndefined();
        expect(document.querySelector("ins.adsbygoogle")).not.toBeNull();
        expect(getPlacement().querySelector(".se-ad-house-fallback")).toBeNull();
    });

    it("reports bounded AdSense request and fill transitions to Google Analytics", async () => {
        const gtag = prepareAnalytics();
        addPlacement();
        prepareAdsense("filled");
        evaluateRuntime(adsenseTcfConfig());

        await waitFor(() => expect(getPlacement()).toHaveAttribute("data-ad-state", "filled"));

        expect(gtag).toHaveBeenCalledWith("event", "se_ad_delivery", expect.objectContaining({
            placement: "calculator-footer",
            context: "ohm",
            provider: "adsense",
            status: "requested",
            elapsed_bucket: "under_1s",
        }));
        expect(gtag).toHaveBeenCalledWith("event", "se_ad_delivery", expect.objectContaining({
            placement: "calculator-footer",
            context: "ohm",
            provider: "adsense",
            status: "filled",
        }));
    });

    it("reports no-fill, house fallback, and the local sponsorship click", async () => {
        const gtag = prepareAnalytics();
        addPlacement();
        prepareAdsense("unfilled");
        evaluateRuntime(adsenseTcfConfig());

        const link = await screen.findByRole("link", { name: "Ask about sponsoring this spot" });
        link.addEventListener("click", (event) => event.preventDefault(), { capture: true });
        fireEvent.click(link);

        expect(gtag).toHaveBeenCalledWith("event", "se_ad_delivery", expect.objectContaining({
            provider: "adsense",
            status: "unfilled",
        }));
        expect(gtag).toHaveBeenCalledWith("event", "se_ad_delivery", expect.objectContaining({
            provider: "house",
            status: "house_shown",
            reason: "provider_unfilled",
        }));
        expect(gtag).toHaveBeenCalledWith("event", "se_house_ad_click", {
            placement: "calculator-footer",
            context: "ohm",
            provider: "house",
        });
    });

    it("reports a provider-unavailable heuristic when the AdSense script cannot load", async () => {
        const gtag = prepareAnalytics();
        addPlacement();
        evaluateRuntime(adsenseTcfConfig());

        await waitFor(() => expect(document.querySelector('script[src*="adsbygoogle.js"]')).not.toBeNull());
        const script = document.querySelector<HTMLScriptElement>('script[src*="adsbygoogle.js"]')!;
        script.dispatchEvent(new Event("error"));
        await screen.findByRole("heading", { name: "Sponsor Steam Engine" });

        expect(gtag).toHaveBeenCalledWith("event", "se_ad_delivery", expect.objectContaining({
            provider: "adsense",
            status: "error",
            reason: "provider_unavailable",
        }));
    });

    it("reopens Google's privacy options through the documented callback queue", async () => {
        const showRevocationMessage = vi.fn();
        Object.defineProperty(window, "googlefc", {
            configurable: true,
            writable: true,
            value: { callbackQueue: [], showRevocationMessage },
        });
        prepareAdsense("filled");
        evaluateRuntime(adsenseTcfConfig());

        await window.SteamEngineAds?.showPrivacyOptions?.();

        expect(showRevocationMessage).toHaveBeenCalledOnce();
    });
});
