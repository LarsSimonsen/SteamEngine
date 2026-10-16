import { describe, expect, it } from "vitest";
import { materials } from "../catalogs/materials/catalog";
import { catalogPresentations, materialTextTranslations } from "./catalog-presentations";
import { materialPresentationsFor, materialTextKeys } from "./material-presentation-text";

describe("material presentation text", () => {
    it("defines one profile template and one shared safety message", () => {
        expect(materialTextKeys()).toEqual([
            "material.profile",
            "material.safety.verifiedProfile",
        ]);
        expect(Object.keys(materialTextTranslations.en)).toEqual(materialTextKeys());
    });

    it("renders every material from the shared locale text", () => {
        for (const [locale, texts] of Object.entries(materialTextTranslations)) {
            const presentations = materialPresentationsFor(texts);
            expect(Object.keys(presentations), locale).toHaveLength(materials.length);
            expect(Object.keys(texts), locale).toEqual(materialTextKeys());
            for (const presentation of Object.values(presentations)) {
                expect(presentation.description, locale).toBe(presentation.summary);
                expect(presentation.safetyText, locale).toBe(texts["material.safety.verifiedProfile"]);
            }
            expect(texts["material.profile"]("__MATERIAL__"), locale).toContain("__MATERIAL__");
        }
    });

    it("preserves the locale-owned Norwegian material names", () => {
        for (const locale of ["nb", "nn"] as const) {
            expect(catalogPresentations[locale].materials.ti1.displayName).toBe("Titan 1");
            expect(catalogPresentations[locale].materials.w.displayName).toBe("Wolfram");
            expect(catalogPresentations[locale].materials.ni200.displayName)
                .toBe("Nikkel 200 / Ni200 (UNS N02200)");
        }
    });
});
