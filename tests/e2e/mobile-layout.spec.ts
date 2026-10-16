import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("shared mobile chrome keeps content and the current calculator within easy reach", async ({ page }) => {
    await page.goto("/ohm");

    const header = page.locator(".site-header");
    const calculatorStrip = page.locator(".site-nav__calculator-list");
    await expect(header).toBeVisible();
    await expect(calculatorStrip).toHaveCSS("flex-wrap", "nowrap");
    await expect(calculatorStrip).toHaveCSS("overflow-x", "auto");

    const initialMetrics = await page.evaluate(() => {
        const headerBox = document.querySelector(".site-header")!.getBoundingClientRect();
        const stripBox = document.querySelector(".site-header__tools")!.getBoundingClientRect();
        return {
            headerHeight: headerBox.height,
            stripHeight: stripBox.height,
            horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
    expect(initialMetrics.headerHeight).toBeLessThanOrEqual(175);
    expect(initialMetrics.stripHeight).toBeLessThanOrEqual(60);
    expect(initialMetrics.horizontalOverflow).toBe(0);

    await page.goto("/juice");
    const currentCalculator = page.getByRole("navigation", { name: "Calculator navigation" })
        .getByRole("link", { name: "E-liquid" });
    await expect(currentCalculator).toHaveAttribute("aria-current", "page");
    await expect.poll(async () => currentCalculator.evaluate((link) => {
        const linkBox = link.getBoundingClientRect();
        const stripBox = link.parentElement!.getBoundingClientRect();
        return linkBox.left >= stripBox.left - 1 && linkBox.right <= stripBox.right + 1;
    })).toBe(true);

    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");
    const minimumWidthMetrics = await page.evaluate(() => ({
        headerHeight: document.querySelector(".site-header")!.getBoundingClientRect().height,
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    expect(minimumWidthMetrics.headerHeight).toBeLessThanOrEqual(175);
    expect(minimumWidthMetrics.horizontalOverflow).toBe(0);
});
