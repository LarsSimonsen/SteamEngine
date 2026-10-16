import { describe, expect, it } from "vitest";
import {
    addSelectedMaterial,
    defaultTcrSettings,
    formatTemperaturePoints,
    parseTemperaturePoints,
    removeSelectedMaterial,
    tcrMaterials,
    updateSelectedResistance,
} from "./domain";

describe("TCR domain", () => {
    it("parses and formats temperature points in either scale", () => {
        const parsed = parseTemperaturePoints("-100,0,70,200", "fahrenheit");
        expect(parsed.kind).toBe("valid");
        if (parsed.kind !== "valid") return;
        expect(formatTemperaturePoints(parsed.temperaturesCelsius, "fahrenheit")).toBe("-100,0,70,200");
        expect(formatTemperaturePoints(parsed.temperaturesCelsius, "celsius")).toBe(
            "-73.3333,-17.7778,21.1111,93.3333",
        );
    });

    it("rejects malformed and unordered temperature points", () => {
        expect(parseTemperaturePoints("20,,100", "celsius")).toMatchObject({ kind: "invalid" });
        expect(parseTemperaturePoints("20,10", "celsius")).toEqual({
            kind: "invalid",
            message: "Temperature points must be in ascending order.",
        });
    });

    it("excludes materials without temperature data", () => {
        const material = tcrMaterials.find((candidate) => candidate.id === "n20");
        expect(material).toBeUndefined();
        expect(addSelectedMaterial(defaultTcrSettings(), "n20")).toEqual(defaultTcrSettings());
    });

    it("adds, updates, and removes selected materials without mutating defaults", () => {
        const defaults = defaultTcrSettings();
        const added = addSelectedMaterial(defaults, "ni200");
        const updated = updateSelectedResistance(added, added.selectedMaterials[0].id, 0.15);
        const removed = removeSelectedMaterial(updated, updated.selectedMaterials[0].id);
        expect(defaults.selectedMaterials).toEqual([]);
        expect(updated.selectedMaterials[0].resistance).toBe(0.15);
        expect(removed.selectedMaterials).toEqual([]);
    });

});
