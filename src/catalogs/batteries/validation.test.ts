import { describe, expect, it } from "vitest";
import { batteryPresets } from "./defaults";
import { validateCustomBattery } from "./validation";

describe("default battery catalog", () => {
    it("uses a unique display name for every battery", () => {
        const names = batteryPresets.map((battery) => battery.displayName.toLocaleLowerCase());
        expect(new Set(names).size).toBe(names.length);
    });
});

const validBattery = {
    id: "f7748974-bbca-4f6d-aebb-86b246ca8748",
    manufacturer: "Test",
    model: "Cell",
    formFactor: {
        kind: "cylindrical" as const,
        sizeCode: "18650",
        nominalDiameterMm: 18,
        nominalLengthMm: 65,
    },
    ratedCapacityMah: 3000,
    continuousDischargeCurrentAmps: 20,
};

describe("custom battery validation", () => {
    it("normalizes names and derives the display name", () => {
        expect(validateCustomBattery({
            ...validBattery,
            manufacturer: " Test ",
            model: " Cell ",
            weightGrams: 46.25,
            safetyWarning: " Use carefully ",
        }, batteryPresets)).toEqual({
            kind: "valid",
            battery: {
                ...validBattery,
                displayName: "Test Cell",
                weightGrams: 46.25,
                safetyWarning: "Use carefully",
            },
        });
    });

    it("requires capacity and at least one continuous discharge limit", () => {
        expect(validateCustomBattery({
            ...validBattery,
            continuousDischargeCurrentAmps: undefined,
        }, batteryPresets)).toMatchObject({ kind: "invalid" });
        expect(validateCustomBattery({
            ...validBattery,
            ratedCapacityMah: 0,
        }, batteryPresets)).toMatchObject({ kind: "invalid" });
    });

    it("accepts positive finite weight and rejects non-positive or non-finite values", () => {
        expect(validateCustomBattery({ ...validBattery, weightGrams: 46.25 }, batteryPresets))
            .toMatchObject({ kind: "valid", battery: { weightGrams: 46.25 } });
        expect(validateCustomBattery({ ...validBattery, weightGrams: 0 }, batteryPresets))
            .toMatchObject({ kind: "invalid" });
        expect(validateCustomBattery({ ...validBattery, weightGrams: Number.NaN }, batteryPresets))
            .toMatchObject({ kind: "invalid" });
    });

    it("accepts prismatic dimensions and separates protection and appearance", () => {
        const result = validateCustomBattery({
            ...validBattery,
            formFactor: { kind: "prismatic", lengthMm: 70, widthMm: 30, thicknessMm: 10 },
            protected: true,
            appearance: {
                wrapperColor: "blue",
                markings: [{ location: "wrapper", text: "EXAMPLE", method: "printed" }],
            },
        }, batteryPresets);
        expect(result).toMatchObject({
            kind: "valid",
            battery: {
                formFactor: { kind: "prismatic", lengthMm: 70, widthMm: 30, thicknessMm: 10 },
                protected: true,
                appearance: { wrapperColor: "blue" },
            },
        });
    });

    it("migrates a legacy cylindrical size when loading old saved data", () => {
        const result = validateCustomBattery({
            id: "legacy-battery",
            manufacturer: "Legacy",
            model: "Cell",
            size: "18650",
            ratedCapacityMah: 3000,
            continuousDischargeCurrentAmps: 20,
        }, batteryPresets, { allowUnknownFormFactor: true });
        expect(result).toMatchObject({
            kind: "valid",
            battery: { formFactor: { kind: "cylindrical", sizeCode: "18650" } },
        });
    });

    it("allows an integrated battery without recoverable cell dimensions", () => {
        const result = validateCustomBattery({
            ...validBattery,
            batteryAccess: "integrated",
            formFactor: null,
        }, batteryPresets);
        expect(result).toMatchObject({
            kind: "valid",
            battery: { batteryAccess: "integrated", formFactor: null },
        });
    });

    it("rejects a standalone form factor on an integrated battery", () => {
        expect(validateCustomBattery({
            ...validBattery,
            batteryAccess: "integrated",
        }, batteryPresets)).toMatchObject({ kind: "invalid" });
    });
});
