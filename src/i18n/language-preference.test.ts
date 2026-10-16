import { describe, expect, it } from "vitest";
import {
    languagePreferenceStorageKey,
    localeForBrowserLanguages,
    localeForLanguageTag,
    orderedLocaleDefinitions,
    readSavedLocale,
    saveLocalePreference,
    type LanguagePreferenceStorage,
} from "./language-preference";

const testStorage = (): LanguagePreferenceStorage & { value: string | null } => ({
    value: null,
    getItem: () => testStorageInstance.value,
    setItem: (_key, value) => { testStorageInstance.value = value; },
});

let testStorageInstance: LanguagePreferenceStorage & { value: string | null } = {
    value: null,
    getItem: () => null,
    setItem: () => undefined,
};

describe("language preference", () => {
    it("matches exact and regional browser language tags", () => {
        expect(localeForLanguageTag("pt-BR")).toBe("pt-BR");
        expect(localeForLanguageTag("fr-CA")).toBe("fr");
        expect(localeForLanguageTag("no-NO")).toBe("nb");
        expect(localeForLanguageTag("zh-CN")).toBe("zh-Hans");
        expect(localeForLanguageTag("xx-ZZ")).toBeUndefined();
    });

    it("uses the browser's first supported language", () => {
        expect(localeForBrowserLanguages(["xx-ZZ", "de-DE", "fr-FR"])).toBe("de");
        expect(localeForBrowserLanguages([])).toBeUndefined();
    });

    it("puts saved preference first, then English, then the remaining languages alphabetically", () => {
        const order = orderedLocaleDefinitions("en", "fr", ["de-DE"]);

        expect(order.slice(0, 2).map(({ code }) => code)).toEqual(["fr", "en"]);
        expect(order.slice(2, 6).map(({ englishAlias }) => englishAlias)).toEqual([
            "Arabic", "Bengali", "Brazilian Portuguese", "Danish",
        ]);
    });

    it("puts a non-English active page before the browser preference", () => {
        const order = orderedLocaleDefinitions("nb", undefined, ["en-US"]);

        expect(order.slice(0, 2).map(({ code }) => code)).toEqual(["nb", "en"]);
    });

    it("round-trips a versioned saved preference", () => {
        testStorageInstance = testStorage();

        expect(readSavedLocale(testStorageInstance)).toBeUndefined();
        saveLocalePreference("pt-BR", testStorageInstance);
        expect(testStorageInstance.value).toBe(
            JSON.stringify({ version: 1, locale: "pt-BR" }),
        );
        expect(readSavedLocale(testStorageInstance)).toBe("pt-BR");
        expect(testStorageInstance.getItem(languagePreferenceStorageKey)).toBe(testStorageInstance.value);
    });
});
