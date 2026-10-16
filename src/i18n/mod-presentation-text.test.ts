import { describe, expect, it } from "vitest";
import { builtInPresets } from "../catalogs/mods/presets";
import { modPresentationsFor, modTextKeys } from "./mod-presentation-text";
import { catalogPresentations, modTextTranslations } from "./catalog-presentations";
import { modTexts as englishModTexts } from "./catalog-presentations/en";

describe("mod presentation text", () => {
    it("stores the canonical mod copy as one template and eight distinct profiles", () => {
        const keys = modTextKeys();
        const values = keys.map((key) => key === "mod.profile.regulated"
            ? englishModTexts[key]("__MOD_NAME__")
            : englishModTexts[key]);

        expect(keys).toHaveLength(9);
        expect(new Set(keys).size).toBe(keys.length);
        expect(new Set(values).size).toBe(keys.length);
    });

    it("materializes all generic profiles from one localized template", () => {
        const texts = {
            ...englishModTexts,
            "mod.profile.regulated": (displayName: string) => `shared profile: ${displayName}`,
        };
        const presentations = modPresentationsFor(texts);
        const genericMods = builtInPresets.filter((mod) => mod.description === undefined);

        expect(Object.keys(presentations).sort()).toEqual(builtInPresets.map(({ id }) => id).sort());
        expect(genericMods.every((mod) =>
            presentations[mod.id].description === `shared profile: ${mod.displayName}`)).toBe(true);
        expect(presentations["preset-231"].description).toBe(englishModTexts["mod.preset-231.profile"]);
        expect(presentations["preset-231"].summary).toBe(presentations["preset-231"].description);
    });

    it("keeps every locale mod text pool complete", () => {
        const englishKeys = Object.keys(modTextTranslations.en).sort();
        for (const [locale, texts] of Object.entries(modTextTranslations)) {
            expect(Object.keys(texts).sort()).toEqual(englishKeys);
            if (locale === "en") continue;
            expect(texts["mod.profile.regulated"]("Example mod")).not.toBe(
                englishModTexts["mod.profile.regulated"]("Example mod"),
            );
        }
    });

    it("materializes Turkish and Indonesian mod maps from their shared templates", () => {
        for (const locale of ["tr", "id"] as const) {
            expect(catalogPresentations[locale].mods).toEqual(
                modPresentationsFor(modTextTranslations[locale]),
            );
            expect(catalogPresentations[locale].mods["preset-241"].description).toContain(
                "ProVape ProVari 1",
            );
        }
    });
});
