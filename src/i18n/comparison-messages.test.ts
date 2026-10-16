import { describe, expect, it } from "vitest";
import { comparisonMessageParityIssues } from "./comparison-messages";

describe("comparison messages", () => {
    it("keeps every locale aligned with English", () => {
        expect(comparisonMessageParityIssues()).toEqual([]);
    });
});
