import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test("adds and restores ten Clapton cores with the v5 calculation API", async ({ page }) => {
    await routeToLiveApi(page, "**/api/v5/wirewiz");
    await page.goto("/wirewiz");
    await page.getByRole("combobox", { name: "Wire type", exact: true }).selectOption("clapton");
    await page.getByRole("combobox", { name: "Wire type", exact: true }).nth(1).selectOption("parallel");
    const core = page.getByRole("article", { name: "parallel configuration", exact: true });
    for (let count = 2; count < 10; count += 1) {
        await core.getByRole("button", { name: "Add parallel wire", exact: true }).click();
    }
    await expect(core.getByRole("article", { name: "Single wire configuration", exact: true })).toHaveCount(10);
    await page.reload();
    await expect(core.getByRole("article", { name: "Single wire configuration", exact: true })).toHaveCount(10);
    await expect(page.getByRole("img", { name: /Resistance factor graph/ })).toBeVisible();
});
