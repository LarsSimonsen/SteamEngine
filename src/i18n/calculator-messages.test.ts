import { describe, expect, it } from "vitest";
import {
    calculatorMessageParityIssues,
    calculatorMessagesFor,
} from "./calculator-messages";

describe("calculator messages", () => {
    it("keeps required calculator message keys in parity across all locales", () => {
        expect(calculatorMessageParityIssues()).toEqual([]);
    });

    it("allows the German temperature suffix without making required messages optional", () => {
        const germanWireMessages = calculatorMessagesFor("de").wirewiz as Record<string, string>;
        expect(germanWireMessages.sourceFactorSuffix).toBe("bei dieser Temperatur.");
        const sourceFactor = germanWireMessages.sourceFactor;
        try {
            delete germanWireMessages.sourceFactor;
            expect(calculatorMessageParityIssues()).toContain("de:wirewiz");
        } finally {
            germanWireMessages.sourceFactor = sourceFactor;
        }
    });

    it("provides distinct localized representative calculator copy", () => {
        expect(calculatorMessagesFor("en").batt.title).toBe("Battery drain");
        expect(calculatorMessagesFor("nb").batt.title).toBe("Batteriforbruk");
        expect(calculatorMessagesFor("en").wirewiz.results).toBe("Results");
        expect(calculatorMessagesFor("nb").wirewiz.results).toBe("Resultater");
        expect(calculatorMessagesFor("nn").batt.currentLabel).toBe("Straum");
    });
});
