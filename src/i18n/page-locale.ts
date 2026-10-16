import { localeDefinitions, localeForCode, type Locale } from "./locales";

export const pageLocale = (): Locale => {
    if (typeof document === "undefined") return "en";
    return localeForCode(document.getElementById("root")?.dataset.locale ?? "en") ?? "en";
};

export const localizedHomeHref = (locale: Locale, route: string): string =>
    localizedRouteHref(locale, route);

export const localizedRootHref = (locale: Locale): string =>
    locale === "en" ? "/" : `/${locale}`;

export const englishSiblingHref = (rootHref: string, route: string): string =>
    `${rootHref}/../${route}`;

const appRoutes = new Set([
    "about", "batt", "catalog", "coil", "compare", "converter", "juice", "modrange", "ohm", "tcr", "wirewiz",
    ...localeDefinitions.map(({ prefix }) => prefix.slice(1)).filter(Boolean),
]);

export const localizedRouteHref = (locale: Locale, route: string): string => {
    if (typeof window === "undefined") return `${locale === "en" ? "" : `${locale}/`}${route}`;
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const routeStart = pathSegments.findIndex((segment) => appRoutes.has(segment));
    const routeSegments = routeStart < 0 ? [] : pathSegments.slice(routeStart);
    const currentDirectoryDepth = window.location.pathname.endsWith("/")
        ? routeSegments.length
        : Math.max(0, routeSegments.length - 1);
    const parentSegments = Array.from({ length: currentDirectoryDepth }, () => "..");
    const targetRoute = locale === "en" ? [route] : [locale, route];
    return [...parentSegments, ...targetRoute].join("/") || ".";
};

export const languageHref = (locale: Locale): string => {
    if (typeof window === "undefined") return locale === "nb" ? "nb" : "..";
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const routeStart = pathSegments.findIndex((segment) => appRoutes.has(segment));
    const routeSegments = routeStart < 0 ? [] : pathSegments.slice(routeStart);
    const unprefixedRoute = localeDefinitions.some(({ prefix }) => prefix.slice(1) === routeSegments[0])
        ? routeSegments.slice(1)
        : routeSegments;
    const targetRoute = locale === "en" ? unprefixedRoute : [locale, ...unprefixedRoute];
    const currentDirectoryDepth = window.location.pathname.endsWith("/")
        ? routeSegments.length
        : Math.max(0, routeSegments.length - 1);
    const parentSegments = Array.from({ length: currentDirectoryDepth }, () => "..");
    const path = [...parentSegments, ...targetRoute].join("/") || ".";
    return `${path}${window.location.search}`;
};
