import { expect, test } from "@playwright/test";

test.describe("Coil Wrapping calculator", () => {
    test("shows default results and advanced controls", async ({ page }) => {
        await page.goto("/coil");
        await expect(page.getByRole("heading", { name: "Plan your coil" })).toBeVisible();
        await expect(page.getByText("Resistance wire length")).toBeVisible();
        await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();

        await page.getByRole("button", { name: "Advanced" }).click();
        await expect(page.getByText("Resistance per length")).toHaveCount(0);
        await expect(page.getByText("Coil dimensions")).toBeVisible();
    });

    test("switches profiles and opens the full converter beneath the header", async ({ page }) => {
        await page.goto("/coil");
        await page.getByLabel("Wire profile").selectOption("ribbon");
        await expect(page.getByLabel("Ribbon width")).toBeVisible();
        await expect(page.getByLabel("AWG")).toHaveCount(0);
        await page.getByRole("button", { name: "Converter" }).click();
        await expect(page.locator(".coil-page-header + #coil-converter")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Converter" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Input" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Result", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Output settings" })).toBeVisible();
        await expect(page.getByLabel("Output unit")).toBeVisible();
        await expect(page.getByRole("button", { name: "Results" })).toHaveCount(0);
    });

    test("persists settings and restores them after reload", async ({ page }) => {
        await page.goto("/coil");
        const target = page.getByLabel("Target resistance");
        await target.fill("1.2");
        await page.reload();
        await expect(page.getByLabel("Target resistance")).toHaveValue("1.2");
        await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
        await page.getByRole("button", { name: "Reset" }).click();
        await page.reload();
        await expect(page.getByLabel("Target resistance")).toHaveValue("1.8");
    });

    test("accepts natural replacement typing for a sub-ohm target", async ({ page }) => {
        await page.goto("/coil");
        const target = page.getByLabel("Target resistance");

        await target.click();
        await target.press("ControlOrMeta+A");
        await target.pressSequentially("0.5");

        await expect(target).toHaveValue("0.5");
    });

    test("reports unavailable thermal results when material data is missing", async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem("steamengine.materials.v1", JSON.stringify({
            version: 1,
            customMaterials: [{
                id: "78572205-4329-466c-922a-f478de5222d4",
                name: "Unknown thermal alloy",
                resistivity: 1.1,
                heatCapacity: null,
                density: null,
            }],
            hiddenDefaultMaterialIds: [],
        })));
        await page.goto("/coil");
        await page.getByLabel("Material").selectOption("78572205-4329-466c-922a-f478de5222d4");
        await page.getByRole("button", { name: "Advanced" }).click();

        for (const label of ["Heat capacity", "Density", "Wire mass"]) {
            const row = page.locator(".coil-result-row").filter({ hasText: label });
            await expect(row.getByText("Unavailable")).toBeVisible();
        }
    });

    test("keeps converter instances isolated", async ({ page }) => {
        await page.goto("/converter");
        await page.getByLabel("Output unit").selectOption("inch");
        await page.goto("/coil");
        await page.getByRole("button", { name: "Converter" }).click();
        await expect(page.getByLabel("Output unit")).toHaveValue("mm");
        await page.getByLabel("Output unit").selectOption("swg");
        await page.getByRole("button", { name: "Hide converter" }).click();
        await page.getByRole("button", { name: "Converter" }).click();
        await expect(page.getByLabel("Output unit")).toHaveValue("mm");
    });

    test("shares normalized custom materials across calculators and protects active references", async ({ page }) => {
        await page.goto("/coil");
        await page.getByRole("button", { name: "Manage materials" }).click();
        await page.getByRole("button", { name: "New custom material" }).click();
        await page.getByLabel("Name").fill("Browser alloy");
        await page.getByLabel("Resistivity (Ω mm²/m)").fill("1.2");
        await page.getByRole("radio", { name: "TFR", exact: true }).check();
        await page.getByLabel("TFR temperature").nth(0).fill("100");
        await page.getByLabel("TFR resistance factor").nth(0).fill("1.2");
        await page.getByLabel("TFR temperature").nth(1).fill("200");
        await page.getByLabel("TFR resistance factor").nth(1).fill("1.4");
        await page.getByRole("button", { name: "Save material" }).click();
        await expect(page.getByRole("status")).toContainText("20 °C point was extrapolated");

        await page.getByLabel("Material", { exact: true }).selectOption({ label: "Browser alloy" });
        await page.goto("/tcr");
        await page.getByLabel("Material to add").selectOption({ label: "Browser alloy (TFR)" });
        await page.getByRole("button", { name: "Add material" }).click();
        await expect(page.getByRole("row").filter({ hasText: "Browser alloy" })).toBeVisible();
        await page.reload();
        await expect(page.getByRole("row").filter({ hasText: "Browser alloy" })).toBeVisible();

        await page.getByRole("button", { name: "Manage materials" }).click();
        const customMaterial = page.locator(".catalog-manager__item--custom").filter({ hasText: "Browser alloy" });
        await customMaterial.getByRole("button", { name: "Edit" }).click();
        await page.getByLabel("Name").fill("Browser alloy edited");
        await page.getByRole("button", { name: "Save material" }).click();
        await expect(page.getByRole("row").filter({ hasText: "Browser alloy edited" })).toBeVisible();
        const editedMaterial = page.locator(".catalog-manager__item--custom")
            .filter({ hasText: "Browser alloy edited" });
        await editedMaterial.getByRole("button", { name: "Delete" }).click();
        await expect(page.getByRole("status")).toContainText("Current TCR calculator settings");
    });

    test("clones hidden defaults and persists default visibility", async ({ page }) => {
        await page.goto("/coil");
        await page.getByRole("button", { name: "Manage materials" }).click();
        await page.getByLabel("Filter built-ins").fill("Niobium alloy");
        const builtIn = page.locator(".catalog-manager__item").filter({ hasText: "Niobium alloy" });
        const visibility = builtIn.getByRole("checkbox");
        await expect(visibility).not.toBeChecked();
        await visibility.check();
        await builtIn.getByRole("button", { name: "Clone" }).click();
        await page.getByRole("button", { name: "Save material" }).click();
        await expect(page.locator(".catalog-manager__item--custom")
            .filter({ hasText: "Niobium alloy copy" })).toBeVisible();
        await page.reload();
        await page.getByRole("button", { name: "Manage materials" }).click();
        await page.getByLabel("Filter built-ins").fill("Niobium alloy");
        await expect(page.locator(".catalog-manager__item").filter({ hasText: "Niobium alloy" })
            .getByRole("checkbox")).toBeChecked();
        await expect(page.locator(".catalog-manager__item--custom")
            .filter({ hasText: "Niobium alloy copy" })).toBeVisible();
    });
});
