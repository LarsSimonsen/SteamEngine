import { concepts } from "../../catalogs/concepts/catalog";
import type {
    CatalogPresentation,
    CatalogPresentationMap,
    CatalogPresentationSet,
} from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

const recordFor = <T extends { readonly id: string }>(
    items: readonly T[],
    presentationFor: (item: T) => CatalogPresentation,
): CatalogPresentationMap => Object.fromEntries(
    items.map((item) => [item.id, presentationFor(item)]),
) as CatalogPresentationMap;


const ohm = "Ω";
const degree = "°";
const alpha = "α";
const delta = "Δ";
const rho = "ρ";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "A removable rechargeable cell used in compatible devices.",
    "battery.summary.integrated": "An internal battery pack in the device rather than a user-replaceable cell.",
    "battery.note.approvedResearch": "Approved 2026-08-13; refer to associated research record.",
    "battery.note.capacityBelowLabel": "True capacity is lower than the label suggests.",
    "battery.note.battery-71.evidence": "20 A continuous rating; pulse ratings are not used.",
    "battery.note.battery-77.evidence":
        "20 A conservative independent comparison value; exact "
        + "wrapper and production revision remain relevant.",
    "battery.note.battery-78.evidence":
        "15 A conservative value from exact-model testing; tested "
        + "CCC-marked revision remains relevant.",
    "battery.note.battery-79.evidence":
        "45 A independent continuous value for the tested tabless "
        + "revision; do not substitute pulse ratings.",
    "battery.note.battery-80.evidence": "36 A true continuous value; the 56 A figure is temperature-limited.",
    "battery.note.battery-81.evidence":
        "40 A conservative value; tested cells appeared "
        + "pre-production and lacked the CCC logo.",
    "battery.note.battery-82.evidence":
        "13 A recommended continuous value; 16.8 A is an absolute "
        + "maximum not intended for cycle life.",
    "battery.note.battery-83.evidence":
        "40 A conservative value; 70 A is temperature-limited and "
        + "tested samples were pre-production.",
    "battery.note.battery-84.evidence": "40 A production-cell comparison value; 70 A requires temperature control.",
    "battery.note.battery-85.evidence":
        "40 A exact-wrapper value; 70 A is limited to 60 C and "
        + "tested as an EVE 40PL rewrap.",
    "battery.note.battery-86.evidence":
        "19 A conservative value; exact tested samples appeared "
        + "pre-production and lacked CCC marks.",
    "battery.note.battery-87.evidence":
        "40 A conservative value; 90 A is temperature-limited and "
        + "tested cells appeared pre-production.",
    "battery.note.battery-88.evidence":
        "40 A conservative value; 60 A is temperature-limited and "
        + "production continuity remains unresolved.",
    "battery.note.battery-89.evidence":
        "40 A conservative value; tested samples had inconsistent "
        + "capacity and lacked CCC/CE marks.",
    "battery.note.battery-90.evidence":
        "13 A conservative value; exact tested samples appeared "
        + "pre-production and lacked CCC marks.",
    "battery.note.battery-91.evidence":
        "30 A tester-estimated continuous value; Reliance's 50 A "
        + "maximum is temperature-limited.",
    "battery.note.battery-92.evidence":
        "20 A continuous value from two tested production-related "
        + "batches; 30 A is temperature-limited.",
    "battery.note.battery-93.evidence":
        "12 A continuous; 20 A is pulse-only. Exact tested wrapper "
        + "is recorded as SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "20 A exact-wrapper value; the tester recommends below 15 A "
        + "continuous. Vapehuset advertises 25 A in its title, and "
        + "later rewrap sourcing or wrapper revisions may differ.",
    "battery.note.battery-95.evidence":
        "30 A exact-model value; this is a rewrap and later wrapper "
        + "revisions or underlying sourcing may differ.",
    "battery.note.battery-96.evidence":
        "30 A exact five-leg revision value; four-leg and later "
        + "revisions using the same wrap are materially different and "
        + "must not inherit this profile.",
    "battery.safety.lowDrain": "Low-drain battery; not suited for vaping.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Catalog profile for " + displayName + ".",
    "material.safety.verifiedProfile":
        "Use a verified material profile and follow the device's "
        + "temperature and operating limits.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "A regulated vaping device profile for "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a with a bead-blasted, bright-dipped "
        + "anodized aluminum finish; introduced in May 2014.",
    "mod.preset-10.profile":
        "A Cloupor 30 W device using a third-party DNA30-style "
        + "clone chipset, not an authentic Evolv DNA-30D board.",
    "mod.preset-231.profile":
        "Dual-21700 regulated mod with 18650 adapters; VAPORESSO "
        + "rates it 220 W; testing measured 208 W, 8.979 V, and 39 A.",
    "mod.preset-234.profile":
        "Dual-18650 regulated mod; VAPORESSO rates it 220 W; "
        + "testing measured 215 W, 9.08 V, and 37 A.",
    "mod.preset-235.profile":
        "Built-in-battery regulated mod rated at 100 W; testing "
        + "measured 101 W, 29 A, and at least 7.97 V.",
    "mod.preset-236.profile":
        "Single-18650 regulated mod using AS Chip 4.0; manufacturer "
        + "profile is 100 W, 7.5 V, 32 A, 0.1–3 Ω.",
    "mod.preset-237.profile":
        "Single-cell 21700/18650-adapter mod; Eleaf specifies 100 "
        + "W, 9 V, 0.05–3.5 Ω; testing identified 30 A.",
    "mod.preset-238.profile":
        "Single-cell regulated squonk mod for 21700, 20700, or "
        + "adapted 18650 cells with a conservative 95 W, 6 V, 34 A "
        + "profile.",
};

export const presentations: CatalogPresentationSet = {
    concepts: recordFor(concepts, (concept) => ({
        displayName: concept.title,
        description: concept.lead,
        summary: concept.summary,
        sections: concept.sections,
        wikipediaUrl: concept.wikipediaUrl,
    })),
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts),
};
