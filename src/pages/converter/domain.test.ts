import { describe, expect, it } from "vitest";
import { defaultInputValue, defaultSettings, isDiscreteUnit, unitOptions } from "./domain";

describe("converter domain", () => {
    it("keeps unit metadata and defaults available to the UI", () => {
        expect(defaultSettings.fromUnit).toBe("inch");
        expect(isDiscreteUnit("swg")).toBe(true);
        expect(defaultInputValue("swg")).toBe("7/0");
        expect(unitOptions).toHaveLength(6);
    });
});
