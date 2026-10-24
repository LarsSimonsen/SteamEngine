import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import routeContract from "../../tools/route-contract.json";
import { routeToLiveApi } from "./live-api";

/**
 * Scans every page family with axe and requires zero WCAG 2.2 A and AA violations. Scans tagged @static cover
 * pages that never call the calculation API; they block the API, fail if a page tries to reach it, and run in CI.
 * The remaining scans forward calculation requests to the live API and run locally before each deployment.
 */

type Theme = "dark" | "light";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const themeStorageKey = "steamengine.theme.v1";
const localizedRoutes = [
    "/",
    "/ohm",
    "/coil",
    "/wirewiz",
    "/batt",
    "/modrange",
    "/juice",
    "/converter",
    "/tcr",
    "/catalog",
    "/catalog/material/kanthal-a1",
    "/compare/batteries",
    "/compare/materials",
    "/compare/mods",
];
const englishOnlyRoutes = [
    "/about",
    "/privacy",
    "/catalog/battery/lg-18650hg2",
    "/catalog/mod/acesmok-ace50",
    "/catalog/concept/ohms-law",
    "/blog",
    "/missing-page",
];
const apiRoutes = new Set([
    "/ohm",
    "/coil",
    "/wirewiz",
    "/batt",
    "/modrange",
    "/juice",
    "/converter",
    "/tcr",
    "/catalog/material/kanthal-a1",
    "/catalog/mod/acesmok-ace50",
]);
const locales = routeContract.localization.publishedLocales
    .filter((locale) => locale !== routeContract.localization.defaultLocale);

const localizedRoute = (locale: string, route: string): string => `/${locale}${route === "/" ? "" : route}`;

/** Returns the calculation API requests a static page attempted; they are blocked. */
const preparePage = async (page: Page, testInfo: TestInfo, theme: Theme, usesApi: boolean): Promise<string[]> => {
    const origin = new URL(String(testInfo.project.use.baseURL)).origin;
    const apiRequests: string[] = [];
    await page.addInitScript(([key, value]) => {
        localStorage.setItem(key, JSON.stringify({ version: 1, theme: value }));
    }, [themeStorageKey, theme] as const);
    // Third-party scripts such as ads and analytics are not ours to fix.
    await page.route((url) => url.origin !== origin, (route) => route.abort());
    if (usesApi) {
        await routeToLiveApi(page);
    } else {
        await page.route("**/api/**", (route) => {
            apiRequests.push(route.request().url());
            return route.abort();
        });
    }
    return apiRequests;
};

const scan = async (page: Page, theme: Theme, apiRequests: readonly string[]): Promise<void> => {
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    const violations = results.violations.flatMap((violation) => violation.nodes.map((node) => ({
        rule: violation.id,
        target: node.target.flat().join(" "),
        summary: node.failureSummary ?? violation.help,
    })));
    expect(violations, `Axe violations on ${page.url()} (${theme} theme)`).toEqual([]);
    expect(apiRequests, `${page.url()} is scanned as a static page but called the calculation API`).toEqual([]);
};

const scanRoute = (route: string, family: string, theme: Theme): void => {
    const usesApi = apiRoutes.has(family);
    test(`${route} has no axe violations (${theme})${usesApi ? "" : " @static"}`, async ({ page }, testInfo) => {
        const apiRequests = await preparePage(page, testInfo, theme, usesApi);
        await page.goto(route, { waitUntil: "networkidle" });
        await scan(page, theme, apiRequests);
    });
};

const scanFirstLinkedPage = (description: string, selector: string, theme: Theme): void => {
    test(`${description} has no axe violations (${theme}) @static`, async ({ page }, testInfo) => {
        const apiRequests = await preparePage(page, testInfo, theme, false);
        await page.goto("/blog", { waitUntil: "networkidle" });
        const link = page.locator(selector).first();
        test.skip(await link.count() === 0, "This build has no blog posts.");
        const href = await link.getAttribute("href");
        await page.goto(new URL(href ?? "", page.url()).pathname, { waitUntil: "networkidle" });
        await scan(page, theme, apiRequests);
    });
};

for (const theme of ["dark", "light"] as const) {
    for (const route of [...localizedRoutes, ...englishOnlyRoutes]) scanRoute(route, route, theme);
    scanFirstLinkedPage("a blog article", ".blog-card h2 a", theme);
    scanFirstLinkedPage("an older blog page", ".blog-pagination a", theme);
}

for (const locale of locales) {
    for (const route of localizedRoutes) scanRoute(localizedRoute(locale, route), route, "dark");
}
