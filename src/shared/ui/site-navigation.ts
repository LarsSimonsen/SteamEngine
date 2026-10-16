export const siteRoutes = [
    "home",
    "catalog",
    "ohm",
    "coil",
    "wirewiz",
    "batt",
    "modrange",
    "juice",
    "converter",
    "about",
    "privacy",
    "tcr",
] as const;

export type SiteRoute = (typeof siteRoutes)[number];

export type NavigationItem = {
    readonly route: SiteRoute;
    readonly label: string;
    readonly path: string;
};

import { messagesFor } from "../../i18n/messages";
import type { Locale } from "../../i18n/locales";

export const withoutTrailingSlash = (href: string): string =>
    href.length > 1 ? href.replace(/\/+$/, "") : href;

export const navigationItems: readonly NavigationItem[] = [
    { route: "catalog", label: "Catalog", path: "catalog" },
    { route: "ohm", label: "Ohm's law", path: "ohm" },
    { route: "coil", label: "Coil wrapping", path: "coil" },
    { route: "wirewiz", label: "Wire Wizard", path: "wirewiz" },
    { route: "batt", label: "Battery drain", path: "batt" },
    { route: "modrange", label: "Mod range", path: "modrange" },
    { route: "juice", label: "E-liquid", path: "juice" },
];

export const navigationItemsFor = (locale: Locale): readonly NavigationItem[] => {
    const labels = messagesFor(locale).home.tools;
    return [
        { route: "catalog", label: messagesFor(locale).navigation.catalog, path: "catalog" },
        ...["ohm", "coil", "wirewiz", "batt", "modrange", "juice"]
            .map((route) => ({ route, label: labels[route].label, path: route } as NavigationItem)),
    ];
};

export const catalogNavigationItem = navigationItems[0];
export const calculatorNavigationItems = navigationItems.slice(1);

export const isSiteRoute = (value: string | undefined): value is SiteRoute =>
    siteRoutes.some((route) => route === value);
