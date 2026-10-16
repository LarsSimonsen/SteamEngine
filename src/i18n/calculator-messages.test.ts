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

    it("accepts extra plural forms only where the locale has that plural category", () => {
        expect(calculatorMessagesFor("pl").batt.cellsFew).toBe("ogniwa");
        const withExtraKey = (locale: "da" | "pl", key: string, check: (issues: readonly string[]) => void) => {
            const routeMessages = calculatorMessagesFor(locale).batt as Record<string, string>;
            try {
                routeMessages[key] = "test";
                check(calculatorMessageParityIssues());
            } finally {
                delete routeMessages[key];
            }
        };
        withExtraKey("pl", "cellsMany", (issues) => expect(issues).not.toContain("pl:batt"));
        withExtraKey("pl", "cellsTwo", (issues) => expect(issues).toContain("pl:batt"));
        withExtraKey("pl", "cellFewer", (issues) => expect(issues).toContain("pl:batt"));
        withExtraKey("pl", "missingKeyFew", (issues) => expect(issues).toContain("pl:batt"));
        withExtraKey("da", "cellsFew", (issues) => expect(issues).toContain("da:batt"));
    });

    it("keeps English keys that resemble plural forms required", () => {
        // Arabic has a "two" category, so tcr's `about` and `aboutTwo` could be mistaken for a plural pair.
        expect(calculatorMessagesFor("ar").tcr.aboutTwo).toBeDefined();
        expect(calculatorMessageParityIssues()).not.toContain("ar:tcr");
    });

    it("provides distinct localized representative calculator copy", () => {
        expect(calculatorMessagesFor("en").batt.title).toBe("Battery drain");
        expect(calculatorMessagesFor("nb").batt.title).toBe("Batteriforbruk");
        expect(calculatorMessagesFor("en").wirewiz.results).toBe("Results");
        expect(calculatorMessagesFor("nb").wirewiz.results).toBe("Resultater");
        expect(calculatorMessagesFor("nn").batt.currentLabel).toBe("Straum");
    });
});
