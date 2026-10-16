import { describe, expect, it } from "vitest";
import { messagesFor } from "./messages";
import { localeNeedsTranslationReview } from "./translation-review";

const messages = messagesFor("pl");

describe("Polish shared presentation", () => {
    it("declines controlled catalog types for each grammatical context", () => {
        for (const [noun, plural, genitive, pluralGenitive, instrumental] of [
            ["material", "Materials", "materiału", "materiałów", "materiałami"],
            ["battery", "Batteries", "akumulatora", "akumulatorów", "akumulatorami"],
            ["mod", "Mods", "moda", "modów", "modami"],
        ]) {
            expect(messages.catalogManager.manage(plural)).toBe(`Zarządzaj ${instrumental}`);
            expect(messages.catalogManager.shared(noun)).toBe(`wspólny katalog ${pluralGenitive}`);
            expect(messages.catalogManager.noneYet(plural)).toBe(`Nie ma jeszcze własnych ${pluralGenitive}.`);
            expect(messages.catalogEditor.properties(noun)).toBe(`Właściwości ${genitive}`);
        }
        expect(messages.catalogManager.builtIn("Batteries")).toBe("Wbudowane akumulatory");
        expect(messages.catalogManager.customItemsDescription?.("Materials"))
            .toBe("Własne materiały są zawsze widoczne na listach wyboru kalkulatorów.");
        expect(messages.catalogEditor.save("Battery")).toBe("Zapisz akumulator");
        expect(messages.catalogEditor.saved("material")).toBe("Zapisano materiał.");
    });

    it("preserves arbitrary user names, even names identical to a controlled type", () => {
        for (const name of ["Battery", "battery", "Materials", "Moja grzałka 20 Ω", "Mod ${1}"]) {
            expect(messages.catalogManager.deleted(name)).toBe(`Usunięto wpis „${name}”.`);
            expect(messages.catalogManager.usedBy(name, "Battery, Moja grzałka"))
                .toBe(`Nie można usunąć wpisu „${name}”; korzystają z niego: Battery, Moja grzałka.`);
            expect(messages.catalogEditor.clone(name)).toBe(`Klonuj ${name}`);
        }
        expect(messages.catalogEditor.save("My battery special")).toBe("Zapisz My battery special");
    });

    it("labels raw discharge values with their ampere unit", () => {
        expect(messages.encyclopediaDetail.continuousDischargeCurrent(12.5))
            .toBe("W katalogu podano znamionowy ciągły prąd rozładowania 12.5 A.");
        expect(messages.encyclopediaDetail.continuousDischargeC(20)).toContain("20 C");
        expect(messages.catalogEditor.density).toContain("g/cm³");
    });

    it("avoids incorrect inflection for singular, plural and teen entry counts", () => {
        for (const count of [0, 1, 2, 4, 5, 12, 22, 101]) {
            expect(messages.encyclopedia.entriesLabel(count)).toBe(`Liczba wpisów: ${count}`);
            expect(messages.encyclopedia.browseCategory("Baterie", count))
                .toBe(`Przeglądaj: Baterie (liczba wpisów: ${count})`);
        }
    });

    it("assembles linked Ohm text and lock summaries without requiring noun mutation", () => {
        const intro = [messages.ohm.descriptionBeforeOhm, messages.ohm.title,
            messages.ohm.descriptionBetweenLaws, messages.ohm.joulesLawLinkLabel,
            messages.ohm.descriptionAfterLaws].join(" ");
        expect(intro).toBe("W tym prostym kalkulatorze Prawo Ohma i prawo Joule’a służą do obliczania wartości.");
        expect(messages.ohm.lockSummary("napięcie i prąd", "Moc"))
            .toBe("Zmiana wartości „napięcie i prąd” pozostawia wartość „Moc” bez zmian.");
        expect(messages.ohm.adjusting("Napięcie")).toBe("Podczas zmiany wartości „Napięcie”");
    });

    it("separates each normalization notice from the saved confirmation", () => {
        for (const suffix of [messages.catalogEditor.normalizationInterpolated,
            messages.catalogEditor.normalizationExtrapolated, messages.catalogEditor.normalizationExisting]) {
            const confirmation = messages.catalogEditor.saved("material") + suffix;
            expect(confirmation).toMatch(/^Zapisano materiał\. [A-Z]/);
            expect(confirmation).toContain("20 °C");
        }
    });

    it("retains the machine draft notice", () => {
        expect(localeNeedsTranslationReview("pl")).toBe(true);
        expect(messages.footer.translationDraft).toContain("oczekuje na weryfikację przez człowieka");
    });
});
