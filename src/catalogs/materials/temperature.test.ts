import { describe, expect, it } from "vitest";
import type { CustomMaterial } from "./catalog";
import {
    normalizeTfr,
    resistanceFactorAtTemperature,
} from "./temperature";

describe("TFR normalization", () => {
    it("normalizes an existing 20 °C reference", () => {
        expect(normalizeTfr([[20, 2], [100, 3]])).toEqual({
            kind: "valid",
            method: "existing",
            points: [[20, 1], [100, 1.5]],
        });
    });

    it("inserts an interpolated 20 °C point", () => {
        expect(normalizeTfr([[0, 1], [40, 2]])).toEqual({
            kind: "valid",
            method: "interpolated",
            points: [[0, 2 / 3], [20, 1], [40, 4 / 3]],
        });
    });

    it("reports extrapolation and rejects duplicate temperatures", () => {
        expect(normalizeTfr([[100, 2], [200, 3]])).toMatchObject({
            kind: "valid",
            method: "extrapolated",
        });
        expect(normalizeTfr([[20, 1], [20, 2]])).toEqual({
            kind: "invalid",
            message: "TFR temperatures must be unique.",
        });
    });

    it("reports unavailable data and identifies evaluated extrapolation", () => {
        const withoutTemperatureData: CustomMaterial = {
            id: "custom-without-temperature-data",
            name: "No temperature data",
            resistivity: 1,
            heatCapacity: null,
            density: null,
        };
        const withTemperatureData: CustomMaterial = {
            ...withoutTemperatureData,
            id: "custom-with-temperature-data",
            tfr: [[20, 1], [100, 1.1]],
        };
        expect(resistanceFactorAtTemperature(withoutTemperatureData, 20)).toEqual({ kind: "unavailable" });
        expect(resistanceFactorAtTemperature(withTemperatureData, 60)).toMatchObject({
            kind: "available",
            extrapolated: false,
        });
        expect(resistanceFactorAtTemperature(withTemperatureData, 200)).toMatchObject({
            kind: "available",
            extrapolated: true,
        });
    });
});
