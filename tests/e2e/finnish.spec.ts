import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

const routes = ["", "/batt", "/coil", "/converter", "/juice", "/modrange", "/ohm", "/tcr", "/wirewiz",
    "/catalog", "/compare/batteries", "/compare/materials", "/compare/mods",
    "/catalog/material/titanium-1"];

for (const width of [390, 1440]) {
    test.describe(`Finnish at ${width}px`, () => {
        test.use({ viewport: { width, height: 900 } });
        for (const route of routes) {
            test(`/fi${route} language, links and layout`, async ({ page }) => {
                const errors: string[] = [];
                page.on("pageerror", (error) => errors.push(error.message));
                await page.goto(`/fi${route}`);
                await expect(page.locator("html")).toHaveAttribute("lang", "fi");
                await expect(page.getByText(/Tämä käännös on koneellisesti laadittu/)).toBeVisible();
                await expect(page.locator("h1, h2").first()).toBeVisible();
                await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/fi${route}$`));
                await expect(page.locator('link[hreflang="fi"]')).toHaveCount(1);
                expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
                expect(await page.locator("body").innerText()).not.toMatch(/__SE_ARG_/i);
                expect(errors).toEqual([]);
            });
        }
    });
}

test("Finnish recipe settings save and load numeric values", async ({ page }) => {
    await page.goto("/fi/juice");
    const batch = page.locator('input[type="number"]').filter({ visible: true });
    const amount = page.getByRole("spinbutton", { name: /Valmistettava määrä/ });
    await expect(batch.first()).toBeVisible();
    await amount.fill("20");
    await page.getByRole("button", { name: "Valikko", exact: true }).click();
    await page.getByRole("button", { name: "Tallenna", exact: true }).click();
    await page.getByRole("button", { name: "Nollaa", exact: true }).click();
    await expect(amount).toHaveValue("10");
    await page.getByRole("button", { name: "Lataa", exact: true }).click();
    await expect(amount).toHaveValue("20");
});

test("Finnish Wire Wizard preserves CSV protocol", async ({ page }) => {
    await page.goto("/fi/wirewiz");
    await page.getByRole("tab", { name: "DNA200", exact: true }).click();
    await expect(page.getByRole("textbox", { name: /DNA200/ })).toHaveValue(/Temperature \(degF\)/);
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: /CSV/ }).click();
    expect((await download).suggestedFilename()).toMatch(/^DNA200-.*-SteamEngine\.csv$/);
});
