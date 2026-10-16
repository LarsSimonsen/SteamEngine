import { purgeApiResponseCache } from "../backend-request";
import type { ReactElement } from "react";
import { withoutTrailingSlash } from "./site-navigation";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";
import {
    localeNeedsTranslationReview,
    translationCorrectionHref,
} from "../../i18n/translation-review";

export type SiteFooterProps = {
    readonly homeHref: string;
};

export const isLocalhost = (hostname: string): boolean =>
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";

export const SiteFooter = ({ homeHref }: SiteFooterProps): ReactElement => {
    const showPurgeCache = typeof window !== "undefined" && isLocalhost(window.location.hostname);
    const locale = pageLocale();
    const messages = messagesFor(locale);
    const showTranslationCorrection = locale !== "en";
    const prepareCorrectionLink = (link: HTMLAnchorElement): void => {
        const pagePath = typeof window === "undefined" ? "/" : window.location.pathname;
        link.href = translationCorrectionHref(locale, pagePath);
    };
    const correctionLink = showTranslationCorrection && <a href="#translation-correction"
        onFocus={(event) => prepareCorrectionLink(event.currentTarget)}
        onClick={(event) => prepareCorrectionLink(event.currentTarget)}>{messages.footer.suggestCorrection}</a>;
    return <footer className="site-footer">
        <div className="site-footer__inner">
            <a className="site-footer__home-link" href={withoutTrailingSlash(homeHref)}>www.steam-engine.org</a>
            <a className="site-footer__privacy-link" href="/privacy">Privacy</a>
            {localeNeedsTranslationReview(locale) && <p className="site-footer__translation-review">
                {messages.footer.translationDraft}{" "}{correctionLink}
            </p>}
            {showTranslationCorrection && !localeNeedsTranslationReview(locale)
                && <p className="site-footer__translation-review">{correctionLink}</p>}
            {showPurgeCache && <button className="site-footer__cache-button" type="button"
                onClick={purgeApiResponseCache}>{messages.footer.purgeCache}</button>}
        </div>
    </footer>;
};
