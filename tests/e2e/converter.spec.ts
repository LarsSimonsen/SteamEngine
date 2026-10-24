import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

test("Converter supports numeric conversion, discrete gauge results, swap, and reset", async ({ page }) => {
    await page.goto("/converter");
    await expect(page.getByRole("heading", { name: "Converter", level: 1 })).toBeVisible();
    await expect(page.getByText("25.4 mm")).toBeVisible();

    await page.getByLabel("Input value").fill("2");
    await page.getByLabel("Input value").press("Enter");
    await expect(page.getByText("50.8 mm")).toBeVisible();
    await expect(page.getByRole("button", { name: /Reset defaults/ })).toBeVisible();

    await page.getByLabel("Output unit").selectOption("swg");
    await page.getByLabel("Input value").fill("0.035");
    await page.getByLabel("Input value").press("Enter");
    await expect(page.getByText("Between standard values")).toBeVisible();
    await expect(page.getByRole("button", { name: /Swap input and output/ })).toBeDisabled();

    await page.getByRole("button", { name: /Reset defaults/ }).click();
    await expect(page.getByText("25.4 mm")).toBeVisible();
});
