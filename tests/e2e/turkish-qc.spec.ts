import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

const turkishRoutes = [
    "/tr",
    "/tr/batt",
    "/tr/coil",
    "/tr/converter",
    "/tr/juice",
    "/tr/modrange",
    "/tr/ohm",
    "/tr/tcr",
    "/tr/wirewiz",
    "/tr/compare/batteries",
    "/tr/compare/materials",
    "/tr/compare/mods",
    "/tr/catalog",
];

for (const viewport of [
    { name: "narrow", width: 390, height: 844 },
    { name: "wide", width: 1440, height: 900 },
]) {
    test.describe(`Turkish ${viewport.name} layout`, () => {
        test.use({ viewport });

        for (const route of turkishRoutes) {
            test(`${route} has the Turkish document language and no page overflow`, async ({ page }) => {
                await page.goto(route);
                await expect(page.locator("html")).toHaveAttribute("lang", "tr");
                const overflow = await page.evaluate(() => ({
                    documentWidth: document.documentElement.scrollWidth,
                    viewportWidth: window.innerWidth,
                }));
                expect(overflow.documentWidth, `${route} overflows horizontally`).toBeLessThanOrEqual(
                    overflow.viewportWidth + 1,
                );
                await expect(page.locator("h1, h2").first()).toBeVisible();
            });
        }
    });
}
