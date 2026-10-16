import { describe, expect, it } from "vitest";
import { messagesFor } from "./messages";
import { calculatorMessagesFor } from "./calculator-messages";
import { localeNeedsTranslationReview } from "./translation-review";

describe("French presentation", () => {
    it("localizes catalog types while preserving user-provided names", () => {
        const messages = messagesFor("fr");
        for (const [input, noun] of [
            ["Material", "matériau"], ["Materials", "matériaux"],
            ["Battery", "batterie"], ["Batteries", "batteries"], ["Mod", "mod"], ["Mods", "mods"],
        ]) {
            expect(messages.catalogEditor.properties(input)).toContain(noun);
        }
        for (const name of ["Battery", "Materials", "My custom coil"]) {
            expect(messages.catalogManager.deleted(name)).toContain(name);
        }
        expect(messages.catalogManager.customItemsDescription?.("Materials")).toContain("matériaux");
    });

    it("retains pending human review and French optional explanatory text", () => {
        expect(localeNeedsTranslationReview("fr")).toBe(true);
        expect(messagesFor("fr").ohm.joulesLawLinkLabel).toBe("la loi de Joule");
        expect(calculatorMessagesFor("fr").wirewiz.sourceFactorSuffix).toBe("à cette température.");
        expect(messagesFor("fr").catalogEditor.sizeCodePlaceholder).toContain("18650");
    });
});
