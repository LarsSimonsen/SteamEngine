import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { batteryStorageKey } from "../../catalogs/batteries/persistence";
import { modStorageKey } from "../../catalogs/mods/persistence";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { BatteryDrainCalculator, cellCountLabel } from "./battery-drain-calculator";

vi.mock("./api", () => ({
    calculateBatteryFromApi: async () => ({
        kind: "valid",
        values: {
            atomizer: { voltage: 3.7, current: 2, power: 7.4 },
            battery: { voltage: 3.7, current: 2.2, power: 8.1 },
            configuration: { seriesCells: 1, parallelStrings: 1, totalCells: 1 },
            pack: { voltage: 3.7, current: 2.2, power: 8.1, capacityMah: 3000 },
            safety: { currentPerCell: 2.2, effectiveLimit: 15, headroomPercent: 85, status: "safe" },
            runtime: { nominalEnergyWh: 11.1, continuousMinutes: 82 },
        },
    }),
}));

describe("cell count labels", () => {
    it.each([
        [1, "ogniwo"], [2, "ogniwa"], [4, "ogniwa"], [5, "ogniw"], [12, "ogniw"], [22, "ogniwa"],
    ] as const)("uses Polish agreement for %i cells", (count, expected) => {
        expect(cellCountLabel(count, "pl", calculatorMessagesFor("pl").batt)).toBe(expected);
    });

    it("preserves singular and plural labels for locales without the optional few form", () => {
        const messages = calculatorMessagesFor("en").batt;
        expect(cellCountLabel(1, "en", messages)).toBe("cell");
        for (const count of [2, 4, 5, 12, 22]) {
            expect(cellCountLabel(count, "en", messages)).toBe("cells");
        }
        expect(cellCountLabel(2, "pl", messages)).toBe("cells");
    });
});

