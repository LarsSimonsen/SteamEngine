import { describe, expect, it } from "vitest";
import { heatFluxColor } from "./heat-flux";

describe("heat flux color", () => {
    it("uses the legacy blue-to-red steps by default", () => {
        expect(heatFluxColor(100)).toBe("#00C0E3");
        expect(heatFluxColor(215)).toBe("#C9CC00");
        expect(heatFluxColor(330)).toBe("#BF0024");
        expect(heatFluxColor(200, "legacy")).toBe(heatFluxColor(200));
    });

    it("clamps legacy values outside 100-330 mW/mm²", () => {
        expect(heatFluxColor(10)).toBe(heatFluxColor(100));
        expect(heatFluxColor(500)).toBe(heatFluxColor(330));
        expect(heatFluxColor(Number.NaN)).toBe(heatFluxColor(100));
    });

    it("uses the warm-to-cool black body anchor colors", () => {
        expect(heatFluxColor(10, "blackBody")).toBe("rgb(255, 0, 0)");
        expect(heatFluxColor(200, "blackBody")).toBe("rgb(255, 140, 0)");
        expect(heatFluxColor(350, "blackBody")).toBe("rgb(255, 255, 0)");
        expect(heatFluxColor(425, "blackBody")).toBe("rgb(242, 247, 255)");
        expect(heatFluxColor(500, "blackBody")).toBe("rgb(173, 216, 230)");
    });

    it("clamps black body values outside the supported heat-flux range", () => {
        expect(heatFluxColor(0, "blackBody")).toBe(heatFluxColor(10, "blackBody"));
        expect(heatFluxColor(1000, "blackBody")).toBe(heatFluxColor(500, "blackBody"));
    });
});
