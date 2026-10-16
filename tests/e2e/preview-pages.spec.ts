import { expect, test } from "@playwright/test";

const previewRoutes = [
    "/",
    "/about",
    "/batt",
    "/coil",
    "/converter",
    "/juice",
    "/modrange",
    "/ohm",
    "/tcr",
    "/wirewiz",
];

const calculatorRoutes = previewRoutes.filter((route) => !["/", "/about"].includes(route));

test("all Phase 0 preview routes render a page heading", async ({ page }) => {
    for (const route of previewRoutes) {
        await page.goto(route);
        await expect(page.locator("h1, h2").first()).toBeVisible();
        await expect(page.locator("body")).toHaveCSS("background-color", "rgb(34, 34, 34)");
    }
});

test("calculator legacy links appear at the bottom of the page content", async ({ page }) => {
    for (const route of calculatorRoutes) {
        await page.goto(route);
        const note = page.locator("main > .se-calculator-legacy-note:last-child");
        await expect(note).toBeVisible();
        await expect(note.getByRole("link", { name: "here" })).toHaveAttribute("href", `/old${route}`);
    }
});
