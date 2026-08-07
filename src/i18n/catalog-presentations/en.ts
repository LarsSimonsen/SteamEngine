import { batteryPresets } from "../../catalogs/batteries/defaults";
import { concepts } from "../../catalogs/concepts/catalog";
import { builtInPresets } from "../../catalogs/mods/presets";
import { materials } from "../../catalogs/materials/catalog";
import type {
    CatalogPresentation,
    CatalogPresentationMap,
    CatalogPresentationSet,
} from "../catalog-presentations";

const recordFor = <T extends { readonly id: string }>(
    items: readonly T[],
    presentationFor: (item: T) => CatalogPresentation,
): CatalogPresentationMap => Object.fromEntries(
    items.map((item) => [item.id, presentationFor(item)]),
) as CatalogPresentationMap;

const firstSentence = (value: string): string => value.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0].trim() ?? value;
const ohm = "Ω";
const degree = "°";
const alpha = "α";
const delta = "Δ";
const rho = "ρ";

const batterySummary = (battery: (typeof batteryPresets)[number]): string => battery.batteryAccess === "integrated"
    ? "An internal battery pack in the device rather than a user-replaceable cell."
    : "A removable rechargeable cell used in compatible devices.";

export const presentations: CatalogPresentationSet = {
    concepts: recordFor(concepts, (concept) => ({
        displayName: concept.title,
        description: concept.lead,
        summary: concept.summary,
        sections: concept.sections,
        wikipediaUrl: concept.wikipediaUrl,
    })),
    materials: recordFor(materials, (material) => {
        const description = material.description ?? `Catalog profile for ${material.name}.`;
        return {
            displayName: material.name,
            description,
            summary: firstSentence(description),
        };
    }),
    batteries: recordFor(batteryPresets, (battery) => ({
        displayName: battery.displayName,
        description: battery.description,
        summary: batterySummary(battery),
        notes: battery.dataNote ? [battery.dataNote] : undefined,
        safetyText: battery.safetyWarning,
    })),
    mods: recordFor(builtInPresets, (mod) => ({
        displayName: mod.displayName,
        description: mod.description ?? `A regulated vaping device profile for ${mod.displayName}.`,
        summary: firstSentence(mod.description ?? `A regulated vaping device profile for ${mod.displayName}.`),
    })),
};
