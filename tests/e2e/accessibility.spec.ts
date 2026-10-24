import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import routeContract from "../../tools/route-contract.json";
import baseline from "./accessibility-baseline.json";
import { routeToLiveApi } from "./live-api";

/**
 * Scans every page family with axe for WCAG 2.2 A and AA violations. Violations already recorded in
 * accessibility-baseline.json are tolerated until the step that fixes them removes their entries, so the sweep
 * fails only on new violations. Run `npm run test:a11y:baseline` to rewrite the baseline from a fresh scan.
 */

type Theme = "dark" | "light";
type Baseline = Readonly<Record<string, Readonly<Record<string, readonly string[]>>>>;

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
const locales = routeContract.localization.publishedLocales
    .filter((locale) => locale !== routeContract.localization.defaultLocale);
const localePrefix = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

/** Baseline entries apply to a page family: the route without its locale prefix. */
const pageFamily = (route: string): string => route.replace(localePrefix, "") || "/";

const localizedRoute = (locale: string, route: string): string => `/${locale}${route === "/" ? "" : route}`;

const isKnown = (rule: string, target: string, family: string): boolean =>
    (baseline as Baseline)[rule]?.[target]?.some((route) => route === "*" || route === family) ?? false;

const preparePage = async (page: Page, testInfo: TestInfo, theme: Theme): Promise<void> => {
    const origin = new URL(String(testInfo.project.use.baseURL)).origin;
    await page.addInitScript(([key, value]) => {
        localStorage.setItem(key, JSON.stringify({ version: 1, theme: value }));
    }, [themeStorageKey, theme] as const);
    // Third-party scripts such as ads and analytics are not ours to fix; the calculation API is still reached.
    await page.route((url) => url.origin !== origin, (route) => route.abort());
    await routeToLiveApi(page);
};

const scan = async (page: Page, testInfo: TestInfo, family: string, theme: Theme): Promise<void> => {
    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    const violations = results.violations.flatMap((violation) => violation.nodes.map((node) => ({
        rule: violation.id,
        target: node.target.flat().join(" "),
        summary: node.failureSummary ?? violation.help,
    })));
    await writeFile(testInfo.outputPath("axe-violations.json"), JSON.stringify({
        family,
        theme,
        violations: violations.map(({ rule, target }) => ({ rule, target })),
    }));
    const unexpected = violations.filter(({ rule, target }) => !isKnown(rule, target, family));
    expect(unexpected, `New axe violations on ${page.url()} (${theme} theme)`).toEqual([]);
};

const scanRoute = (route: string, theme: Theme): void => {
    test(`${route} has no new axe violations (${theme})`, async ({ page }, testInfo) => {
        await preparePage(page, testInfo, theme);
        await page.goto(route, { waitUntil: "networkidle" });
        await scan(page, testInfo, pageFamily(route), theme);
    });
};

const scanFirstLinkedPage = (description: string, selector: string, family: string, theme: Theme): void => {
    test(`${description} has no new axe violations (${theme})`, async ({ page }, testInfo) => {
        await preparePage(page, testInfo, theme);
        await page.goto("/blog", { waitUntil: "networkidle" });
        const href = await page.locator(selector).first().getAttribute("href").catch(() => null);
        test.skip(href === null, "This build has no blog posts.");
        await page.goto(new URL(href ?? "", page.url()).pathname, { waitUntil: "networkidle" });
        await scan(page, testInfo, family, theme);
    });
};

for (const theme of ["dark", "light"] as const) {
    for (const route of [...localizedRoutes, ...englishOnlyRoutes]) scanRoute(route, theme);
    scanFirstLinkedPage("a blog article", ".blog-card h2 a", "/blog/<article>", theme);
    scanFirstLinkedPage("an older blog page", ".blog-pagination a", "/blog/page/<n>", theme);
}

for (const locale of locales) {
    for (const route of localizedRoutes) scanRoute(localizedRoute(locale, route), "dark");
}
