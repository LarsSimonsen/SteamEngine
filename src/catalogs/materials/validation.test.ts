import { describe, expect, it } from "vitest";
import { materials } from "./catalog";
import { validateCustomMaterial } from "./validation";

const base = {
    id: "12f55cf4-eea9-42ac-aa76-418f2d6fd5bb",
    name: "Example",
    resistivity: 0.8,
    heatCapacity: null,
    density: null,
};

describe("custom material validation", () => {
    it("accepts a resistance-only material", () => {
        expect(validateCustomMaterial(base, materials)).toEqual({ kind: "valid", material: base });
    });

    it("normalizes TFR and rejects conflicting temperature models", () => {
        expect(validateCustomMaterial({ ...base, tfr: [[0, 1], [40, 2]] }, materials)).toMatchObject({
            kind: "valid",
            normalizationMethod: "interpolated",
            material: { tfr: [[0, 2 / 3], [20, 1], [40, 4 / 3]] },
        });
        expect(validateCustomMaterial({ ...base, tcr: 0.004, tfr: [[20, 1], [100, 2]] }, materials)).toEqual({
            kind: "invalid",
            message: "Choose either TCR or TFR, not both.",
        });
    });

    it("reserves retired IDs and canonicalizes legacy clone provenance", () => {
        expect(validateCustomMaterial({ ...base, id: "ni200lin" }, materials)).toMatchObject({ kind: "invalid" });
        expect(validateCustomMaterial({ ...base, clonedFrom: "ni200lin" }, materials)).toMatchObject({
            kind: "valid",
            material: { clonedFrom: "ni200" },
        });
    });
});
