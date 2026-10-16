import { describe, expect, it } from "vitest";
import {
    parallelResistance,
    powerFromCurrentAndResistance,
    voltageFromPowerAndResistance,
} from "./electrical";
import { celsiusToFahrenheit, fahrenheitToCelsius } from "./temperature";
import { resistanceForLength, roundCrossSectionArea } from "./wire-physics";
import { awgToInches, awgToMm, inchesToAwg, mmToAwg } from "./wire-units";

describe("shared domain helpers", () => {
    it("validates and calculates parallel resistance", () => {
        expect(parallelResistance([2, 2])).toEqual({ kind: "valid", resistance: 1 });
        expect(parallelResistance([0, 2])).toEqual({ kind: "valid", resistance: 0 });
        expect(parallelResistance([])).toMatchObject({ kind: "invalid" });
        expect(parallelResistance([-1, 2])).toMatchObject({ kind: "invalid" });
        expect(parallelResistance([Number.NaN])).toMatchObject({ kind: "invalid" });
    });

    it("provides common Ohm's-law equations", () => {
        expect(voltageFromPowerAndResistance(8, 2)).toBe(4);
        expect(powerFromCurrentAndResistance(2, 2)).toBe(8);
    });

    it("uses one reversible AWG conversion in both unit systems", () => {
        expect(inchesToAwg(awgToInches(20.5))).toBeCloseTo(20.5);
        expect(mmToAwg(awgToMm(30))).toBeCloseTo(30);
    });

    it("calculates wire geometry and resistance using millimetres", () => {
        const area = roundCrossSectionArea(1);
        expect(area).toBeCloseTo(Math.PI / 4);
        expect(resistanceForLength(1.45, 1000, area)).toBeCloseTo(1.45 / area);
    });

    it("converts temperature in both directions", () => {
        expect(fahrenheitToCelsius(celsiusToFahrenheit(123))).toBeCloseTo(123);
    });
});
