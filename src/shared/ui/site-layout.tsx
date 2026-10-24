import type { ReactElement, ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { withoutTrailingSlash, type SiteRoute } from "./site-navigation";
import { AdPlacement, type AdPlacementName } from "./ad-placement";
import { messagesFor } from "../../i18n/messages";
import { localizedRouteHref, pageLocale } from "../../i18n/page-locale";

const calculatorRoutes: readonly SiteRoute[] = [
    "ohm",
    "coil",
    "wirewiz",
    "batt",
    "modrange",
    "juice",
    "converter",
    "tcr",
];

export type SiteLayoutProps = {
    readonly adPlacement?: AdPlacementName;
    readonly basePath: string;
    readonly children: ReactNode;
    readonly className?: string;
    readonly currentRoute?: SiteRoute;
    readonly rootHref?: string;
};

export const SiteLayout = ({
    adPlacement,
    basePath,
    children,
    className,
    currentRoute,
    rootHref = `${basePath}..`,
}: SiteLayoutProps): ReactElement => {
    const locale = pageLocale();
    const resolvedRootHref = locale === "en" || rootHref !== "."
        ? rootHref
        : withoutTrailingSlash(localizedRouteHref(locale, ""));
    const resolvedAdPlacement = adPlacement ?? (currentRoute !== undefined
        && calculatorRoutes.includes(currentRoute) ? "calculator-footer" : undefined);

    return <div className={["app-shell", className].filter(Boolean).join(" ")}>
        <a className="skip-link" href="#main">{messagesFor(locale).navigation.skipToContent}</a>
        <SiteHeader basePath={basePath} currentRoute={currentRoute} rootHref={resolvedRootHref} />
        {children}
        {resolvedAdPlacement && <AdPlacement context={currentRoute} placement={resolvedAdPlacement} />}
        <SiteFooter homeHref={resolvedRootHref} />
    </div>;
};
