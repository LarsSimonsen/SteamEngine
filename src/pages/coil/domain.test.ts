import { describe, expect, it } from "vitest";
import {
    awgToMm,
    defaultSettings,
    fromLegacyQuery,
    mmToAwg,
    setupResistanceFactor,
    toLegacyQuery,
} from "./domain";

describe("Coil Wrapping domain", () => {
    it("round-trips standard AWG values", () => {
        expect(awgToMm(30)).toBeCloseTo(0.254639, 5);
        expect(mmToAwg(awgToMm(30))).toBeCloseTo(30, 8);
    });

    it("uses the expected resistance factors for parallel and series setups", () => {
        expect(setupResistanceFactor("parallel-4")).toBe(0.25);
        expect(setupResistanceFactor("series-3")).toBe(3);
        expect(setupResistanceFactor("series-parallel-4")).toBe(1);
    });

    it("imports and exports the legacy query-string shape", () => {
        const imported = fromLegacyQuery({ p: "roundmulti", tp: "2", str: "3", s: "dp", r: "1.2" });
        const query = toLegacyQuery(imported);
        expect(query).toContain("p=roundmulti");
        expect(query).toContain("tp=2");
        expect(query).toContain("str=3");
        expect(query).toContain("s=dp");
        expect(query).toContain("r=1.2");
    });


    it("retires legacy direct custom resistance query values", () => {
        const imported = fromLegacyQuery({ mat: "custom", rstv: "0.123" });

        expect(imported.materialId).toBe(defaultSettings.materialId);
        expect(imported.resistancePerLength).toBe(defaultSettings.resistancePerLength);
        expect(toLegacyQuery(imported)).not.toContain("rstv=");
    });

    it("migrates the retired linear Ni200 URL ID", () => {
        expect(fromLegacyQuery({ mat: "ni200lin" }).materialId).toBe("ni200");
        expect(toLegacyQuery({ ...defaultSettings, materialId: "ni200lin" })).toContain("mat=ni200");
    });

});
