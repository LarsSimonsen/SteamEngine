import { describe, expect, it } from "vitest";
import { batteryPresets } from "../catalogs/batteries/defaults";
import { concepts } from "../catalogs/concepts/catalog";
import { builtInPresets } from "../catalogs/mods/presets";
import { materials } from "../catalogs/materials/catalog";
import {
    assertCatalogPresentationCoverage,
    catalogPresentationFor,
    catalogPresentations,
    missingCatalogPresentationKeys,
} from "./catalog-presentations";

describe("catalog presentations", () => {
    it("covers every built-in entry in English and Bokmål", () => {
        assertCatalogPresentationCoverage();
        expect(missingCatalogPresentationKeys()).toEqual([]);

        for (const locale of ["en", "nb", "nn"] as const) {
            expect(Object.keys(catalogPresentations[locale].concepts)).toHaveLength(concepts.length);
            expect(Object.keys(catalogPresentations[locale].materials)).toHaveLength(materials.length);
            expect(Object.keys(catalogPresentations[locale].batteries)).toHaveLength(batteryPresets.length);
            expect(Object.keys(catalogPresentations[locale].mods)).toHaveLength(builtInPresets.length);
        }

        for (const concept of concepts) {
            const presentation = catalogPresentationFor("nb", "concepts", concept.id);
            expect(presentation.sections?.map(({ id }) => id)).toEqual(concept.sections.map(({ id }) => id));
        }
    });

    it("localizes representative entries without changing catalog identity", () => {
        const ohmsLaw = catalogPresentationFor("nb", "concepts", "concept-ohms-law");
        expect(ohmsLaw.displayName).toBe("Ohms lov");
        expect(ohmsLaw.wikipediaUrl).toBe("https://nb.wikipedia.org/wiki/Ohms_lov");
        expect(ohmsLaw.sections?.[0].title).toBe("Sammenhengen");
        expect(ohmsLaw.sections?.[2].examples?.[0].title).toBe("Finn strømmen");
        expect(catalogPresentationFor("nb", "concepts", "concept-kirchhoffs-laws").sections?.[0].title).toBe(
            "Termer i elektriske kretser",
        );
        expect(catalogPresentationFor("nb", "concepts", "concept-wire-gauges-awg-swg-bwg").sections?.[0].title).toBe(
            "Dimensjonssystemer",
        );
        expect(catalogPresentationFor("nb", "concepts", "concept-heat-flux").wikipediaUrl).toBe(
            "https://nb.wikipedia.org/wiki/Varmefluks",
        );
        expect(catalogPresentationFor("nb", "concepts", "concept-temperature-coefficient-of-resistance").wikipediaUrl)
            .toBe("https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance");
        expect(catalogPresentationFor("nb", "materials", "ti1").displayName).toBe("Titan 1");
        expect(catalogPresentationFor("en", "materials", "ti1").displayName).toBe("Titanium 1");
        expect(catalogPresentationFor("nn", "materials", "ti1").displayName).toBe("Titan 1");

        const battery = batteryPresets[0];
        const mod = builtInPresets[0];
        expect(catalogPresentationFor("nb", "batteries", battery.id).displayName).toBe(battery.displayName);
        expect(catalogPresentationFor("nb", "mods", mod.id).displayName).toBe(mod.displayName);
        expect(catalogPresentationFor("nb", "batteries", battery.id).summary).not.toBe(
            catalogPresentationFor("en", "batteries", battery.id).summary,
        );
    });

    it("keeps stable IDs and slugs in the canonical catalogs", () => {
        for (const item of [...concepts, ...materials, ...batteryPresets, ...builtInPresets]) {
            expect(item.id).toMatch(/^[a-z0-9-]+$/);
            expect(item.slug).toMatch(/^[a-z0-9-]+$/);
        }
    });

    it("uses verified Bokmål Wikipedia sitelinks and source fallbacks", () => {
        const expectedUrls: Readonly<Record<string, string>> = {
            "concept-ohms-law": "https://nb.wikipedia.org/wiki/Ohms_lov",
            "concept-joule-heating": "https://nb.wikipedia.org/wiki/Jouleoppvarming",
            "concept-kirchhoffs-laws": "https://nb.wikipedia.org/wiki/Kirchhoffs_lover",
            "concept-temperature-coefficient-of-resistance":
                "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance",
            "concept-trigonometry": "https://nb.wikipedia.org/wiki/Trigonometri",
            "concept-heat-capacity": "https://nb.wikipedia.org/wiki/Varmekapasitet",
            "concept-heat-flux": "https://nb.wikipedia.org/wiki/Varmefluks",
            "concept-si-system-and-imperial-units": "https://nb.wikipedia.org/wiki/SI-systemet",
            "concept-wire-gauges-awg-swg-bwg": "https://en.wikipedia.org/wiki/Wire_gauge",
        };

        for (const [id, url] of Object.entries(expectedUrls)) {
            expect(catalogPresentationFor("nb", "concepts", id).wikipediaUrl).toBe(url);
        }
    });
});
