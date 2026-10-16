import { describe, expect, it } from "vitest";
import { fromLegacyExport, legacyRound } from "./domain";

describe("liquid mixing domain", () => {
    it("preserves the legacy display rounding", () => {
        expect(legacyRound(1.234)).toBe("1.23");
        expect(legacyRound(Number.NaN)).toBe("0.00");
        expect(legacyRound(1.6, 0)).toBe("2");
    });

    it("migrates the legacy ej2 shape while dropping calculated volume fields", () => {
        const settings = fromLegacyExport({
            batchSize: 25,
            mixByWeight: true,
            baseStrength: 10,
            basePg: 50,
            targetStrength: 3,
            targetPg: 60,
            flavors: [{ nm: "Custard", perc: 4, vg: true, vol: 99 }],
        });

        expect(settings).toEqual({
            batchSize: 25,
            mixByWeight: false,
            baseStrength: 10,
            basePg: 50,
            targetStrength: 3,
            targetPg: 60,
            flavors: [{ nm: "Custard", perc: 4, vg: true }],
        });
    });
});
