import { expect, test } from "@playwright/test";

test.describe("Wire Wizard", () => {
  test("shows the graph by default and supports recursive wire editing", async ({
    page,
  }) => {
    await page.goto("/wirewiz");
    await expect(
      page.getByRole("heading", { name: "Wire Wizard" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Wire Wizard" }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("img", { name: "Temperature resistance factor graph" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Add parallel wire", exact: true }).click();
    await expect(page.locator(".wirewiz-wire-card")).toHaveCount(3);
    const removeButtons = page.locator('button[title="Remove wire"]');
    await expect(removeButtons).toHaveCount(2);
    await removeButtons.nth(1).click();
    await expect(page.locator(".wirewiz-wire-card")).toHaveCount(1);
    await expect(page.getByRole("article", { name: "Single wire configuration" })).toBeVisible();
  });

  test("uses the full desktop width for the wire design", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/wirewiz");
    const layoutBox = await page.locator(".wirewiz-layout").boundingBox();
    const coilBox = await page.locator(".wirewiz-coil-parameters").boundingBox();
    const designBox = await page.locator(".wirewiz-design").boundingBox();
    const temperatureBox = await page.locator(".wirewiz-temperature").boundingBox();
    expect(layoutBox).not.toBeNull();
    expect(coilBox).not.toBeNull();
    expect(designBox).not.toBeNull();
    expect(temperatureBox).not.toBeNull();
    expect(Math.abs(coilBox!.width - layoutBox!.width)).toBeLessThan(1);
    expect(Math.abs(designBox!.width - layoutBox!.width)).toBeLessThan(1);
    expect(designBox!.y).toBeGreaterThanOrEqual(coilBox!.y + coilBox!.height);
    expect(Math.abs(temperatureBox!.width - layoutBox!.width)).toBeLessThan(1);
    expect(temperatureBox!.y).toBeGreaterThanOrEqual(designBox!.y + designBox!.height);
    const parameterBoxes = await page.locator(".wirewiz-coil-parameters > label").evaluateAll(
      (labels) => labels.map((label) => {
        const box = label.getBoundingClientRect();
        return { x: box.x, y: box.y };
      }),
    );
    expect(parameterBoxes).toHaveLength(4);
    expect(Math.max(...parameterBoxes.map(({ y }) => y)) -
      Math.min(...parameterBoxes.map(({ y }) => y))).toBeLessThan(1);
    expect(parameterBoxes.map(({ x }) => x)).toEqual(
      [...parameterBoxes.map(({ x }) => x)].sort((left, right) => left - right),
    );
    const rootCard = page.locator(".wirewiz-design > .wirewiz-wire-card");
    const rootAddButton = rootCard.locator(":scope > .wirewiz-wire-card__add-parallel");
    const rootBody = rootCard.locator(":scope > .wirewiz-wire-card__body");
    const rootCardBox = await rootCard.boundingBox();
    const rootAddButtonBox = await rootAddButton.boundingBox();
    const rootBodyBox = await rootBody.boundingBox();
    expect(rootCardBox).not.toBeNull();
    expect(rootAddButtonBox).not.toBeNull();
    expect(rootBodyBox).not.toBeNull();
    expect(rootAddButtonBox!.width).toBeGreaterThan(rootCardBox!.width * 0.9);
    expect(rootBodyBox!.y + rootBodyBox!.height).toBeLessThanOrEqual(rootAddButtonBox!.y);
  });

  test("matches the design temperature to built-in and custom reference materials", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("steamengine.materials.v1", JSON.stringify({
        version: 1,
        customMaterials: [{
          id: "browser-reference",
          name: "Browser reference alloy",
          resistivity: 1.2,
          heatCapacity: null,
          density: null,
          tcr: 0.004,
        }],
        hiddenDefaultMaterialIds: [],
      }));
    });
    await page.goto("/wirewiz");
    await page.getByRole("tab", { name: "Graph" }).click();
    await expect(
      page.getByRole("img", { name: "Temperature resistance factor graph" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "TFR editor" }).click();
    await page.getByRole("textbox", { name: /Temperature points/ })
      .fill("20, 50, 100, 150, 200, 250, 300");
    await page.getByRole("button", { name: "Apply temperature points" }).click();
    await page.getByRole("tab", { name: "Graph" }).click();
    await expect(
      page.getByText("Values outside the available TFR range were linearly extrapolated."),
    ).toHaveCount(0);
    await page.getByRole("tab", { name: "Equivalents" }).click();

    const celsius = page.getByRole("spinbutton", { name: "Celsius" });
    const fahrenheit = page.getByRole("spinbutton", { name: "Fahrenheit" });
    await expect(celsius).toHaveValue("210");
    await expect(fahrenheit).toHaveValue("410");
    await celsius.fill("200");
    await expect(fahrenheit).toHaveValue("392");

    await page.getByLabel("Reference material").selectOption("browser-reference");
    await expect(page.getByRole("status")).toContainText("Browser reference alloy");
    await expect(page.getByText(/resistance factor of/)).toBeVisible();
  });

  test("renders read-only DNA200 output and downloads a CSV", async ({
    page,
  }) => {
    await page.goto("/wirewiz");
    await page.getByRole("tab", { name: "TFR editor" }).click();
    await page.getByRole("textbox", { name: /Temperature points/ })
      .fill("-40, 50, 100, 150, 200");
    await page.getByRole("button", { name: "Apply temperature points" }).click();
    await page.getByRole("tab", { name: "DNA200" }).click();
    const output = page.getByRole("textbox", { name: "DNA200 CSV output" });
    await expect(output).toHaveValue(/Temperature \(degF\)/);
    await expect(output).not.toHaveValue(/\n68\.0000,/);
    await expect(output).toHaveAttribute("readonly", "");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Download CSV/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(
      /^DNA200-.*-SteamEngine\.csv$/,
    );
  });

  test("opens an independent full converter beneath the header", async ({
    page,
  }) => {
    await page.goto("/wirewiz");
    await page.getByRole("button", { name: "Converter" }).click();
    await expect(page.locator(".wirewiz-header + #wirewiz-converter"))
      .toBeVisible();
    await expect(page.getByRole("heading", { name: "Input" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Result", exact: true }))
      .toBeVisible();
    await expect(page.getByRole("heading", { name: "Output settings" }))
      .toBeVisible();

    await page.getByLabel("Output unit").selectOption("swg");
    await page.getByRole("button", { name: "Hide converter" }).click();
    await page.getByRole("button", { name: "Converter" }).click();
    await expect(page.getByLabel("Output unit")).toHaveValue("mm");

    await page.getByRole("button", { name: "Manage materials" }).click();
    await expect(page.locator("#wirewiz-material-manager + #wirewiz-converter"))
      .toBeVisible();
  });

  test("persists and imports versioned wire and coil designs", async ({ page }) => {
    await page.goto("/wirewiz");
    await page.getByLabel("Inner diameter (mm)").fill("3.5");
    await page.reload();
    await expect(page.getByLabel("Inner diameter (mm)")).toHaveValue("3.5");

    await page.getByRole("button", { name: "Menu" }).click();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export", exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("SteamEngine-WireWizard-design.json");

    const imported = {
      version: 1,
      settings: {
        innerDiameter: 4,
        wraps: 6,
        legLength: 5,
        wrapSpacing: 0.05,
        temperatures: [0, 100],
        scale: "celsius",
        showAllComponents: false,
        root: {
          kind: "single",
          id: "imported-wire",
          materialId: "ka1",
          profile: "round",
          diameter: 0.4,
          width: 0.5,
          thickness: 0.1,
        },
      },
    };
    await page.getByLabel("Import Wire Wizard design").setInputFiles({
      name: "design.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(imported)),
    });
    await expect(page.getByRole("status")).toHaveText("Wire and coil design imported.");
    await expect(page.getByLabel("Inner diameter (mm)")).toHaveValue("4");
    await page.reload();
    await expect(page.getByLabel("Inner diameter (mm)")).toHaveValue("4");
  });

  test("validates and applies temperature drafts", async ({ page }) => {
    await page.goto("/wirewiz");
    await page.getByRole("tab", { name: "TFR editor" }).click();
    const input = page.getByRole("textbox", { name: /Temperature points/ });
    const apply = page.getByRole("button", { name: "Apply temperature points" });

    await input.fill("-40, 20 abc!");
    await expect(input).toHaveValue("-40, 20 abc!");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Use only decimal numbers separated by commas.")).toBeVisible();
    await expect(apply).toBeDisabled();

    await input.fill("-40, 0, 50, 100, 150, 200, 300");
    await input.press("Enter");
    await expect(apply).toBeDisabled();
    await expect.poll(() => page.evaluate(() => JSON.parse(
      localStorage.getItem("steamengine.wireWizard.design.v1") ?? "{}",
    ).settings?.temperatures)).toEqual([-40, 0, 50, 100, 150, 200, 300]);
  });

  test("keeps a composite wire readable without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/wirewiz");
    await page.getByRole("combobox", { name: "Wire type" }).selectOption("clapton");

    const rootCard = page.locator(".wirewiz-design > .wirewiz-wire-card");
    await expect.poll(async () => page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )).toBe(0);
    await expect(rootCard).toHaveCSS("grid-template-columns", /\d+(\.\d+)?px/);
    const rootAddButton = rootCard.locator(":scope > .wirewiz-wire-card__add-parallel");
    const rootBody = rootCard.locator(":scope > .wirewiz-wire-card__body");
    const rootAddButtonBox = await rootAddButton.boundingBox();
    const rootBodyBox = await rootBody.boundingBox();
    expect(rootAddButtonBox).not.toBeNull();
    expect(rootBodyBox).not.toBeNull();
    expect(rootBodyBox!.y + rootBodyBox!.height).toBeLessThanOrEqual(rootAddButtonBox!.y);

    const childCards = rootCard.locator(".wirewiz-child > .wirewiz-wire-card");
    await expect(childCards).toHaveCount(2);
    for (const childCard of await childCards.all()) {
      await expect.poll(async () => childCard.evaluate((card) => {
        const box = card.getBoundingClientRect();
        return box.left >= 0 && box.right <= document.documentElement.clientWidth;
      })).toBe(true);
      const childAddButton = childCard.locator(":scope > .wirewiz-wire-card__add-parallel");
      const childCardBox = await childCard.boundingBox();
      const childAddButtonBox = await childAddButton.boundingBox();
      const childBodyBox = await childCard.locator(":scope > .wirewiz-wire-card__body").boundingBox();
      expect(childCardBox).not.toBeNull();
      expect(childAddButtonBox).not.toBeNull();
      expect(childBodyBox).not.toBeNull();
      expect(childAddButtonBox!.width).toBeGreaterThan(childCardBox!.width * 0.85);
      expect(childBodyBox!.y + childBodyBox!.height).toBeLessThanOrEqual(childAddButtonBox!.y);
    }
  });
});
