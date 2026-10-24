import { useState, type ReactElement } from "react";
import "../../shared/styles/foundation.css";
import { contactEmailHref } from "../../shared/contact-email";
import { SiteLayout } from "../../shared/ui/site-layout";
import "./privacy.css";

declare global {
    interface Window {
        SteamEngineAds?: {
            showPrivacyOptions?: () => Promise<void>;
        };
    }
}

const loadAdvertisingRuntime = (): Promise<void> => {
    if (window.SteamEngineAds) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>("script[data-steam-engine-ad-runtime]");
        const script = existing ?? document.createElement("script");
        script.addEventListener("load", () => resolve(), { once: true });
        script.addEventListener("error", () => reject(new Error("Unable to load privacy settings.")), { once: true });
        if (!existing) {
            script.dataset.steamEngineAdRuntime = "true";
            script.src = "/advertising/runtime.js";
            document.head.appendChild(script);
        }
    });
};

export const PrivacyPage = (): ReactElement => {
    const [settingsError, setSettingsError] = useState(false);
    const showPrivacyOptions = async (): Promise<void> => {
        setSettingsError(false);
        try {
            await loadAdvertisingRuntime();
            if (!window.SteamEngineAds?.showPrivacyOptions) throw new Error("Privacy settings are unavailable.");
            await window.SteamEngineAds.showPrivacyOptions();
        } catch {
            setSettingsError(true);
        }
    };

    return <SiteLayout basePath="./" currentRoute="privacy" rootHref=".">
        <main id="main" className="page-content privacy-page">
            <header className="privacy-page__header">
                <p className="eyebrow">Steam Engine</p>
                <h1>Privacy</h1>
                <p>Last updated: <time dateTime="2026-08-26">26 August 2026</time></p>
            </header>

            <section aria-labelledby="privacy-summary">
                <h2 id="privacy-summary">In brief</h2>
                <p>
                    Steam Engine does not require an account. Some preferences, saved calculator data, and cached
                    service responses are stored in your browser. The site also uses remote services for some
                    calculations, traffic measurement, consent management, advertising, security, and delivery.
                </p>
            </section>

            <section aria-labelledby="privacy-local-data">
                <h2 id="privacy-local-data">Data stored in your browser</h2>
                <p>
                    Steam Engine uses browser storage and, on some legacy pages, cookies to remember choices such as
                    theme and language, calculator settings, custom materials and catalog entries, saved designs, and
                    cached calculation responses. This information normally stays on that browser unless you export,
                    share, or synchronize it yourself. Clearing site data removes it from that browser.
                </p>
            </section>

            <section aria-labelledby="privacy-services">
                <h2 id="privacy-services">Requests to Steam Engine services</h2>
                <p>
                    Some calculators send the values needed for a calculation to Steam Engine's Cloudflare Worker
                    service. Web hosting, delivery, and security systems can also process standard request data such
                    as IP address, date and time, requested URL, browser information, response status, and diagnostic
                    or security events. This data is used to provide, protect, troubleshoot, and improve the service.
                </p>
            </section>

            <section aria-labelledby="privacy-measurement">
                <h2 id="privacy-measurement">Analytics</h2>
                <p>
                    Steam Engine uses Google Analytics to understand aggregate traffic and feature use. Depending on
                    your location and privacy choice, Google may receive consent-limited signals or use cookies and
                    similar identifiers. Aggregate feature events include ad-delivery outcomes and interactions with
                    Steam Engine's local sponsorship message. Google describes its handling of service data in its{
                    " "}<a href="https://policies.google.com/privacy" rel="noopener noreferrer">Privacy Policy</a>.
                </p>
            </section>

            <section aria-labelledby="privacy-advertising">
                <h2 id="privacy-advertising">Advertising and consent</h2>
                <p>
                    Google provides Steam Engine's European consent message and is an advertising provider. Other ad
                    providers may be enabled only when the site's configuration and your applicable consent permit
                    them. Ad providers can process identifiers, device and browser details, IP-derived location,
                    referrer information, ad interactions, and fraud-prevention signals according to their own terms.
                    If advertising consent is unavailable or denied, Steam Engine can show a local house message
                    instead of requesting a network ad.
                </p>
                <button className="se-button se-button--active" type="button" onClick={showPrivacyOptions}>
                    Privacy and cookie settings
                </button>
                {settingsError && <p className="privacy-page__error" role="alert">
                    Privacy settings could not be opened. Please disable content blocking for this page and try again.
                </p>}
            </section>

            <section aria-labelledby="privacy-retention">
                <h2 id="privacy-retention">Retention, sharing, and international transfers</h2>
                <p>
                    Browser-stored data remains until it expires or you clear it. Operational logs and third-party
                    service data are retained under the relevant provider's settings and policies. Service providers
                    process data on Steam Engine's behalf or for their own stated purposes; data may be processed
                    outside your country with the safeguards required by applicable law. Steam Engine does not sell
                    calculator entries or saved browser data.
                </p>
            </section>

            <section aria-labelledby="privacy-legal-bases">
                <h2 id="privacy-legal-bases">Legal bases</h2>
                <p>
                    Where applicable, Steam Engine relies on your consent for optional advertising storage,
                    personalized advertising, and analytics that require consent. It relies on legitimate interests
                    to operate, secure, diagnose, and improve the site, and to prevent fraud and abuse. A legal
                    obligation may require limited processing or disclosure. You can withdraw consent at any time;
                    withdrawal does not affect processing that was lawful before it.
                </p>
            </section>

            <section aria-labelledby="privacy-rights">
                <h2 id="privacy-rights">Your choices and rights</h2>
                <p>
                    You can reject or manage optional advertising purposes in the consent message and return to those
                    choices with the button above. Browser controls can clear local storage, cookies, and cached data.
                    Depending on where you live, you may have rights to access, correct, delete, restrict, or object to
                    processing of personal data, and to complain to a supervisory authority such as{
                    " "}<a href="https://www.datatilsynet.no/en/" rel="noopener noreferrer">Datatilsynet</a>.
                </p>
            </section>

            <section aria-labelledby="privacy-contact">
                <h2 id="privacy-contact">Contact</h2>
                <p>
                    Steam Engine is operated by its site owner in Norway. For privacy questions or requests,{
                    " "}<a href="#privacy-contact" onClick={(event) => {
                        event.currentTarget.href = contactEmailHref();
                    }}>email the site operator</a>. Please do not include sensitive calculator or account information.
                </p>
            </section>
        </main>
    </SiteLayout>;
};
