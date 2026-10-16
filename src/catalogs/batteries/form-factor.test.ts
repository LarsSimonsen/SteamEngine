import { describe, expect, it } from "vitest";
import { formFactorFromLegacySize, formatBatteryFormFactor } from "./form-factor";

describe("battery form factors", () => {
    it("converts a cylindrical legacy code into named nominal dimensions", () => {
        expect(formFactorFromLegacySize("18650")).toEqual({
            kind: "cylindrical",
            sizeCode: "18650",
            nominalDiameterMm: 18,
            nominalLengthMm: 65,
        });
    });

    it("does not infer a form factor from arbitrary free text", () => {
        expect(formFactorFromLegacySize("18650 protected")).toBeUndefined();
    });

    it("formats cylindrical and prismatic dimensions for reference pages", () => {
        expect(formatBatteryFormFactor({
            kind: "cylindrical",
            sizeCode: "18650",
            nominalDiameterMm: 18,
            nominalLengthMm: 65,
            terminalStyle: "button-top",
        })).toBe("Cylindrical (18650): 18 × 65 mm, button-top");
        expect(formatBatteryFormFactor({
            kind: "prismatic",
            lengthMm: 70,
            widthMm: 30,
            thicknessMm: 10,
        })).toBe("Prismatic: 70 × 30 × 10 mm");
    });
});
