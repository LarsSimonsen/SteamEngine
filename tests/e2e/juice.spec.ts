import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test("Liquid mixing preserves the main recipe, warning, detail, and persistence workflows", async ({ page }) => {
    await routeToLiveApi(page);
    await page.goto("/juice");
    await expect(page.getByRole("heading", { name: "Dilute and mix" })).toBeVisible();
    const mixStatus = page.locator(".juice-status");
    await expect(mixStatus).toHaveText("This can be mixed.");
    await expect(page.getByRole("spinbutton", { name: "Amount you want to make mL" })).toHaveValue("10");
    await expect(page.getByRole("row", { name: "Nicotine base (PG) 6.67 6.91" })).toBeVisible();
    await expect(page.getByRole("spinbutton", { name: "Nic strength mg/mL" }).first()).toHaveValue("27");
    await expect(page.getByRole("spinbutton", { name: "Nic strength mg/mL" }).nth(1)).toHaveValue("18");

    await page.getByRole("button", { name: "Add", exact: true }).click();
    await expect(page.locator(".juice-flavor-table tbody tr")).toHaveCount(2);
    await page.locator(".juice-flavor-table tbody tr").nth(1).getByText("VG", { exact: true }).click();
    await page.getByRole("spinbutton", { name: "Flavor percentage 2" }).fill("50");
    await expect(mixStatus).toContainText("This mix is not feasible.");
    await expect(mixStatus).toHaveAttribute("role", "status");
    await expect(page.locator(".juice-mix-warning")).toHaveText("This mix is not feasible.");
    await expect(page.locator(".juice-negative")).not.toHaveCount(0);

    const flavorGap = () => page.evaluate(() => {
        const batch = document.querySelector(".juice-panel--batch")?.getBoundingClientRect();
        const flavor = document.querySelector(".juice-panel--flavor")?.getBoundingClientRect();
        return batch && flavor ? Math.round(flavor.top - batch.bottom) : null;
    });
    const initialFlavorGap = await flavorGap();
    await page.getByRole("button", { name: "Show details" }).first().click();
    await expect(page.locator(".juice-details").first()).toBeVisible();
    expect(await flavorGap()).toBe(initialFlavorGap);

    const batch = page.getByRole("spinbutton", { name: "Amount you want to make mL" });
    await batch.fill("20");
    const menuButton = page.locator("summary", { hasText: "Menu" });
    await menuButton.click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Settings have been saved.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByRole("spinbutton", { name: "Amount you want to make mL" })).toHaveValue("10");
    await expect(page.getByRole("button", { name: "Load" })).toBeVisible();
    await page.getByRole("button", { name: "Load" }).click();
    await expect(page.getByRole("spinbutton", { name: "Amount you want to make mL" })).toHaveValue("20");
});
