import { describe, expect, it } from "vitest";
import {
    dna200TemperaturePoints,
    parseTemperaturePointDraft,
    validateTemperaturePoints,
} from "./temperature-points";

describe("Wire Wizard temperature points", () => {
    it("parses a complete comma-separated draft without rewriting it", () => {
        expect(parseTemperaturePointDraft("-40, 20.5, 100")).toEqual({
            kind: "valid",
            values: [-40, 20.5, 100],
        });
    });

    it.each([
        ["", "minimum"],
        ["20", "minimum"],
        ["20,,100", "empty"],
        ["20, text, 100", "number"],
        ["-274, 20", "absolute-zero"],
        ["20, 20", "duplicate"],
        ["100, 20", "ascending"],
    ] as const)("rejects %j with the %s issue", (draft, issue) => {
        expect(parseTemperaturePointDraft(draft)).toEqual({ kind: "invalid", issue });
    });

    it("allows at most twenty points", () => {
        expect(validateTemperaturePoints(Array.from({ length: 20 }, (_, index) => index))).toMatchObject({
            kind: "valid",
        });
        expect(validateTemperaturePoints(Array.from({ length: 21 }, (_, index) => index))).toEqual({
            kind: "invalid",
            issue: "maximum",
        });
    });

    it("adds 20 degrees to DNA200 points in ascending order without duplicating it", () => {
        expect(dna200TemperaturePoints([-40, 50, 100])).toEqual([-40, 20, 50, 100]);
        expect(dna200TemperaturePoints([-40, 20, 100])).toEqual([-40, 20, 100]);
    });

});
