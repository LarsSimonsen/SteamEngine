import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

const routes = ["", "/batt", "/coil", "/converter", "/juice", "/modrange", "/ohm", "/tcr", "/wirewiz",
    "/catalog", "/compare/batteries", "/compare/materials", "/compare/mods",
    "/catalog/material/titanium-1"];

for (const width of [390, 1440]) {
    test.describe(`French at ${width}px`, () => {
        test.use({ viewport: { width, height: 900 } });
        for (const route of routes) {
            test(`/fr${route} language, links and layout`, async ({ page }) => {
                const errors: string[] = [];
                page.on("pageerror", (error) => errors.push(error.message));
                await page.goto(`/fr${route}`);
                await expect(page.locator("html")).toHaveAttribute("lang", "fr");
                await expect(page.getByText(/traduction.*automatique/i)).toBeVisible();
                await expect(page.locator("h1, h2").first()).toBeVisible();
                await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/fr${route}$`));
                await expect(page.locator('link[hreflang="fr"]')).toHaveCount(1);
                expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
                expect(await page.locator("body").innerText()).not.toMatch(/__SE_ARG_/i);
                expect(errors).toEqual([]);
            });
        }
    });
}

test("French recipe settings retain numeric values across save and load", async ({ page }) => {
    await page.goto("/fr/juice");
    const amount = page.getByRole("spinbutton", { name: /Quantité à préparer/ });
    await amount.fill("20");
    await page.locator("summary", { hasText: /^Menus?$/ }).click();
    await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
    await page.getByRole("button", { name: "Réinitialiser", exact: true }).click();
    await expect(amount).toHaveValue("10");
    await page.getByRole("button", { name: "Charger", exact: true }).click();
    await expect(amount).toHaveValue("20");
});

test("French Wire Wizard preserves the DNA200 CSV protocol", async ({ page }) => {
    await page.goto("/fr/wirewiz");
    await page.getByRole("button", { name: "DNA200", exact: true }).click();
    await expect(page.getByRole("textbox", { name: /DNA200/ })).toHaveValue(/Temperature \(degF\)/);
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: /CSV/ }).click();
    expect((await download).suggestedFilename()).toMatch(/^DNA200-.*-SteamEngine\.csv$/);
});
