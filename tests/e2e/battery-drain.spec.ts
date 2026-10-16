import { expect, test } from "@playwright/test";

test("Battery Drain supports the main device and battery workflows", async ({ page }) => {
    await page.goto("/batt");
    await expect(page.getByRole("heading", { name: "Battery drain", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atomizer output" })).toBeVisible();
    await expect(page.getByText("Estimated runtime")).toBeVisible();
    await expect(page.getByText("79.9 min")).toBeVisible();
    await expect(page.getByLabel("Power regulated mod")).toBeChecked();
    await expect(page.getByLabel("Voltage regulated mod")).not.toBeChecked();
    await expect(page.getByText("Regulation mode")).toHaveCount(0);

    await page.getByLabel("Maximum current").fill("18");
    await expect(page.getByLabel("C rating")).toHaveValue("6");
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();

    await page.getByLabel("Unregulated mod").check();
    await expect(page.getByRole("heading", { name: "Battery drain", level: 3 })).toBeVisible();
    await page.reload();
    await expect(page.getByLabel("Unregulated mod")).toBeChecked();
    await expect(page.getByLabel("Maximum current")).toHaveValue("18");
});

test("Battery Drain manages and protects custom batteries", async ({ page }) => {
    await page.goto("/batt");
    await page.getByRole("button", { name: "Manage batteries" }).click();
    await expect(page.getByRole("heading", { name: "Manage batteries" })).toBeVisible();
    await page.getByRole("button", { name: "New custom battery" }).click();
    await page.getByLabel("Manufacturer").fill("Browser");
    await page.getByLabel("Model").fill("Test Cell");
    await page.getByLabel("Form factor").selectOption("cylindrical");
    await page.getByLabel("Nominal diameter (mm)").fill("18");
    await page.getByLabel("Nominal length (mm)").fill("65");
    await page.getByLabel("Rated capacity").fill("3000");
    await page.getByLabel("Continuous discharge current").fill("20");
    await page.getByRole("button", { name: "Save battery" }).click();

    const selector = page.getByLabel("Battery preset", { exact: true });
    const customBatteryId = await selector.locator("option").filter({ hasText: "Browser Test Cell" })
        .getAttribute("value");
    expect(customBatteryId).not.toBeNull();
    await selector.selectOption(customBatteryId!);
    await expect(page.getByLabel("Capacity")).toHaveValue("3000");
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByRole("status")).toContainText(
        "Cannot delete Browser Test Cell; it is used by Current Battery Drain settings.",
    );
});
