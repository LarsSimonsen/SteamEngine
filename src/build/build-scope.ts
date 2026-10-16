import {
    localeForCode,
    localeDefinitions,
    translatedPageRoutes,
    type Locale,
} from "../i18n/locales";

export type BuildRoute = "catalog" | (typeof translatedPageRoutes)[number];

export type BuildScope =
    | {
        readonly kind: "full";
        readonly locales: readonly Locale[];
        readonly routes: readonly BuildRoute[];
    }
    | {
        readonly kind: "locale";
        readonly locale: Locale;
        readonly locales: readonly [Locale];
        readonly routes: readonly BuildRoute[];
    }
    | {
        readonly kind: "slice";
        readonly locale: Locale;
        readonly route: BuildRoute;
        readonly locales: readonly [Locale];
        readonly routes: readonly [BuildRoute];
    }
    | {
        readonly kind: "route";
        readonly route: BuildRoute;
        readonly locales: readonly Locale[];
        readonly routes: readonly [BuildRoute];
    };

const allLocales = localeDefinitions.map(({ code }) => code);
const allRoutes: readonly BuildRoute[] = ["catalog", ...translatedPageRoutes];

const unique = <T>(values: readonly T[]): T[] => [...new Set(values)];

export const parseBuildScope = (environment: NodeJS.ProcessEnv): BuildScope => {
    const localeValue = environment.STEAM_ENGINE_BUILD_LOCALE?.trim();
    const routeValue = environment.STEAM_ENGINE_BUILD_ROUTE?.trim();

    if (localeValue && routeValue) {
        const locale = localeForCode(localeValue);
        if (!locale) throw new Error(`Unknown build locale '${localeValue}'.`);
        if (!allRoutes.includes(routeValue as BuildRoute)) {
            throw new Error(`Unknown build route '${routeValue}'. Expected one of: ${allRoutes.join(", ")}.`);
        }
        if (environment.STEAM_ENGINE_BUILD_ALL_LOCALES === "1") {
            throw new Error("A locale-and-route slice cannot include all locales.");
        }
        return {
            kind: "slice",
            locale,
            route: routeValue as BuildRoute,
            locales: [locale],
            routes: [routeValue as BuildRoute],
        };
    }

    if (localeValue) {
        const locale = localeForCode(localeValue);
        if (!locale) throw new Error(`Unknown build locale '${localeValue}'.`);
        return { kind: "locale", locale, locales: [locale], routes: allRoutes };
    }

    if (routeValue) {
        if (!allRoutes.includes(routeValue as BuildRoute)) {
            throw new Error(`Unknown build route '${routeValue}'. Expected one of: ${allRoutes.join(", ")}.`);
        }
        const route = routeValue as BuildRoute;
        const locales = environment.STEAM_ENGINE_BUILD_ALL_LOCALES === "1"
            ? unique(allLocales)
            : ["en" as const];
        return { kind: "route", route, locales, routes: [route] };
    }

    if (environment.STEAM_ENGINE_BUILD_ALL_LOCALES === "1") {
        throw new Error("STEAM_ENGINE_BUILD_ALL_LOCALES requires STEAM_ENGINE_BUILD_ROUTE.");
    }

    return { kind: "full", locales: unique(allLocales), routes: allRoutes };
};

export const isPartialBuild = (scope: BuildScope): boolean => scope.kind !== "full";

export const includesEnglish = (scope: BuildScope): boolean => scope.locales.includes("en");

export const includesLocalizedPages = (scope: BuildScope): boolean =>
    scope.locales.some((locale) => locale !== "en");

export const includesEncyclopediaPages = (scope: BuildScope): boolean => scope.routes.includes("catalog");

export const includesBatteryComparison = (scope: BuildScope): boolean =>
    scope.routes.includes("compare/batteries");

export const includesModComparison = (scope: BuildScope): boolean =>
    scope.routes.includes("compare/mods");

export const includesEntityRecordPages = (scope: BuildScope): boolean =>
    includesEncyclopediaPages(scope) || includesBatteryComparison(scope) || includesModComparison(scope);

export const includesEncyclopediaDetails = (scope: BuildScope): boolean =>
    scope.routes.includes("catalog") && (scope.kind === "full" || scope.kind === "locale");

export const scopeName = (scope: BuildScope): string => {
    if (scope.kind === "full") return "full";
    if (scope.kind === "locale") return `locale-${scope.locale}`;
    if (scope.kind === "slice") return `locale-${scope.locale}-route-${scope.route}`;
    return `route-${scope.route}${scope.locales.length > 1 ? "-all-locales" : ""}`;
};
