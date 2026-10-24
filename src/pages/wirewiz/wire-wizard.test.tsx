import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { converterStorageKey } from "../converter/converter-panel";
import { materialStorageKey } from "../../catalogs/materials/persistence";
import { WireWizard } from "./wire-wizard";
import { wireWizardStorageKey } from "./persistence";

vi.mock("./api", async () => {
    const actual = await vi.importActual<typeof import("./api")>("./api");
    const domain = await import("./domain");
    const calculated = (node: import("./domain").WireNode): import("./domain").CalculatedWire => ({
        id: node.id,
        kind: node.kind,
        label: node.kind,
        resistance: 1,
        resistancePerLength: 1,
        tcrSensitivity: 100,
        tcPrecision: 0.1,
        length: 10,
        surfaceArea: 1,
        crossSectionArea: 1,
        volume: 1,
        mass: 1,
        density: 1,
        heatCapacity: 1,
        normalizedFactors: [0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
        temperatureDataAvailable: true,
        temperatureDataRangeCelsius: [-100, 1000],
        temperatureExtrapolated: false,
        width: 0.25,
        thickness: 0.25,
        children: domain.wireChildren(node).map(calculated),
    });
    return {
        ...actual,
        calculateWireWizard: async (settings: import("./domain").WizardSettings, _materials: readonly import("../../catalogs/materials/catalog").Material[], temperature: number, materialId: string) => {
            const root = calculated(settings.root);
            return {
                calculation: { kind: "valid", root, components: [root, ...root.children] } as import("./domain").WizardCalculation,
                csv: "\"Temperature (degF)\",\"Electrical Resistivity\"",
                equivalent: { kind: "valid", sourceFactor: 1.2, targetTemperatureCelsius: temperature } as import("./domain").EquivalentTemperatureResult,
            };
        },
    };
});

describe("Wire Wizard material manager", () => {
    beforeEach(() => localStorage.clear());
    afterEach(cleanup);

    it("places page actions in the header and the manager directly below it", () => {
        const { container } = render(<WireWizard />);
        const header = container.querySelector(".wirewiz-header");
        expect(header).not.toBeNull();
        const managerButton = within(header as HTMLElement).getByRole("button", {
            name: "Manage materials",
        });
        expect(managerButton).toBeInTheDocument();
        expect(
            within(header as HTMLElement).getByRole("button", { name: "Converter" }),
        ).toBeInTheDocument();
        const menuButton = within(header as HTMLElement).getByText("Menu", { selector: "summary" });
        expect(menuButton).toBeInTheDocument();
        fireEvent.click(menuButton);
        expect(within(header as HTMLElement).getByRole("button", { name: "Reset" })).toBeInTheDocument();

        fireEvent.click(managerButton);
        expect(managerButton).toHaveClass("active");
        expect(header?.nextElementSibling).toHaveAttribute(
            "id",
            "wirewiz-material-manager",
        );
        fireEvent.click(screen.getByRole("button", { name: "Close material manager" }));
        expect(screen.queryByRole("heading", { name: /^Manage materials/ })).not.toBeInTheDocument();
        expect(managerButton).not.toHaveClass("active");
        fireEvent.click(managerButton);

        fireEvent.click(screen.getByRole("button", { name: "Converter" }));
        expect(screen.getByRole("button", { name: "Hide converter" }))
            .toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Input" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /^Result$/ }))
            .toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Output settings" }))
            .toBeInTheDocument();
        expect(document.querySelector(
            "#wirewiz-material-manager + #wirewiz-converter",
        )).not.toBeNull();
    });

    it("describes the task without implementation-history copy", () => {
        render(<WireWizard />);

        expect(screen.getByText("Build and analyze complex wires for custom coils."))
            .toBeInTheDocument();
        expect(screen.queryByText(/first modern version|legacy model/i)).not.toBeInTheDocument();
    });

    it("shows a compact summary that links to the root wire results", async () => {
        render(<WireWizard />);

        const summary = screen.getByLabelText("Results summary");
        expect(await within(summary).findByText("1.000 Ω")).toBeInTheDocument();
        expect(within(summary).getByText("10.0 mm")).toBeInTheDocument();
        expect(within(summary).getByRole("link", { name: "Results ↓" }))
            .toHaveAttribute("href", "#wirewiz-results");
        expect(document.querySelector("#wirewiz-results")).toBeInTheDocument();
    });

    it("keeps its converter instance independent from dedicated Converter data", () => {
        localStorage.setItem(converterStorageKey, JSON.stringify({
            fromUnit: "inch",
            fromValue: "2",
            toUnit: "inch",
            precision: 5,
        }));
        render(<WireWizard />);
        fireEvent.click(screen.getByRole("button", { name: "Converter" }));

        expect(screen.getByLabelText("Input unit")).toHaveValue("inch");
        expect(screen.getByLabelText("Input value")).toHaveValue(1);
        expect(screen.getByLabelText("Output unit")).toHaveValue("mm");
        expect(screen.getByLabelText("Decimal places")).toHaveValue("3");
    });

    it("starts hidden and updates built-in selector visibility immediately", () => {
        render(<WireWizard />);

        expect(
            screen.queryByRole("heading", { name: /^Manage materials/ }),
        ).not.toBeInTheDocument();

        const materialSelect = screen.getByLabelText("Material");
        expect(within(materialSelect).queryByRole("option", { name: "SS 304" }))
            .not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(screen.getByRole("checkbox", { name: "SS 304" }));

        expect(
            within(materialSelect).getByRole("option", { name: "SS 304" }),
        ).toBeInTheDocument();
        const saved = JSON.parse(localStorage.getItem(materialStorageKey) ?? "{}");
        expect(saved.hiddenDefaultMaterialIds).not.toContain("ss304");
    });

    it("keeps a selected built-in available after it is hidden", () => {
        render(<WireWizard />);
        const materialSelect = screen.getByLabelText("Material");

        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(
            screen.getByRole("checkbox", { name: "Kanthal A1 / APM" }),
        );

        expect(
            within(materialSelect).getByRole("option", {
                name: "Kanthal A1 / APM",
            }),
        ).toBeInTheDocument();
    });

    it("creates custom materials and blocks deletion while the design uses one", () => {
        render(<WireWizard />);
        const materialSelect = screen.getByLabelText("Material");

        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(
            screen.getByRole("button", { name: "New custom material" }),
        );
        fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
            target: { value: "Test alloy" },
        });
        fireEvent.change(screen.getByRole("spinbutton", { name: /Resistivity/ }), {
            target: { value: "1.23" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Save material" }));

        const customOption = within(materialSelect).getByRole("option", {
            name: "Test alloy",
        });
        fireEvent.change(materialSelect, { target: { value: customOption.getAttribute("value") } });
        fireEvent.click(screen.getByRole("button", { name: "Delete" }));

        expect(screen.getByText("Cannot delete Test alloy; it is used by Current Wire Wizard design."))
            .toHaveAttribute("role", "status");
    });

    it("persists the active wire and coil design across mounts", () => {
        const first = render(<WireWizard />);
        fireEvent.change(screen.getByRole("spinbutton", { name: "Inner diameter (mm)" }), {
            target: { value: "3.5" },
        });
        expect(JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}").version).toBe(1);
        first.unmount();

        render(<WireWizard />);
        expect(screen.getByRole("spinbutton", { name: "Inner diameter (mm)" })).toHaveValue(3.5);
        fireEvent.click(screen.getByText("Menu", { selector: "summary" }));
        expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Import" })).toBeInTheDocument();
    });

    it("preserves invalid drafts for correction in guarded coil and wire inputs", async () => {
        render(<WireWizard />);

        const guardedInputs = [
            ["Inner diameter (mm)", "0", 2],
            ["Wraps", "0", 8],
            ["Leg length (mm)", "-1", 5],
            ["Wrap spacing (mm)", "-1", 0.05],
            ["Diameter (mm)", "0", 0.25],
        ] as const;
        for (const [label, invalidValue] of guardedInputs) {
            const input = screen.getByRole("spinbutton", { name: label });
            fireEvent.change(input, { target: { value: invalidValue } });
            fireEvent.blur(input);
            await waitFor(() => expect(input).toHaveValue(Number(invalidValue)));
            expect(input).toHaveAttribute("aria-invalid", "true");
        }

        const awg = screen.getByRole("spinbutton", { name: "AWG" });
        fireEvent.change(awg, { target: { value: "-5" } });
        expect(awg).toHaveValue(-5);
    });

    it("preserves, validates, and explicitly applies temperature point drafts", async () => {
        render(<WireWizard />);
        fireEvent.click(screen.getByRole("button", { name: "TFR editor" }));
        const temperatures = screen.getByRole("textbox", { name: /Temperature points/ });
        const apply = screen.getByRole("button", { name: "Apply temperature points" });
        expect(apply).toBeDisabled();

        fireEvent.change(temperatures, { target: { value: "-100, 20.5 abc!" } });
        expect(temperatures).toHaveValue("-100, 20.5 abc!");
        expect(temperatures).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("Use only decimal numbers separated by commas.")).toHaveAttribute(
            "role",
            "alert",
        );
        expect(apply).toBeDisabled();
        expect(JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}").settings.temperatures)
            .toEqual([-40, 20, 50, 100, 150, 200, 250, 300]);

        fireEvent.change(temperatures, { target: { value: "-100, 20.5, 300" } });
        expect(temperatures).not.toHaveAttribute("aria-invalid");
        expect(screen.queryByText("Use only decimal numbers separated by commas.")).not.toBeInTheDocument();
        expect(apply).toBeEnabled();
        fireEvent.submit(apply.closest("form") as HTMLFormElement);

        await waitFor(() => expect(
            JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}").settings.temperatures,
        ).toEqual([-100, 20.5, 300]));
        expect(apply).toBeDisabled();
    });

    it("always shows root results and optionally shows component results", async () => {
        const { container } = render(<WireWizard />);

        await waitFor(() => expect(screen.getAllByRole("region", { name: "Results" })).toHaveLength(1));
        const rootResults = screen.getByRole("region", { name: "Results" });
        expect(within(rootResults).getByText("Resistance")).toBeInTheDocument();
        expect(within(rootResults).getByText("Heat flux")).toBeInTheDocument();
        const electricalDetails = screen.getByText("Electrical").closest("details");
        expect(electricalDetails).not.toHaveAttribute("open");
        fireEvent.click(screen.getByText("Electrical"));
        expect(electricalDetails).toHaveAttribute("open");
        expect(screen.getByText("Resistance per unit length")).toBeInTheDocument();
        expect(screen.getByText(/Ω\/m/)).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Add parallel wire" }));
        await waitFor(() => expect(screen.getAllByRole("region", { name: "Results" })).toHaveLength(1));
        expect(container.querySelectorAll(".wirewiz-wire-card--without-results")).toHaveLength(2);

        fireEvent.click(screen.getByRole("checkbox", {
            name: "Show results for all components",
        }));
        await waitFor(() => expect(screen.getAllByRole("region", { name: "Results" })).toHaveLength(3));
        expect(container.querySelectorAll(".wirewiz-wire-card--without-results")).toHaveLength(0);
    });

    it("links the round-wire AWG and millimeter inputs", () => {
        render(<WireWizard />);

        const awg = screen.getByRole("spinbutton", { name: "AWG" });
        const diameter = screen.getByRole("spinbutton", { name: "Diameter (mm)" });
        expect(Number(awg.getAttribute("value"))).toBe(30);
        expect(Number(diameter.getAttribute("value"))).toBe(0.25);
        fireEvent.change(awg, { target: { value: "30" } });

        expect(Number(diameter.getAttribute("value"))).toBe(0.25);
        expect(Number(awg.getAttribute("value"))).toBe(30);
    });

    it("shows the temperature scale toggle only for the graph", async () => {
        const { container } = render(<WireWizard />);

        const views = screen.getByRole("group", { name: "Temperature control" });
        within(views).getAllByRole("button").forEach((button) => {
            expect(button).toHaveClass("se-button--compact");
        });
        expect(within(views).getByRole("button", { name: "Graph" })).toHaveAttribute("aria-pressed", "true");
        await waitFor(() => expect(
            within(screen.getByRole("region", { name: "Results" })).getByText("Resistance"),
        ).toBeInTheDocument());
        const scaleToggle = screen.getByRole("group", { name: "Temperature scale" });
        expect(scaleToggle).toBeInTheDocument();
        within(scaleToggle).getAllByRole("button").forEach((button) => {
            expect(button).toHaveClass("se-button--compact");
        });
        fireEvent.click(screen.getByRole("button", { name: "Table" }));
        expect(screen.queryByRole("group", { name: "Temperature scale" })).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Graph" }));
        expect(screen.getByRole("group", { name: "Temperature scale" })).toBeInTheDocument();
    });

    it("links equivalent temperatures and includes custom temperature materials", async () => {
        localStorage.setItem(materialStorageKey, JSON.stringify({
            version: 1,
            customMaterials: [{
                id: "test-reference",
                name: "Test reference alloy",
                resistivity: 1.2,
                heatCapacity: null,
                density: null,
                tcr: 0.004,
            }],
            hiddenDefaultMaterialIds: [],
        }));
        render(<WireWizard />);

        fireEvent.click(screen.getByRole("button", { name: "Equivalents" }));
        const equivalentsResult = (): Element | null => document.querySelector(".wirewiz-equivalents__result");
        await waitFor(() => expect(equivalentsResult()).toHaveAttribute("role", "status"));
        const celsius = screen.getByRole("spinbutton", { name: "Celsius (°C)" });
        const fahrenheit = screen.getByRole("spinbutton", { name: "Fahrenheit (°F)" });
        expect(celsius).toHaveValue(210);
        expect(fahrenheit).toHaveValue(410);
        fireEvent.change(celsius, { target: { value: "200" } });
        expect(fahrenheit).toHaveValue(392);
        fireEvent.change(fahrenheit, { target: { value: "400" } });
        expect(Number((celsius as HTMLInputElement).value)).toBeCloseTo(204.444444);
        fireEvent.change(celsius, { target: { value: "0" } });
        expect(celsius).toHaveValue(0);
        fireEvent.change(fahrenheit, { target: { value: "0" } });
        expect(fahrenheit).toHaveValue(0);

        const referenceMaterial = screen.getByLabelText("Reference material");
        expect(within(referenceMaterial).getByRole("option", {
            name: "Test reference alloy",
        })).toBeInTheDocument();
        fireEvent.change(referenceMaterial, { target: { value: "test-reference" } });
        await waitFor(() => expect(equivalentsResult()).toHaveTextContent("Test reference alloy"));

        const saved = JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}");
        expect(saved.settings).not.toHaveProperty("equivalenceTemperatureCelsius");
        expect(saved.settings).not.toHaveProperty("equivalenceMaterialId");
    });

    it("adds a parallel sibling to a single wire and collapses back after removal", () => {
        const { container } = render(<WireWizard />);
        fireEvent.change(screen.getByLabelText("Material"), { target: { value: "ss316l" } });

        fireEvent.click(screen.getByRole("button", { name: "Add parallel wire" }));

        expect(screen.getByRole("article", { name: "parallel configuration" })).toBeInTheDocument();
        expect(container.querySelector(".wirewiz-wire-card__count")).toHaveTextContent("2");
        expect(screen.getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(2);
        const materialSelects = screen.getAllByLabelText("Material");
        expect(materialSelects[0]).toHaveValue("ss316l");
        expect(materialSelects[1]).toHaveValue("ka1");
        screen.getAllByLabelText("Wire type").slice(1).forEach((select) => {
            expect(within(select).queryByRole("option", { name: "Parallel" }))
                .not.toBeInTheDocument();
        });
        expect(screen.getAllByRole("button", { name: "Add parallel wire" }))
            .toHaveLength(1);

        const removeButtons = screen.getAllByTitle("Remove wire");
        fireEvent.click(removeButtons[1]);

        expect(screen.queryByRole("article", { name: "parallel configuration" })).not.toBeInTheDocument();
        expect(screen.getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(1);
        expect(screen.getByLabelText("Material")).toHaveValue("ss316l");
    });

    it("adds more than seven parallel cores to a Clapton and restores them on reload", () => {
        const { unmount } = render(<WireWizard />);
        fireEvent.change(screen.getByLabelText("Wire type"), { target: { value: "clapton" } });
        fireEvent.change(screen.getAllByLabelText("Wire type")[1], { target: { value: "parallel" } });
        for (let count = 2; count < 10; count += 1) {
            const core = screen.getByRole("article", { name: "parallel configuration" });
            fireEvent.click(within(core).getByRole("button", { name: "Add parallel wire" }));
        }
        expect(within(screen.getByRole("article", { name: "parallel configuration" }))
            .getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(10);
        unmount();
        render(<WireWizard />);
        expect(within(screen.getByRole("article", { name: "parallel configuration" }))
            .getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(10);
    });

    it("creates twisted wire with one configurable constituent", () => {
        render(<WireWizard />);

        fireEvent.change(screen.getByLabelText("Wire type"), {
            target: { value: "twisted" },
        });

        expect(screen.getByRole("article", { name: "twisted configuration" })).toBeInTheDocument();
        expect(screen.getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(1);
        expect(screen.getByRole("spinbutton", { name: "Strands" })).toHaveValue(2);
        expect(screen.getByText("Strand wire")).toBeInTheDocument();
        expect(screen.queryByTitle("Remove wire")).not.toBeInTheDocument();
        const strandType = screen.getAllByLabelText("Wire type")[1];
        expect(within(strandType).queryByRole("option", { name: "Parallel" }))
            .not.toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: "Add parallel wire" }))
            .toHaveLength(1);
        const saved = JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}");
        expect(saved.settings.root.members).toHaveLength(1);
    });

    it("keeps recovered Clapton child roles fixed while allowing compound components", () => {
        const { container } = render(<WireWizard />);

        fireEvent.change(screen.getByLabelText("Wire type"), {
            target: { value: "clapton" },
        });

        expect(screen.getByText("Core")).toBeInTheDocument();
        expect(screen.getByText("Wrap")).toBeInTheDocument();
        expect(screen.queryByTitle("Remove wire")).not.toBeInTheDocument();
        screen.getAllByLabelText("Wire type").slice(1).forEach((select) => {
            expect(within(select).getByRole("option", { name: "Parallel" }))
                .toBeInTheDocument();
        });
        expect(screen.getAllByRole("button", { name: "Add parallel wire" }))
            .toHaveLength(3);
        const addButtons = container.querySelectorAll(".wirewiz-wire-card__add-parallel");
        expect(addButtons).toHaveLength(3);
        addButtons.forEach((button) => {
            expect(button).toHaveTextContent("Add parallel wire");
            expect(button.previousElementSibling).toHaveClass("wirewiz-wire-card__body");
        });

        const rootCard = container.querySelector(".wirewiz-design > .wirewiz-wire-card");
        expect(rootCard).not.toBeNull();
        const wrapSpacing = within(rootCard as HTMLElement).getByRole("spinbutton", {
            name: "Wrap spacing (mm)",
        });
        expect(wrapSpacing).toHaveValue(0.05);
        fireEvent.change(wrapSpacing, { target: { value: "0.12" } });
        const saved = JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}");
        expect(saved.settings.root.wrapSpacing).toBe(0.12);
    });

    it("exposes wrap spacing for Staggered Clapton wire", () => {
        const { container } = render(<WireWizard />);
        fireEvent.change(screen.getByLabelText("Wire type"), {
            target: { value: "staggered-clapton" },
        });

        const rootCard = container.querySelector(".wirewiz-design > .wirewiz-wire-card");
        expect(rootCard).not.toBeNull();
        expect(within(rootCard as HTMLElement).getByRole("spinbutton", {
            name: "Wrap spacing (mm)",
        })).toHaveValue(0.05);
    });

    it("flattens add-parallel actions from members into their existing parent", () => {
        render(<WireWizard />);
        fireEvent.click(screen.getByRole("button", { name: "Add parallel wire" }));

        const parallelButtons = screen.getAllByRole("button", { name: "Add parallel wire" });
        expect(parallelButtons).toHaveLength(1);
        fireEvent.click(parallelButtons[0]);

        expect(screen.getAllByRole("article", { name: "parallel configuration" })).toHaveLength(1);
        expect(screen.getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(3);
        const saved = JSON.parse(localStorage.getItem(wireWizardStorageKey) ?? "{}");
        expect(saved.settings.root.members).toHaveLength(3);
        expect(saved.settings.root.members.every((member: { kind: string }) => member.kind === "single"))
            .toBe(true);
    });

    it("wraps an entire compound wire when adding a parallel wire", () => {
        render(<WireWizard />);
        fireEvent.change(screen.getByLabelText("Wire type"), {
            target: { value: "twisted" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Add parallel wire" }));

        expect(screen.getByRole("article", { name: "parallel configuration" })).toBeInTheDocument();
        expect(screen.getByRole("article", { name: "twisted configuration" })).toBeInTheDocument();
        expect(screen.getAllByRole("article", { name: "Single wire configuration" })).toHaveLength(2);
    });
});
