import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

test("TCR calculates, persists, and stays out of primary navigation", async ({ page }) => {
    await page.goto("/tcr");

    await expect(page.getByRole("heading", {
        name: "Temperature coefficient of resistance",
    })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "TCR" })).toHaveCount(0);

    await page.getByLabel("Material to add").selectOption("ni200");
    await page.getByRole("button", { name: "Add material" }).click();
    await expect(page.getByText("Total parallel resistance")).toBeVisible();
    await expect(page.getByText("100%", { exact: true })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("button", {
        name: "Remove Nickel 200 / Ni200 (UNS N02200) 1",
    })).toBeVisible();

    await page.getByRole("button", {
        name: "Remove Nickel 200 / Ni200 (UNS N02200) 1",
    }).click();
    await expect(page.getByText("Add one or more materials to calculate a resistance curve."))
        .toBeVisible();
});
