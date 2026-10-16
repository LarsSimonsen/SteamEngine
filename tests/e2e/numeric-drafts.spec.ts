import { expect, test } from "@playwright/test";

const examples = [
    ["juice", "Flavor percentage 1", "0.02"],
    ["juice", "base PG", "1.02"],
    ["coil", "Wire diameter", "0.04"],
    ["ohm", "Resistance R", "0.004"],
    ["batt", "Capacity", "1000.02"],
    ["modrange", "Maximum power", "100.02"],
    ["converter", "Input value", "0.02"],
    ["wirewiz", "Inner diameter (mm)", "1.02"],
    ["wirewiz", "Diameter (mm)", "0.04"],
] as const;

for (const [route, name, value] of examples) {
    test(`${route}: ${name} preserves decimal typing`, async ({ page }) => {
        await page.goto(`/${route}`);
        const input = page.getByRole("spinbutton", { name: route === "coil" ? /Wire diameter/ : name, exact: true });
        await input.fill("");
        await expect(input).toHaveValue("");
        // Include pauses longer than the calculation debounce, especially around the decimal point.
        await input.pressSequentially(value, { delay: 300 });
        await expect(input).toHaveValue(value);
        await page.waitForTimeout(700);
        await expect(input).toHaveValue(value);
        await input.press("Tab");
        await expect(input).toHaveValue(value);
    });
}

test("TCR resistance preserves small decimal values", async ({ page }) => {
    await page.goto("/tcr");
    await page.getByRole("button", { name: "Add material", exact: true }).click();
    const input = page.getByRole("spinbutton").first();
    await input.fill("");
    await input.pressSequentially("0.02", { delay: 100 });
    await expect(input).toHaveValue("0.02");
});

test("Wire Wizard reset replaces a cleared draft even if its calculation value did not change", async ({ page }) => {
    await page.goto("/wirewiz");
    const input = page.getByRole("spinbutton", { name: "Inner diameter (mm)", exact: true });
    await input.fill("");
    await expect(input).toHaveValue("");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(input).toHaveValue("2");
});

test("Wire Wizard Fahrenheit input retains fractions and updates Celsius", async ({ page }) => {
    await page.goto("/wirewiz");
    await page.getByRole("tab", { name: "Equivalents", exact: true }).click();
    const input = page.getByRole("spinbutton", { name: "Fahrenheit (°F)", exact: true });
    await input.fill("");
    await input.pressSequentially("410.5", { delay: 100 });
    await input.press("Tab");
    await expect(input).toHaveValue("410.5");
    const celsius = page.getByRole("spinbutton", { name: "Celsius (°C)", exact: true });
    expect(Number(await celsius.inputValue())).toBeCloseTo((410.5 - 32) / 1.8);
});