describe("BatteryDrainCalculator", () => {
    beforeEach(() => {
        localStorage.clear();
        window.history.replaceState({}, "", "/");
    });
    afterEach(() => cleanup());

    it("groups cell selection with values and makes safety the headline result", async () => {
        render(<BatteryDrainCalculator />);
        expect(screen.getByRole("heading", { name: "Battery drain", level: 1 })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Device" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Cell and pack" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Cell selection" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Results" })).not.toBeInTheDocument();
        expect(screen.getByRole("region", { name: "Results" })).toBeInTheDocument();
        const orderedHeadings = screen.getAllByRole("heading").map((heading) => heading.textContent);
        expect(orderedHeadings.indexOf("Device")).toBeLessThan(orderedHeadings.indexOf("Cell and pack"));
        await waitFor(() => expect(screen.getByRole("heading", { name: "Battery safety" }))
            .toBeInTheDocument());
        expect(screen.getByText("2.2 A / 15 A")).toBeInTheDocument();
        expect(screen.getByText("85% Current headroom")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Continuous runtime" })).toBeInTheDocument();
        expect(screen.queryByText("Estimated runtime")).not.toBeInTheDocument();
        expect(screen.getAllByText("Select a preset here")).toHaveLength(2);
        expect(screen.queryByRole("searchbox", { name: "Search presets" })).not.toBeInTheDocument();
    });

    it("starts power-regulated devices at 20 W and keeps the 0.8 ohm resistance default", () => {
        render(<BatteryDrainCalculator />);
        expect(screen.getByRole("spinbutton", { name: "Output power" }))
            .toHaveAttribute("min", "1");
        expect(screen.getByRole("spinbutton", { name: "Output power" }))
            .toHaveAttribute("step", "1");
        expect(screen.getByRole("spinbutton", { name: "Output power" })).toHaveValue(20);
        expect(screen.getByRole("spinbutton", { name: "Cell voltage near cutoff" }))
            .toHaveAttribute("min", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Cell voltage near cutoff" }))
            .toHaveAttribute("step", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Maximum current" })).toHaveAttribute("min", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Maximum current" })).toHaveAttribute("step", "0.1");
        fireEvent.click(screen.getByLabelText("Unregulated mod", { selector: "input[type=radio]" }));
        expect(screen.getByRole("spinbutton", { name: "Atomizer resistance" })).toHaveValue(0.8);
    });

    it("uses the requested increments for voltage-regulated resistance and voltage inputs", () => {
        render(<BatteryDrainCalculator />);
        fireEvent.click(screen.getByLabelText("Voltage regulated mod", { selector: "input[type=radio]" }));

        expect(screen.getByRole("spinbutton", { name: "Output voltage" })).toHaveAttribute("min", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Output voltage" })).toHaveAttribute("step", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Atomizer resistance" })).toHaveAttribute("min", "0.05");
        expect(screen.getByRole("spinbutton", { name: "Atomizer resistance" })).toHaveAttribute("step", "0.05");
        expect(screen.getByRole("spinbutton", { name: "Nominal voltage" })).toHaveAttribute("min", "0.1");
        expect(screen.getByRole("spinbutton", { name: "Nominal voltage" })).toHaveAttribute("step", "0.1");
    });

    it("updates C rating when maximum current changes", () => {
        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Maximum current", { selector: "input[type=radio]" })).toBeChecked();
        expect(screen.getByRole("spinbutton", { name: /^C rating/ })).toBeDisabled();
        fireEvent.change(screen.getByRole("spinbutton", { name: /^Maximum current/ }), {
            target: { value: "18" },
        });
        expect(screen.getByRole("spinbutton", { name: /^C rating/ })).toHaveValue(6);
    });

    it("lets C rating drive a visibly read-only maximum current", () => {
        const { unmount } = render(<BatteryDrainCalculator />);
        fireEvent.click(screen.getByLabelText("C rating", { selector: "input[type=radio]" }));
        expect(screen.getByRole("spinbutton", { name: /^Maximum current/ })).toBeDisabled();
        const cRating = screen.getByLabelText("C rating", { selector: "input[type=number]" });
        expect(cRating).toBeEnabled();
        fireEvent.change(cRating, { target: { value: "6" } });
        expect(screen.getByRole("spinbutton", { name: /^Maximum current/ })).toHaveValue(18);
        expect(JSON.parse(localStorage.getItem("steamengine.batteryDrain.settings.v7") ?? "{}"))
            .toMatchObject({ ratingMethod: "c-rating", state: { battery: { maximumCurrent: 18, cRating: 6 } } });
        unmount();

        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("C rating", { selector: "input[type=radio]" })).toBeChecked();
        expect(screen.getByRole("spinbutton", { name: /^Maximum current/ })).toBeDisabled();
    });

    it("rounds populated C ratings to two decimal places", () => {
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByRole("spinbutton", { name: /^Maximum current/ }), {
            target: { value: "18" },
        });
        fireEvent.change(screen.getByLabelText("Capacity"), { target: { value: "3300" } });
        expect(screen.getByRole("spinbutton", { name: /^C rating/ })).toHaveValue(5.45);
    });

    it("preserves invalid drafts and shows specific inline errors", async () => {
        render(<BatteryDrainCalculator />);
        fireEvent.click(screen.getByLabelText("Voltage regulated mod"));
        const resistance = screen.getByLabelText("Atomizer resistance");
        fireEvent.change(resistance, { target: { value: "0" } });
        expect(resistance).toHaveValue(0);
        expect(resistance).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("Atomizer resistance: > 0")).toBeInTheDocument();
        const efficiency = screen.getByLabelText("Efficiency");
        fireEvent.change(efficiency, { target: { value: "101" } });
        expect(efficiency).toHaveValue(101);
        expect(efficiency).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("Efficiency: ≤ 100%")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByRole("heading", { name: "Battery safety" }))
            .toBeInTheDocument());
        expect(screen.getByText("Results use the last valid value.")).toHaveAttribute("role", "status");
    });

    it("offers four operating modes including current regulation", () => {
        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Power regulated mod")).toBeChecked();
        expect(screen.queryByLabelText("Atomizer resistance")).not.toBeInTheDocument();
        expect(screen.getByLabelText("Voltage regulated mod")).not.toBeChecked();
        expect(screen.getByLabelText("Current regulated")).not.toBeChecked();
        expect(screen.getByLabelText("Unregulated mod")).not.toBeChecked();
        expect(screen.queryByText("Regulation mode")).not.toBeInTheDocument();
        fireEvent.click(screen.getByLabelText("Voltage regulated mod"));
        expect(screen.getByLabelText("Atomizer resistance")).toBeInTheDocument();
        expect(screen.getByLabelText("Output voltage")).toBeInTheDocument();
        expect(screen.queryByLabelText("Output power")).not.toBeInTheDocument();
        expect(screen.getByLabelText("Cell voltage near cutoff")).toHaveValue(3.2);
        expect(screen.getByText(/per-cell voltage under load near your mod's cutoff/i)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText("Current regulated"));
        expect(screen.getByLabelText("Current")).toHaveValue(5);
        expect(screen.getByLabelText("Atomizer resistance")).toBeInTheDocument();
        expect(screen.queryByLabelText("Output voltage")).not.toBeInTheDocument();

        fireEvent.click(screen.getByLabelText("Unregulated mod"));
        expect(screen.getByLabelText("Atomizer resistance")).toBeInTheDocument();
        expect(screen.getByLabelText("Battery voltage")).toHaveValue(4.2);
        expect(screen.getByText(/full-charge battery voltage/i)).toBeInTheDocument();
    });

    it("shows only fixed power in the atomizer output for power-regulated devices", async () => {
        render(<BatteryDrainCalculator />);
        const atomizerOutput = await screen.findByRole("heading", { name: "Atomizer output" });
        const card = atomizerOutput.closest("article");
        expect(card).not.toBeNull();
        expect(within(card!).getByText("Power")).toBeInTheDocument();
        expect(within(card!).queryByText("Voltage")).not.toBeInTheDocument();
        expect(within(card!).queryByText("Current")).not.toBeInTheDocument();
    });

    it("offers common and custom battery configurations and persists them", () => {
        const { unmount } = render(<BatteryDrainCalculator />);
        const configuration = screen.getByLabelText("Battery configuration");
        fireEvent.change(configuration, { target: { value: "2s2p" } });
        expect(screen.getByText("2S × 2P = 4 cells")).toBeInTheDocument();
        expect(screen.getByText(/weakest cell limits the pack/i)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("steamengine.batteryDrain.settings.v7") ?? "{}"))
            .toMatchObject({ state: { battery: { seriesCells: 2, parallelStrings: 2 } } });

        fireEvent.change(configuration, { target: { value: "custom" } });
        fireEvent.change(screen.getByLabelText("Cells in series"), { target: { value: "5" } });
        fireEvent.change(screen.getByLabelText("Parallel strings"), { target: { value: "2" } });
        expect(screen.getByText("5S × 2P = 10 cells")).toBeInTheDocument();
        unmount();

        render(<BatteryDrainCalculator />);
        expect(screen.getByText("5S × 2P = 10 cells")).toBeInTheDocument();
    });

    it("reads the previous two-field regulated mode from its local settings", () => {
        localStorage.setItem("steamengine.batteryDrain.settings.v1", JSON.stringify({
            device: { mode: "regulated", regulationMode: "voltage" },
        }));
        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Voltage regulated mod")).toBeChecked();
        expect(screen.getByLabelText("Output voltage")).toBeInTheDocument();
        expect(screen.getByLabelText("Cell voltage near cutoff")).toHaveValue(3.2);
    });

    it("migrates the previous wrapped settings without inventing a mod selection", () => {
        localStorage.setItem("steamengine.batteryDrain.settings.v4", JSON.stringify({
            state: {
                device: { outputPower: 42 },
                battery: { seriesCells: 2 },
            },
            ratingMethod: "c-rating",
        }));
        render(<BatteryDrainCalculator />);
        expect(screen.getByRole("spinbutton", { name: "Output power" })).toHaveValue(42);
        expect(screen.getByText("2S × 1P = 2 cells")).toBeInTheDocument();
        expect(screen.getByLabelText("Regulated mod preset")).toHaveValue("");
        expect(screen.getByLabelText("C rating", { selector: "input[type=radio]" })).toBeChecked();
    });

    it("selects a confirmed operating mode and disables unsupported alternatives", () => {
        localStorage.setItem(modStorageKey, JSON.stringify({
            version: 1,
            customMods: [],
            hiddenDefaultModIds: [],
        }));
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-101" },
        });
        expect(screen.getByLabelText("Voltage regulated mod")).toBeChecked();
        expect(screen.getByLabelText("Power regulated mod")).toBeDisabled();
        expect(screen.getByLabelText("Power regulated mod")).not.toBeChecked();
        expect(screen.getByLabelText("Current regulated")).toBeDisabled();
        expect(screen.getByLabelText("Current regulated")).not.toBeChecked();

        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-3" },
        });
        expect(screen.getByLabelText("Bypass")).not.toBeChecked();
    });

    it("applies a selected mod topology, preserves operating power, and persists the selection", () => {
        localStorage.setItem(modStorageKey, JSON.stringify({
            version: 1,
            customMods: [],
            hiddenDefaultModIds: [],
        }));
        const { unmount } = render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-226" },
        });
        expect(document.querySelector("#battery-mod-configuration")).not.toBeInTheDocument();
        expect(screen.getByText("Device battery setup").nextElementSibling).toHaveTextContent("18650 · 2S1P");
        expect(screen.getByLabelText("Battery configuration")).toBeDisabled();
        expect(screen.getByRole("button", { name: "Custom configuration" })).toBeInTheDocument();
        expect(screen.getByText("2S × 1P = 2 cells")).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: "Output power" })).toHaveValue(20);
        expect(screen.getByRole("link", { name: "Details about this mod" }))
            .toHaveAttribute("href", "./catalog/mod/craving-vapor-hexohm-v3");
        expect(JSON.parse(localStorage.getItem("steamengine.batteryDrain.settings.v7") ?? "{}"))
            .toMatchObject({
                selectedModId: "preset-226",
                selectedModConfigurationId: "device:native-18650-series",
                state: { battery: { seriesCells: 2, parallelStrings: 1 } },
            });
        fireEvent.click(screen.getByRole("button", { name: "Custom configuration" }));
        expect(screen.getByLabelText("Battery configuration")).toBeEnabled();
        expect(screen.getByLabelText("Battery configuration")).toHaveValue("2s");
        expect(JSON.parse(localStorage.getItem("steamengine.batteryDrain.settings.v7") ?? "{}"))
            .toMatchObject({ usesCustomModConfiguration: true, selectedModConfigurationId: "" });
        unmount();

        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Regulated mod preset")).toHaveValue("preset-226");
        expect(screen.getByText("2S × 1P = 2 cells")).toBeInTheDocument();
        expect(screen.getByLabelText("Battery configuration")).toBeEnabled();
        fireEvent.change(screen.getByLabelText("Cell preset"), { target: { value: "battery-35" } });
        expect(screen.getByLabelText("Battery configuration")).toBeEnabled();
    });

    it("accepts a Mod Range handoff at maximum power and applies one clear battery configuration", () => {
        window.history.replaceState({}, "", "/batt?mod=craving-vapor-hexohm-v3&power=180");

        render(<BatteryDrainCalculator />);

        expect(screen.getByLabelText("Regulated mod preset")).toHaveValue("preset-226");
        expect(screen.getByRole("spinbutton", { name: "Output power" })).toHaveValue(180);
        expect(screen.getByText("Device battery setup").nextElementSibling).toHaveTextContent("18650 · 2S1P");
        expect(screen.getByText("2S × 1P = 2 cells")).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("steamengine.batteryDrain.settings.v7") ?? "{}"))
            .toMatchObject({
                selectedModId: "preset-226",
                selectedModConfigurationId: "device:native-18650-series",
                state: { device: { mode: "power-regulated", outputPower: 180 } },
            });
    });

    it("accepts a catalog battery handoff even when that preset is hidden", () => {
        localStorage.setItem(batteryStorageKey, JSON.stringify({
            version: 1,
            customBatteries: [],
            hiddenDefaultBatteryIds: ["battery-100"],
        }));
        window.history.replaceState({}, "", "/batt?battery=molicel-inr-21700-p45b");

        render(<BatteryDrainCalculator />);

        expect(screen.getByLabelText("Cell preset")).toHaveValue("battery-100");
        expect(screen.getByLabelText("Cell preset")).toHaveTextContent("Molicel INR-21700-P45B");
        expect(screen.getByRole("spinbutton", { name: "Capacity" })).toHaveValue(4500);
        expect(screen.getByRole("spinbutton", { name: "Maximum current" })).toHaveValue(45);
    });

    it("constrains board series input while leaving parallel strings editable", () => {
        localStorage.setItem(modStorageKey, JSON.stringify({
            version: 1,
            customMods: [],
            hiddenDefaultModIds: [],
        }));
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-29" },
        });

        expect(screen.getByText("Board input profile").nextElementSibling).toHaveTextContent("1S");
        const configuration = screen.getByLabelText("Battery configuration");
        expect(configuration).toBeEnabled();
        expect(within(configuration).queryByRole("option", { name: "2S" })).not.toBeInTheDocument();
        fireEvent.change(configuration, { target: { value: "2p" } });
        expect(screen.getByText("1S × 2P = 2 cells")).toBeInTheDocument();
        fireEvent.change(configuration, { target: { value: "custom" } });
        expect(screen.getByLabelText("Cells in series")).toBeDisabled();
        expect(screen.getByLabelText("Parallel strings")).toBeEnabled();
    });

    it("waits for an ambiguous mod configuration and then matches the selected cell format", () => {
        localStorage.setItem(modStorageKey, JSON.stringify({
            version: 1,
            customMods: [],
            hiddenDefaultModIds: [],
        }));
        localStorage.setItem(batteryStorageKey, JSON.stringify({
            version: 1,
            customBatteries: [],
            hiddenDefaultBatteryIds: [],
        }));
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-15" },
        });
        expect(screen.getByLabelText("Device battery setup")).toHaveValue("");
        expect(screen.getByRole("spinbutton", { name: "Output power" })).toHaveValue(20);

        fireEvent.change(screen.getByLabelText("Cell preset"), { target: { value: "battery-35" } });
        expect(screen.getByLabelText("Device battery setup")).toHaveValue("device:adapted-18650");
        expect(screen.getByText("1S × 1P = 1 cell")).toBeInTheDocument();
    });

    it("warns about incompatible cell formats and requested power above the mod limit", () => {
        localStorage.setItem(modStorageKey, JSON.stringify({
            version: 1,
            customMods: [],
            hiddenDefaultModIds: [],
        }));
        localStorage.setItem(batteryStorageKey, JSON.stringify({
            version: 1,
            customBatteries: [],
            hiddenDefaultBatteryIds: [],
        }));
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Regulated mod preset"), {
            target: { value: "preset-226" },
        });
        fireEvent.change(screen.getByLabelText("Cell preset"), { target: { value: "battery-82" } });
        expect(document.querySelector(".battery-mod-status[role=alert]"))
            .toHaveTextContent("Battery configuration: 18650 · Cell selection: 21700");
        fireEvent.change(screen.getByRole("spinbutton", { name: "Output power" }), {
            target: { value: "181" },
        });
        expect(screen.getByText(/Output power: 181 W > Maximum power: 180 W/)).toBeInTheDocument();
    });

    it("migrates the old regulated default voltage but preserves custom values", () => {
        localStorage.setItem("steamengine.batteryDrain.settings.v1", JSON.stringify({
            device: { mode: "power-regulated" },
            battery: { voltage: 4.2 },
        }));
        const { unmount } = render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Cell voltage near cutoff")).toHaveValue(3.2);
        unmount();

        localStorage.clear();
        localStorage.setItem("steamengine.batteryDrain.settings.v1", JSON.stringify({
            device: { mode: "power-regulated" },
            battery: { voltage: 3.6 },
        }));
        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Cell voltage near cutoff")).toHaveValue(3.6);
    });

    it("places battery management beside the preset selector", () => {
        const { container } = render(<BatteryDrainCalculator />);
        const header = container.querySelector(".battery-page-header");
        expect(header).not.toBeNull();
        const managerButton = screen.getByRole("button", { name: "Manage batteries" });
        expect(within(header as HTMLElement).queryByRole("button", { name: "Manage batteries" }))
            .not.toBeInTheDocument();
        expect(screen.getByLabelText("Cell preset").parentElement?.parentElement).toContainElement(managerButton);
        expect(screen.queryByRole("button", { name: "Reset" })).not.toBeInTheDocument();
        fireEvent.change(screen.getByLabelText("Cell voltage near cutoff"), { target: { value: "3.7" } });
        expect(within(header as HTMLElement).getByRole("button", { name: "Reset" })).toBeInTheDocument();

        fireEvent.click(managerButton);
        expect(managerButton).toHaveAttribute("aria-expanded", "true");
        const dialog = screen.getByRole("dialog", { name: "Manage batteries" });
        expect(dialog).toBe(container.querySelector("dialog#battery-manager"));
        expect(dialog).toHaveAttribute("open");
        expect(dialog).toHaveFocus();
        expect(screen.getByRole("heading", { name: /^Manage batteries/ })).toBeInTheDocument();
        // The browser turns Escape in a modal dialog into a cancel event.
        fireEvent(dialog, new Event("cancel", { cancelable: true }));
        expect(screen.queryByRole("heading", { name: /^Manage batteries/ })).not.toBeInTheDocument();
        expect(managerButton).toHaveFocus();

        fireEvent.click(managerButton);
        fireEvent.click(screen.getByRole("button", { name: "Close battery manager" }));
        expect(screen.queryByRole("heading", { name: /^Manage batteries/ })).not.toBeInTheDocument();
        expect(managerButton).not.toHaveClass("active");
    });

    it("shows the smaller default shortlist in the preset selector", () => {
        render(<BatteryDrainCalculator />);
        const selector = screen.getByLabelText("Cell preset");
        expect(within(selector).getByRole("option", { name: /LG 18650HG2/ })).toBeInTheDocument();
        expect(within(selector).getByRole("option", { name: /Samsung INR18650-25R/ })).toBeInTheDocument();
        expect(within(selector).queryByRole("option", { name: /LG 18650HB6/ })).not.toBeInTheDocument();
        fireEvent.change(selector, { target: { value: "battery-35" } });
        expect(screen.getByRole("link", { name: "Details about this battery" }))
            .toHaveAttribute("href", "./catalog/battery/lg-18650hg2");
    });

    it("updates the preset selector when default visibility changes", () => {
        render(<BatteryDrainCalculator />);
        fireEvent.click(screen.getByRole("button", { name: "Manage batteries" }));
        const builtIns = screen.getByRole("heading", { name: "Built-in batteries" }).closest("section");
        expect(builtIns).not.toBeNull();
        fireEvent.change(within(builtIns as HTMLElement).getByRole("searchbox"), {
            target: { value: "LG 18650HB6" },
        });
        const item = within(builtIns as HTMLElement).getByText("LG 18650HB6").closest("article");
        expect(item).not.toBeNull();
        expect(within(item as HTMLElement).getByRole("link", { name: "LG 18650HB6" }))
            .toHaveAttribute("href", "catalog/battery/lg-18650hb6");
        const visibility = within(item as HTMLElement).getByRole("button", {
            name: "Calculator visibility for LG 18650HB6",
        });
        expect(visibility).toHaveAttribute("aria-pressed", "false");
        expect(within(item as HTMLElement).getByText("Hidden")).toBeInTheDocument();
        fireEvent.click(visibility);
        expect(visibility).toHaveAttribute("aria-pressed", "true");
        expect(within(item as HTMLElement).getByText("Shown")).toBeInTheDocument();
        expect(screen.getByLabelText("Cell preset")).toHaveTextContent("LG 18650HB6");
    });

    it("creates, edits, and deletes a custom battery", () => {
        render(<BatteryDrainCalculator />);
        fireEvent.click(screen.getByRole("button", { name: "Manage batteries" }));
        fireEvent.click(screen.getByRole("button", { name: "New custom battery" }));
        fireEvent.change(screen.getByLabelText("Manufacturer"), { target: { value: "Example" } });
        fireEvent.change(screen.getByLabelText("Model"), { target: { value: "Cell" } });
        fireEvent.change(screen.getByLabelText("Form factor"), { target: { value: "cylindrical" } });
        fireEvent.change(screen.getByLabelText("Nominal diameter (mm)"), { target: { value: "18" } });
        fireEvent.change(screen.getByLabelText("Nominal length (mm)"), { target: { value: "65" } });
        fireEvent.change(screen.getByLabelText("Rated capacity (mAh)"), { target: { value: "3000" } });
        expect(screen.getByLabelText("Continuous discharge current (A)"))
            .toHaveAttribute("min", "0.1");
        expect(screen.getByLabelText("Continuous discharge current (A)"))
            .toHaveAttribute("step", "0.1");
        expect(screen.getByLabelText("Nominal voltage (V)"))
            .toHaveAttribute("min", "0.1");
        expect(screen.getByLabelText("Nominal voltage (V)"))
            .toHaveAttribute("step", "0.1");
        fireEvent.change(screen.getByLabelText("Continuous discharge current (A)"), {
            target: { value: "20" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Save battery" }));
        expect(screen.getByLabelText("Cell preset")).toHaveTextContent("Example Cell");

        fireEvent.click(screen.getByRole("button", { name: "Edit" }));
        fireEvent.change(screen.getByLabelText("Model"), { target: { value: "Cell 2" } });
        fireEvent.click(screen.getByRole("button", { name: "Save battery" }));
        expect(screen.getByLabelText("Cell preset")).toHaveTextContent("Example Cell 2");

        fireEvent.click(screen.getByRole("button", { name: "Delete" }));
        fireEvent.click(screen.getByRole("button", { name: "Confirm delete" }));
        expect(screen.getByLabelText("Cell preset")).not.toHaveTextContent("Example Cell 2");
    });

    it("clones a built-in battery even when it is hidden from the preset selector", () => {
        render(<BatteryDrainCalculator />);
        expect(screen.getByLabelText("Cell preset")).not.toHaveTextContent("LG 18650HB6");
        fireEvent.click(screen.getByRole("button", { name: "Manage batteries" }));
        const builtIns = screen.getByRole("heading", { name: "Built-in batteries" }).closest("section");
        expect(builtIns).not.toBeNull();
        fireEvent.change(within(builtIns as HTMLElement).getByRole("searchbox"), {
            target: { value: "LG 18650HB6" },
        });
        const item = within(builtIns as HTMLElement).getByText("LG 18650HB6").closest("article");
        expect(item).not.toBeNull();
        fireEvent.click(within(item as HTMLElement).getByRole("button", { name: "Clone" }));
        expect(screen.getByLabelText("Manufacturer")).toHaveValue("LG");
        expect(screen.getByLabelText("Model")).toHaveValue("18650HB6 copy");
        fireEvent.click(screen.getByRole("button", { name: "Save battery" }));
        expect(screen.getByLabelText("Cell preset")).toHaveTextContent("LG 18650HB6 copy");
    });

    it("uses custom batteries and blocks deletion while one is selected", () => {
        const customId = "0503510d-505d-4ca4-9783-fb6171901e01";
        localStorage.setItem(batteryStorageKey, JSON.stringify({
            version: 1,
            customBatteries: [{
                id: customId,
                manufacturer: "Test",
                model: "Battery",
                displayName: "Test Battery",
                ratedCapacityMah: 2800,
                continuousDischargeCurrentAmps: 20,
            }],
            hiddenDefaultBatteryIds: [],
        }));
        render(<BatteryDrainCalculator />);
        fireEvent.change(screen.getByLabelText("Cell preset"), { target: { value: customId } });
        expect(screen.getByLabelText("Capacity")).toHaveValue(2800);
        expect(screen.getByText("Custom battery")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Manage batteries" }));
        fireEvent.click(screen.getByRole("button", { name: "Delete" }));
        expect(screen.getByText("Cannot delete Test Battery; it is used by Current Battery Drain settings."))
            .toHaveAttribute("role", "status");
    });
});
