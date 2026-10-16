import { describe, expect, it } from "vitest";
import { builtInPresets } from "./presets";
import { validateCustomMod } from "./validation";

const validMod = {
    id: "136dfacd-d2f1-48b2-aaf1-c501fe921951",
    manufacturer: "Test",
    model: "Mod",
    maximumOutputVoltageVolts: 8,
    maximumOutputPowerWatts: 100,
    maximumOutputCurrentAmps: 30,
};

const operatingFeatures = {
    outputModes: {
        voltage: "supported",
        power: "unsupported",
        current: "unknown",
    },
    capabilities: {
        temperatureControl: "unsupported",
        bypass: "unsupported",
        powerCurve: "unknown",
        temperatureCurve: "unknown",
        configurableTcr: "unsupported",
        preheat: "supported",
        replay: "unsupported",
        smartMode: "unsupported",
    },
} as const;

describe("custom mod validation", () => {
    it("normalizes identity fields and derives the display name", () => {
        expect(validateCustomMod({
            ...validMod,
            manufacturer: " Test ",
            model: " Mod ",
            variant: " V2 ",
            weightGrams: 82.5,
            minimumAtomizerResistanceOhms: 0.1,
        }, builtInPresets)).toEqual({
            kind: "valid",
            mod: {
                ...validMod,
                displayName: "Test Mod (V2)",
                variant: "V2",
                weightGrams: 82.5,
                minimumAtomizerResistanceOhms: 0.1,
            },
        });
    });

    it("requires positive output limits and an ordered resistance range", () => {
        expect(validateCustomMod({ ...validMod, maximumOutputPowerWatts: 0 }, builtInPresets))
            .toMatchObject({ kind: "invalid" });
        expect(validateCustomMod({
            ...validMod,
            minimumAtomizerResistanceOhms: 1,
            maximumAtomizerResistanceOhms: 0.5,
        }, builtInPresets)).toMatchObject({ kind: "invalid" });
    });

    it("accepts positive finite weight and rejects non-positive or non-finite values", () => {
        expect(validateCustomMod({ ...validMod, weightGrams: 82.5 }, builtInPresets))
            .toMatchObject({ kind: "valid", mod: { weightGrams: 82.5 } });
        expect(validateCustomMod({ ...validMod, weightGrams: 0 }, builtInPresets))
            .toMatchObject({ kind: "invalid" });
        expect(validateCustomMod({ ...validMod, weightGrams: Number.POSITIVE_INFINITY }, builtInPresets))
            .toMatchObject({ kind: "invalid" });
    });

    it("preserves a complete tri-state operating feature record", () => {
        expect(validateCustomMod({ ...validMod, operatingFeatures }, builtInPresets))
            .toMatchObject({ kind: "valid", mod: { operatingFeatures } });
    });

    it("rejects incomplete or unsupported operating feature values", () => {
        expect(validateCustomMod({
            ...validMod,
            operatingFeatures: {
                ...operatingFeatures,
                outputModes: { voltage: "supported", power: "unsupported" },
            },
        }, builtInPresets)).toMatchObject({ kind: "invalid" });
        expect(validateCustomMod({
            ...validMod,
            operatingFeatures: {
                ...operatingFeatures,
                capabilities: { ...operatingFeatures.capabilities, replay: "maybe" },
            },
        }, builtInPresets)).toMatchObject({ kind: "invalid" });
    });
});
