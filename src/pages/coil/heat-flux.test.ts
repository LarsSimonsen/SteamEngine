import { describe, expect, it } from "vitest";
import { heatFluxColor } from "./heat-flux";

describe("heat flux color", () => {
    it("uses the warm-to-cool anchor colors", () => {
        expect(heatFluxColor(10)).toBe("rgb(255, 0, 0)");
        expect(heatFluxColor(200)).toBe("rgb(255, 140, 0)");
        expect(heatFluxColor(350)).toBe("rgb(255, 255, 0)");
        expect(heatFluxColor(425)).toBe("rgb(242, 247, 255)");
        expect(heatFluxColor(500)).toBe("rgb(173, 216, 230)");
    });

    it("clamps values outside the supported heat-flux range", () => {
        expect(heatFluxColor(0)).toBe(heatFluxColor(10));
        expect(heatFluxColor(1000)).toBe(heatFluxColor(500));
    });
});
