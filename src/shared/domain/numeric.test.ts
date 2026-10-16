import { describe, expect, it } from "vitest";
import { formatDisplayNumber, parseNumericInput } from "./numeric";

describe("numeric locale helpers", () => {
    it("accepts decimal commas without requiring grouping separators", () => {
        expect(parseNumericInput("12,5")).toBe(12.5);
        expect(parseNumericInput("12500")).toBe(12500);
    });

    it("rejects grouping and malformed numeric input", () => {
        expect(parseNumericInput("12 500")).toBeUndefined();
        expect(parseNumericInput("12,500.5")).toBeUndefined();
        expect(parseNumericInput("abc")).toBeUndefined();
    });

    it("formats display values with locale decimals but no grouping", () => {
        expect(formatDisplayNumber(12.5, 2, "en")).toBe("12.5");
        expect(formatDisplayNumber(12.5, 2, "nb")).toBe("12,5");
        expect(formatDisplayNumber(12500, 0, "nb")).toBe("12500");
    });
});
