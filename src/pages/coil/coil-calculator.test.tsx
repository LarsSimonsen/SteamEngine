import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { materialStorageKey } from "../../catalogs/materials/persistence";
import { CoilCalculator } from "./coil-calculator";

describe("CoilCalculator thermal results", () => {
    beforeEach(() => {
        localStorage.clear();
        window.history.replaceState(null, "", "/coil/");
        vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
            const url = new URL(String(input));
            const missingThermalData = url.searchParams.get("hc") === "null";
            const multiCoil = url.searchParams.get("s") !== "single";
            return new Response(JSON.stringify({
                wireLength: 24,
                resistancePerLength: 0.075,
                numberOfWraps: 8,
                roundedWraps: 8,
                roundedWrapResistance: 1.8,
                halfWraps: "8.5",
                halfWrapResistance: 1.9,
                resistancePerCoil: multiCoil ? 3.6 : undefined,
                legLoss: 0.05,
                heatCapacity: missingThermalData ? null : 10,
                surfaceArea: 1,
                coilArea: 1,
                crossSectionalArea: 1,
                wireVolume: 1,
                density: missingThermalData ? null : 8.4,
                wireMass: missingThermalData ? null : 8.4,
                outerDiameter: 1,
                neutralAxisDiameter: 1,
                loopCircumference: 1,
                helixAngle: 1,
                loopLength: 1,
                coilWidth: 1,
                recommendPower: 10,
                recommendVoltage: 4.2,
                wireLengthWarning: false,
                legLossStatus: "normal",
            }), { status: 200, headers: { "Content-Type": "application/json" } });
        }));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        cleanup();
    });

    it("places page actions in the header and the manager directly below it", () => {
        const { container } = render(<CoilCalculator />);
        const header = container.querySelector(".coil-page-header");
        expect(header).not.toBeNull();
        expect(within(header as HTMLElement).getByRole("button", { name: "Advanced" }))
            .toBeInTheDocument();
        const managerButton = within(header as HTMLElement).getByRole("button", { name: "Manage materials" });
        expect(managerButton).toBeInTheDocument();
        expect(within(header as HTMLElement).getByRole("button", { name: "Converter" }))
            .toBeInTheDocument();
        expect(within(header as HTMLElement).getByRole("button", { name: "Reset" }))
            .toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Results ↓" })).toHaveAttribute("href", "#coil-results-title");

        fireEvent.click(screen.getByRole("button", { name: "Advanced" }));
        fireEvent.click(managerButton);
        expect(managerButton).toHaveClass("active");
        expect(header?.nextElementSibling).toHaveAttribute("id", "coil-material-manager");

        fireEvent.click(screen.getByRole("button", { name: "Converter" }));
        expect(screen.getByRole("button", { name: "Hide converter" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Input" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Result" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Output settings" })).toBeInTheDocument();
        expect(document.querySelector("#coil-material-manager + #coil-converter")).not.toBeNull();
    });

    it("shows a compact summary that links to the full results", async () => {
        render(<CoilCalculator />);

        const summary = screen.getByLabelText("Results summary");
        expect(await within(summary).findByText("8")).toBeInTheDocument();
        expect(within(summary).getByText("1.8 Ω")).toBeInTheDocument();
        expect(within(summary).getByText("10 W")).toBeInTheDocument();
        expect(document.querySelector("#coil-results-title")).toBeInTheDocument();
    });

    it("announces one result summary and keeps the heat-flux output from announcing on its own", async () => {
        const { container } = render(<CoilCalculator />);
        const announcement = container.querySelector(".sr-only[role='status']")!;
        await waitFor(() => expect(container.querySelector(".coil-heatflux-output")).toBeInTheDocument());
        expect(announcement).toBeEmptyDOMElement();
        expect(container.querySelector(".coil-heatflux-output")).toHaveAttribute("aria-live", "off");

        const calculate = vi.mocked(fetch).getMockImplementation()!;
        vi.mocked(fetch).mockImplementation(async (input) => {
            const body = await (await calculate(input)).json() as Record<string, unknown>;
            return new Response(JSON.stringify({ ...body, numberOfWraps: 6.5, roundedWrapResistance: 1.5 }));
        });
        fireEvent.change(screen.getByRole("spinbutton", { name: /Target resistance/ }), { target: { value: "1.5" } });

        await waitFor(() => expect(announcement).toHaveTextContent(
            "Number of wraps 6.5, actual resistance 1.5 Ω, Heat flux 10 W 4.2 V"),
            { timeout: 3000 });
    });

    it("resets calculator settings without closing header tools", async () => {
        render(<CoilCalculator />);
        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(screen.getByRole("button", { name: "Converter" }));
        fireEvent.click(screen.getByRole("button", { name: "Advanced" }));
        const targetResistance = screen.getByRole("spinbutton", { name: /Target resistance/ });
        fireEvent.change(targetResistance, { target: { value: "1.2" } });

        fireEvent.click(screen.getByRole("button", { name: "Reset" }));

        expect(targetResistance).toHaveValue(1.8);
        expect(screen.getByRole("button", { name: "Advanced" })).not.toHaveClass("active");
        expect(document.querySelector("#coil-material-manager")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Hide converter" })).toBeInTheDocument();
        await waitFor(() => {
            const stored = JSON.parse(localStorage.getItem("steamengine.coil.settings.v1") ?? "null") as {
                readonly settings?: { readonly targetResistance?: number; readonly advanced?: boolean };
            } | null;
            expect(stored?.settings?.targetResistance).toBe(1.8);
            expect(stored?.settings?.advanced).toBe(false);
        });
    });

    it("supports replacing the target resistance with a sub-ohm decimal", async () => {
        render(<CoilCalculator />);
        const targetResistance = screen.getByRole("spinbutton", { name: /Target resistance/ });

        fireEvent.change(targetResistance, { target: { value: "0" } });
        expect(targetResistance).toHaveValue(0);
        fireEvent.change(targetResistance, { target: { value: "0." } });
        fireEvent.change(targetResistance, { target: { value: "0.5" } });

        await waitFor(() => expect(targetResistance).toHaveValue(0.5));
        await waitFor(() => {
            const stored = JSON.parse(localStorage.getItem("steamengine.coil.settings.v1") ?? "null") as {
                readonly settings?: { readonly targetResistance?: number };
            } | null;
            expect(stored?.settings?.targetResistance).toBe(0.5);
        });
    });

    it("exposes Advanced as a disclosure control", () => {
        render(<CoilCalculator />);
        const advanced = screen.getByRole("button", { name: "Advanced" });

        expect(advanced).toHaveAttribute("aria-expanded", "false");
        expect(advanced).toHaveAttribute("aria-controls", "coil-advanced-fields coil-advanced-results");
        expect(document.querySelector("#coil-advanced-fields")).not.toBeVisible();

        fireEvent.click(advanced);

        expect(advanced).toHaveAttribute("aria-expanded", "true");
        expect(document.querySelector("#coil-advanced-fields")).toBeVisible();
    });

    it("labels multi-coil targets and shows per-coil and total actual resistance", async () => {
        render(<CoilCalculator />);
        fireEvent.change(screen.getByLabelText("Setup"), { target: { value: "parallel-2" } });

        expect(await screen.findByRole("spinbutton", { name: /Target resistance — Total/ }))
            .toBeInTheDocument();
        expect(screen.getByText("2 × Resistance per coil. Target resistance: Total.")).toBeInTheDocument();

        const roundedRow = (await screen.findByText("8 number of wraps — actual resistance"))
            .closest<HTMLElement>(".coil-result-row");
        expect(roundedRow).not.toBeNull();
        expect(within(roundedRow!).getByText("1.8 Ω", { exact: false })).toHaveTextContent("per coil");
        expect(within(roundedRow!).getByText("0.9 Ω", { exact: false })).toHaveTextContent("Total");
    });

    it("shows half wraps as a decimal and presents heat-flux power as an estimate", async () => {
        render(<CoilCalculator />);

        expect(await screen.findByText("8.5 number of wraps — actual resistance")).toBeInTheDocument();
        expect(screen.queryByText(/recommended power/i)).not.toBeInTheDocument();
        expect(screen.getAllByText("10 W")).toHaveLength(2);
        expect(screen.getByText("4.2 V")).toBeInTheDocument();
    });

    it("restores the last valid target resistance when an invalid draft loses focus", () => {
        render(<CoilCalculator />);
        const targetResistance = screen.getByRole("spinbutton", { name: /Target resistance/ });

        fireEvent.change(targetResistance, { target: { value: "0" } });
        expect(targetResistance).toHaveValue(0);
        fireEvent.blur(targetResistance);

        expect(targetResistance).toHaveValue(1.8);
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("preserves an invalid inner diameter for correction", async () => {
        render(<CoilCalculator />);
        const innerDiameter = screen.getByRole("spinbutton", { name: /Inner diameter/ });

        fireEvent.focus(innerDiameter);
        fireEvent.change(innerDiameter, { target: { value: "0" } });
        fireEvent.blur(innerDiameter);

        await waitFor(() => expect(innerDiameter).toHaveValue(0));
        expect(innerDiameter).toHaveAttribute("aria-invalid", "true");
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("allows zero leg length but marks negative drafts invalid", async () => {
        render(<CoilCalculator />);
        const legLength = screen.getByRole("spinbutton", { name: /Leg length/ });

        fireEvent.change(legLength, { target: { value: "0" } });
        await waitFor(() => expect(legLength).toHaveValue(0));

        fireEvent.focus(legLength);
        fireEvent.change(legLength, { target: { value: "-1" } });
        fireEvent.blur(legLength);
        await waitFor(() => expect(legLength).toHaveValue(-1));
        expect(legLength).toHaveAttribute("aria-invalid", "true");
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("places AWG and wire diameter in the same field group", () => {
        const { container } = render(<CoilCalculator />);

        const awg = screen.getByRole("spinbutton", { name: "AWG" });
        const diameter = screen.getByRole("spinbutton", { name: /Wire diameter/ });
        const fieldGroup = container.querySelector(".coil-wire-diameter-fields");

        expect(fieldGroup).not.toBeNull();
        expect(fieldGroup).toContainElement(awg);
        expect(fieldGroup).toContainElement(diameter);
    });

    it("places material and wire profile in the same field group", () => {
        const { container } = render(<CoilCalculator />);

        const material = screen.getByLabelText("Material");
        const profile = screen.getByLabelText("Wire profile");
        const fieldGroup = container.querySelector(".coil-material-profile-fields");

        expect(fieldGroup).not.toBeNull();
        expect(fieldGroup).toContainElement(material);
        expect(fieldGroup).toContainElement(profile);
    });

    it("migrates the retired linear Ni200 ID in saved settings", () => {
        localStorage.setItem("steamengine.coil.settings.v1", JSON.stringify({
            version: 1,
            settings: { materialId: "ni200lin" },
        }));

        render(<CoilCalculator />);

        expect(screen.getByLabelText("Material")).toHaveValue("ni200");
    });

    it("uses the archived gauge thresholds for key results", async () => {
        render(<CoilCalculator />);

        const wraps = await screen.findByRole("meter", { name: "Number of wraps" });
        const heatCapacity = screen.getByRole("meter", { name: "Heat capacity" });
        const legLoss = screen.getByRole("meter", { name: "Leg power loss" });

        expect(wraps).toHaveAttribute("optimum", "8");
        expect(wraps).toHaveAttribute("low", "4");
        expect(wraps).toHaveAttribute("high", "14");
        expect(wraps).toHaveAttribute("max", "20");
        expect(heatCapacity).toHaveAttribute("optimum", "1");
        expect(heatCapacity).toHaveAttribute("low", "20");
        expect(heatCapacity).toHaveAttribute("high", "40");
        expect(heatCapacity).toHaveAttribute("max", "100");
        expect(legLoss).toHaveAttribute("optimum", "1");
        expect(legLoss).toHaveAttribute("low", "20");
        expect(legLoss).toHaveAttribute("high", "40");
        expect(legLoss).toHaveAttribute("max", "100");
    });

    it("shows unavailable instead of zero when material thermal data is missing", async () => {
        localStorage.setItem(materialStorageKey, JSON.stringify({
            version: 1,
            customMaterials: [{
                id: "78572205-4329-466c-922a-f478de5222d4",
                name: "Unknown thermal alloy",
                resistivity: 1.1,
                heatCapacity: null,
                density: null,
            }],
            hiddenDefaultMaterialIds: [],
        }));
        render(<CoilCalculator />);
        fireEvent.change(screen.getByLabelText("Material"), {
            target: { value: "78572205-4329-466c-922a-f478de5222d4" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Advanced" }));

        for (const label of ["Heat capacity", "Density", "Wire mass"]) {
            const row = (await screen.findByText(label)).closest<HTMLElement>(".coil-result-row");
            expect(row).not.toBeNull();
            expect(within(row!).getByText("Unavailable")).toBeInTheDocument();
        }
    });

    it("retires saved direct custom resistance settings to the default material", () => {
        localStorage.setItem("steamengine.coil.settings.v1", JSON.stringify({
            version: 1,
            settings: { materialId: "custom", resistancePerLength: 0.123 },
        }));
        render(<CoilCalculator />);

        expect(screen.getByLabelText("Material")).toHaveValue("ka1");
        expect(screen.queryByRole("option", { name: "Custom resistance per length" }))
            .not.toBeInTheDocument();
    });

    it("uses named custom materials and blocks deletion while one is selected", () => {
        localStorage.setItem(materialStorageKey, JSON.stringify({
            version: 1,
            customMaterials: [{
                id: "fbf291f5-cd77-4501-b5dd-7f58915cd1f8",
                name: "Test alloy",
                resistivity: 1.23,
                heatCapacity: null,
                density: null,
            }],
            hiddenDefaultMaterialIds: [],
        }));
        render(<CoilCalculator />);

        fireEvent.change(screen.getByLabelText("Material"), {
            target: { value: "fbf291f5-cd77-4501-b5dd-7f58915cd1f8" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(screen.getByRole("button", { name: "Delete" }));

        expect(screen.getByText("Cannot delete Test alloy; it is used by Current Coil calculator settings."))
            .toHaveAttribute("role", "status");
    });
});
