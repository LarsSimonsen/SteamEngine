import { describe, expect, it } from "vitest";
import { batteryPresets } from "./defaults";
import {
    batteryStorageKey,
    initialBatteryState,
    parseBatteryEnvelope,
    saveBatteryState,
    type BatteryStorage,
} from "./persistence";

const memoryStorage = (): BatteryStorage & { readonly values: Record<string, string> } => {
    const values: Record<string, string> = {};
    return {
        values,
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

describe("custom battery persistence", () => {
    it("starts with only batteries that pass the published visibility gate visible", () => {
        const state = initialBatteryState(batteryPresets);
        const visible = batteryPresets.filter(
            (battery) => !state.hiddenDefaultBatteryIds.includes(battery.id),
        );
        expect(visible.map((battery) => battery.displayName)).toEqual([
            "LG 18650HG2",
            "Samsung INR18650-25R",
            "Samsung INR18650-30Q",
            "Sony US18650VTC5",
            "EVE INR21700/58E",
            "Reliance INR21700-RS50",
            "Reliance INR21700-RS60",
            "Reliance INR21700-RH60",
        ]);
    });

    it("round-trips versioned custom batteries and visibility", () => {
        const storage = memoryStorage();
        const state = {
            customBatteries: [{
                id: "057c9595-67f0-4f29-b279-21ce49fa82c5",
                manufacturer: "Test",
                model: "Cell",
                displayName: "Test Cell",
                weightGrams: 46.25,
                formFactor: {
                    kind: "cylindrical",
                    sizeCode: "18650",
                    nominalDiameterMm: 18,
                    nominalLengthMm: 65,
                },
                ratedCapacityMah: 2800,
                continuousDischargeCurrentAmps: 20,
            }],
            hiddenDefaultBatteryIds: ["battery-35"],
        } as const;
        expect(saveBatteryState(storage, state)).toBeUndefined();
        expect(parseBatteryEnvelope(storage.values[batteryStorageKey], batteryPresets)).toEqual({
            kind: "valid",
            state,
        });
    });

    it("rejects malformed envelopes without reading legacy battery data", () => {
        expect(parseBatteryEnvelope('{"version":2}', batteryPresets)).toMatchObject({ kind: "invalid" });
        expect(parseBatteryEnvelope("{broken", batteryPresets)).toEqual({
            kind: "invalid",
            message: "Saved battery data is not valid JSON.",
        });
    });

    it("migrates version-one custom batteries with a legacy size", () => {
        const result = parseBatteryEnvelope(JSON.stringify({
            version: 1,
            customBatteries: [{
                id: "legacy-battery",
                manufacturer: "Legacy",
                model: "Cell",
                displayName: "Legacy Cell",
                size: "18650",
                ratedCapacityMah: 3000,
                continuousDischargeCurrentAmps: 20,
            }],
            hiddenDefaultBatteryIds: [],
        }), batteryPresets);
        expect(result).toMatchObject({
            kind: "valid",
            state: { customBatteries: [{ formFactor: { sizeCode: "18650" } }] },
        });
    });

    it("round-trips an integrated battery without a cell form factor", () => {
        const storage = memoryStorage();
        const state = {
            customBatteries: [{
                id: "4d1b0b9f-08dc-4f25-a052-a3d9db6e8ef9",
                manufacturer: "Test",
                model: "Integrated pack",
                displayName: "Test Integrated pack",
                batteryAccess: "integrated",
                formFactor: null,
                ratedCapacityMah: 800,
                continuousDischargeCRating: 4,
            }],
            hiddenDefaultBatteryIds: [],
        } as const;
        expect(saveBatteryState(storage, state)).toBeUndefined();
        expect(parseBatteryEnvelope(storage.values[batteryStorageKey], batteryPresets)).toEqual({
            kind: "valid",
            state,
        });
    });
});
