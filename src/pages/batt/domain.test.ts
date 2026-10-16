import { describe, expect, it } from "vitest";
import {
    applyPreset,
    applyModBatteryOption,
    batteryPresetFormat,
    defaultState,
    modBatteryCompatibility,
    modBatteryOptions,
    modDeviceModeStatus,
    modLimitViolations,
    preferredDeviceModeForMod,
    recommendedBatteryVoltage,
    updateBatteryField,
} from "./domain";
import { batteryPresets } from "../../catalogs/batteries/defaults";
import { builtInPresets } from "../../catalogs/mods/presets";

describe("battery drain domain", () => {
    it("uses mode-appropriate conservative battery voltages", () => {
        expect(defaultState.battery.voltage).toBe(3.2);
        expect(recommendedBatteryVoltage("power-regulated")).toBe(3.2);
        expect(recommendedBatteryVoltage("voltage-regulated")).toBe(3.2);
        expect(recommendedBatteryVoltage("current-regulated")).toBe(3.2);
        expect(recommendedBatteryVoltage("unregulated")).toBe(4.2);
    });

    it("selects a confirmed preset mode while preserving an already supported mode", () => {
        const proVari = builtInPresets.find(({ id }) => id === "preset-101")!;
        const eye = builtInPresets.find(({ id }) => id === "preset-136")!;
        expect(preferredDeviceModeForMod(proVari, "power-regulated")).toBe("voltage-regulated");
        expect(preferredDeviceModeForMod(eye, "current-regulated")).toBe("current-regulated");
        expect(preferredDeviceModeForMod(eye, "unregulated")).toBe("power-regulated");
        expect(modDeviceModeStatus(eye, "unregulated")).toBe("unknown");
    });

    it("projects finished-device topology and board series input separately", () => {
        const hexOhm = builtInPresets.find(({ id }) => id === "preset-226");
        const dna30 = builtInPresets.find(({ id }) => id === "preset-30");
        expect(hexOhm).toBeDefined();
        expect(dna30).toBeDefined();
        expect(modBatteryOptions(hexOhm!)).toEqual([{
            id: "device:native-18650-series",
            format: "18650",
            seriesCells: 2,
            parallelStrings: 1,
            source: "device",
        }]);
        const boardOption = modBatteryOptions(dna30!)[0];
        expect(boardOption).toMatchObject({ seriesCells: 1, source: "board" });
        expect(applyModBatteryOption(
            { ...defaultState.battery, parallelStrings: 3 },
            boardOption,
        )).toMatchObject({ seriesCells: 1, parallelStrings: 3 });
    });

    it("checks a selected cell format only when both sides establish a cylindrical size", () => {
        const cell18650 = batteryPresets.find(({ id }) => id === "battery-35");
        const cell21700 = batteryPresets.find(({ id }) => id === "battery-82");
        const option = modBatteryOptions(builtInPresets.find(({ id }) => id === "preset-226")!)[0];
        expect(batteryPresetFormat(cell18650)).toBe("18650");
        expect(modBatteryCompatibility(cell18650, option)).toBe("compatible");
        expect(modBatteryCompatibility(cell21700, option)).toBe("incompatible");
        expect(modBatteryCompatibility(undefined, option)).toBe("unknown");
    });

    it("reports selected-mod limits without changing the requested operating point", () => {
        const mod = builtInPresets.find(({ id }) => id === "preset-226");
        expect(modLimitViolations({ ...defaultState.device, outputPower: 181 }, mod)).toEqual([{
            field: "power",
            actual: 181,
            limit: 180,
        }]);
        expect(modLimitViolations({
            ...defaultState.device,
            mode: "voltage-regulated",
            outputVoltage: 7,
            atomizerResistance: 0.1,
        }, mod).map(({ field }) => field)).toEqual([
            "power", "voltage", "current", "minimum-resistance",
        ]);
    });

    it("keeps current and C rating synchronized when either is edited", () => {
        const withCurrent = updateBatteryField(defaultState.battery, "maximumCurrent", 18);
        expect(withCurrent.cRating).toBeCloseTo(6);
        const withC = updateBatteryField(withCurrent, "cRating", 4);
        expect(withC.maximumCurrent).toBeCloseTo(12);
    });

    it("recalculates C rating when capacity changes without changing maximum current", () => {
        const next = updateBatteryField(defaultState.battery, "capacityMah", 4000);
        expect(next.maximumCurrent).toBe(15);
        expect(next.cRating).toBeCloseTo(3.75);
    });

    it("recalculates maximum current when capacity changes with C rating selected", () => {
        const next = updateBatteryField(defaultState.battery, "capacityMah", 4000, "c-rating");
        expect(next.maximumCurrent).toBe(20);
        expect(next.cRating).toBe(5);
    });

    it("applies a preset without changing device values", () => {
        const next = applyPreset(defaultState.battery, {
            id: "x",
            manufacturer: "Test",
            model: "Cell",
            formFactor: {
                kind: "cylindrical",
                sizeCode: "18650",
                nominalDiameterMm: 18,
                nominalLengthMm: 65,
            },
            displayName: "Test Cell",
            ratedCapacityMah: 2000,
            continuousDischargeCRating: 10,
        });
        expect(next.capacityMah).toBe(2000);
        expect(next.maximumCurrent).toBe(20);
        expect(next.presetId).toBe("x");
    });

    it("exposes structured, unit-explicit default battery properties", () => {
        const lgHb6 = batteryPresets.find((preset) => preset.displayName === "LG 18650HB6");
        expect(lgHb6).toMatchObject({
            manufacturer: "LG",
            model: "18650HB6",
            formFactor: {
                kind: "cylindrical",
                sizeCode: "18650",
                nominalDiameterMm: 18,
                nominalLengthMm: 65,
            },
            ratedCapacityMah: 1500,
            continuousDischargeCurrentAmps: 30,
        });
    });

    it("keeps safety warnings separate from catalog data notes", () => {
        const lowDrain = batteryPresets.find((preset) => preset.displayName === "Sanyo UR18650F");
        const relabeled = batteryPresets.find((preset) => preset.displayName.startsWith("UltraFire BRC"));
        expect(lowDrain?.safetyWarning).toContain("not suited for vaping");
        expect(lowDrain?.dataNote).toBeUndefined();
        expect(relabeled?.dataNote).toContain("lower than the label");
        expect(relabeled?.safetyWarning).toBeUndefined();
    });

    it("records the researched Nitecore NL188 as a protected 18650", () => {
        const nl188 = batteryPresets.find((preset) => preset.displayName === "Nitecore NL188");
        expect(nl188?.batteryAccess).toBeUndefined();
        expect(nl188).toMatchObject({
            formFactor: {
                kind: "cylindrical",
                sizeCode: "18650",
                nominalDiameterMm: 18,
                nominalLengthMm: 65,
            },
            protected: true,
        });
    });

    it("marks the iTaste presets as integrated battery packs", () => {
        expect(batteryPresets.find((preset) => preset.id === "battery-30")).toMatchObject({
            batteryAccess: "integrated",
            formFactor: null,
        });
        expect(batteryPresets.find((preset) => preset.id === "battery-31")).toMatchObject({
            batteryAccess: "integrated",
            formFactor: null,
        });
    });
});
