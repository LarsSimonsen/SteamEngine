import type { DefaultMaterial } from "./catalog";
import kanthalWireUrl from "../../assets/catalog/materials/kanthal-a1/kanthal-wire.jpg";
import kanthalCloseupUrl from "../../assets/catalog/materials/kanthal-a1/kanthal-wire-closeup.jpg";
import nichromeWireUrl from "../../assets/catalog/materials/nichrome-n80/nichrome-wire-heating-element.jpg";
import stainless304Url from "../../assets/catalog/materials/ss-304/stainless-steel-wire-rope.jpg";
import stainless316Url from "../../assets/catalog/materials/ss-316/316-wire-rope.jpg";
import stainless317Url from "../../assets/catalog/materials/ss-317l/ss317l-tubes.jpg";
import stainless430Url from "../../assets/catalog/materials/ss-430/ss430-microstructure.jpg";
import stainless904Url from "../../assets/catalog/materials/ss-904l/904l-valve.jpg";
import titaniumUrl from "../../assets/catalog/materials/titanium-1/titanium-metal.jpg";
import nickelUrl from "../../assets/catalog/materials/nickel-200/nickel-chunk.jpg";
import zirconiumUrl from "../../assets/catalog/materials/zirconium/zirconium-crystal-bar.jpg";

export type MaterialSource = {
    readonly id: string;
    readonly title: string;
    readonly url: string;
    readonly publisher?: string;
    readonly note?: string;
};

export type MaterialEvidenceNote = {
    readonly id: string;
    readonly statement: string;
    readonly sourceIds: readonly string[];
    readonly confidence?: string;
    readonly limitations?: string;
};

export type MaterialSafetyNoteScope = "vaping-specific" | "general-material" | "industrial";

// Only measurement units belong in the property table's Unit column. Descriptions,
// qualifiers, methods, and uncertainty belong in the value, label, or note instead.
export const catalogPropertyUnits = [
    "A",
    "C",
    "g",
    "J/(kg·K)",
    "kg/m³",
    "mAh",
    "mm",
    "ppm/K",
    "V",
    "W",
    "W/(m·K)",
    "µm/(m·K)",
    "µΩ·m",
    "°C",
    "Ω",
] as const;

export type CatalogPropertyUnit = typeof catalogPropertyUnits[number];

export type MaterialProperty = {
    readonly label: string;
    readonly value: string;
    readonly href?: string;
    readonly unit?: CatalogPropertyUnit;
    readonly note?: string;
};

export type MaterialPropertyNote = {
    readonly label: string;
    readonly description: string;
    readonly explanation?: string;
};

export type MaterialImage = {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly sourceId: string;
};

export type MaterialEncyclopediaRecord = {
    readonly overview: string;
    readonly vapingContext: string;
    readonly researchSummary?: string;
    readonly evidenceNotes?: readonly MaterialEvidenceNote[];
    readonly safetyNote?: string;
    readonly safetyNoteScope?: MaterialSafetyNoteScope;
    readonly secondaryProperties: readonly MaterialProperty[];
    readonly practicalProperties?: readonly MaterialProperty[];
    readonly propertyNotes?: readonly MaterialPropertyNote[];
    readonly maxRecommendedVapingTemperatureCelsius?: number;
    readonly sources: readonly MaterialSource[];
    readonly images?: readonly MaterialImage[];
};

const kanthalSource: MaterialSource = {
    id: "kanthal-handbook",
    title: "Kanthal resistance heating alloys handbook",
    url: "https://www.kanthal.com/globalassets/kanthal-global/downloads/resistance-heating-alloys-for-electric-appliances-handbook_b_eng_lr.pdf",
    publisher: "Kanthal",
    note: "Industrial alloy data; service temperatures are not vaping recommendations.",
};

const nifethal52Source: MaterialSource = {
    id: "kanthal-nifethal-52",
    title: "Nifethal 52 wire datasheet",
    url: "https://www.kanthal.com/products/datasheets/material-datasheets/wire/resistance-heating-wire-and-resistance-wire/nifethal-521/",
    publisher: "Kanthal",
    note: "Current product data; another Kanthal presentation lists a conflicting room-temperature resistivity.",
};

const kanthalWireSource: MaterialSource = {
    id: "kanthal-wire",
    title: "Resistance heating wire and conductive wire",
    url: "https://www.kanthal.com/products/materials-in-wire-and-strip-form/wire/",
    publisher: "Kanthal",
};

const vapingWireSource: MaterialSource = {
    id: "vaping-wire-guide",
    title: "Vape wire types",
    url: "https://vaping360.com/learn/vape-wire-types/",
    publisher: "Vaping360",
    note: "A practical vaping overview, not a materials datasheet.",
};

const coilTemperatureSource: MaterialSource = {
    id: "coil-temperature-study",
    title: "Accuracy of commercial electronic nicotine delivery systems temperature control technology",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6218080/",
    publisher: "Tobacco Control / PMC",
    note: "Shows why measured coil temperature depends on device and operating conditions.",
};

const kanthalEvidenceNotes: readonly MaterialEvidenceNote[] = [
    {
        id: "kanthal-identity",
        statement: "Kanthal A-1 / APM is represented as an FeCrAl-family resistance wire profile.",
        sourceIds: ["kanthal-handbook", "kanthal-wire"],
        confidence: "high",
        limitations: "The manufacturer sources describe the alloy family and wire products; this does not authenticate every spool or revision.",
    },
    {
        id: "kanthal-vaping-use",
        statement: "Kanthal-family wire is generally used for wattage builds because its resistance change is too small for typical temperature-control operation.",
        sourceIds: ["vaping-wire-guide", "coil-temperature-study"],
        confidence: "medium",
        limitations: "Device behavior depends on resistance measurement, calibration, and the exact wire product.",
    },
    {
        id: "kanthal-temperature-limit",
        statement: "Industrial service-temperature data must not be treated as a recommended vaping temperature or dry-coil operating limit.",
        sourceIds: ["kanthal-handbook", "coil-temperature-study"],
        confidence: "high",
        limitations: "The sources provide material and measurement context, not a personalized operating recommendation.",
    },
];

const stainlessSource: MaterialSource = {
    id: "outokumpu-stainless",
    title: "Stainless steel product ranges",
    url: "https://www.outokumpu.com/en/products/product-ranges",
    publisher: "Outokumpu",
    note: "Producer data for industrial stainless grades; exact grade and condition still matter.",
};

const elementSource = (element: string, title: string): MaterialSource => ({
    id: `wikipedia-${element}`,
    title,
    url: `https://en.wikipedia.org/wiki/${element}`,
    publisher: "Wikipedia",
    note: "General reference for the element; calculator values may use a particular grade or condition.",
});

const imageSource = (id: string, title: string, url: string): MaterialSource => ({
    id,
    title,
    url,
    publisher: "Wikimedia Commons",
    note: "Image is exact or representative as described in the local asset manifest.",
});

const imageSources = {
    kanthal: imageSource("image-kanthal", "Kanthal wire", "https://commons.wikimedia.org/wiki/File:Kanthal_-_drut_oporowy.JPG"),
    nichrome: imageSource("image-nichrome", "Nichrome heating element", "https://commons.wikimedia.org/wiki/File:Nichrome_wire_heating_element.jpg"),
    stainless304: imageSource("image-stainless-304", "Stainless steel wire rope", "https://commons.wikimedia.org/wiki/File:Stainless_steel_wire_rope.jpg"),
    stainless316: imageSource("image-stainless-316", "316 marine wire rope", "https://commons.wikimedia.org/wiki/File:316_wire_rope_for_marine_industry.jpg"),
    stainless317: imageSource("image-stainless-317", "317L seamless tubes", "https://commons.wikimedia.org/wiki/File:Stainless_Steel_317L_Seamless_U_Tubes_Exporters_In_India.jpg"),
    stainless430: imageSource("image-stainless-430", "AISI 430 microstructure", "https://commons.wikimedia.org/wiki/File:Microstructure_of_AISI_430_cooled_in_air_after_heating_to_950_deg_C.jpg"),
    stainless904: imageSource("image-stainless-904", "904L valve", "https://commons.wikimedia.org/wiki/File:6-moly-valve-cryogenic-bellows-seal-globe-valve.JPG"),
    titanium: imageSource("image-titanium", "Titanium metal", "https://commons.wikimedia.org/wiki/File:Titanium_metal.jpg"),
    nickel: imageSource("image-nickel", "Nickel sample", "https://commons.wikimedia.org/wiki/File:Nickel_chunk.jpg"),
    zirconium: imageSource("image-zirconium", "Pure zirconium crystal bar", "https://commons.wikimedia.org/wiki/File:Zr-crystal-bar.jpg"),
} as const;

const kanthalImages: readonly MaterialImage[] = [
    {
        src: kanthalWireUrl,
        alt: "Kanthal resistance wire on a spool",
        caption: "Representative Kanthal-family resistance wire.",
        sourceId: imageSources.kanthal.id,
    },
    {
        src: kanthalCloseupUrl,
        alt: "Close-up of shiny Kanthal resistance wire on a spool",
        caption: "Close-up showing the wire surface and metallic appearance.",
        sourceId: imageSources.kanthal.id,
    },
];

const familyImages = {
    nichrome: [{
        src: nichromeWireUrl,
        alt: "Nichrome wire heating element",
        caption: "Representative Nichrome-family heating element; the image does not prove the exact grade.",
        sourceId: imageSources.nichrome.id,
    }],
    stainless304: [{
        src: stainless304Url,
        alt: "Stainless steel wire rope",
        caption: "Representative stainless-steel wire; the image does not prove the exact coil-wire grade.",
        sourceId: imageSources.stainless304.id,
    }],
    stainless316: [{
        src: stainless316Url,
        alt: "316 stainless steel marine wire rope",
        caption: "316 stainless steel wire rope.",
        sourceId: imageSources.stainless316.id,
    }],
    stainless317: [{
        src: stainless317Url,
        alt: "317L stainless steel seamless tubes",
        caption: "317L stainless steel product; not coil wire.",
        sourceId: imageSources.stainless317.id,
    }],
    stainless430: [{
        src: stainless430Url,
        alt: "AISI 430 stainless steel microstructure",
        caption: "AISI 430 microstructure image.",
        sourceId: imageSources.stainless430.id,
    }],
    stainless904: [{
        src: stainless904Url,
        alt: "904L stainless steel valve",
        caption: "904L stainless steel product; not coil wire.",
        sourceId: imageSources.stainless904.id,
    }],
    titanium: [{
        src: titaniumUrl,
        alt: "Titanium metal sample",
        caption: "Representative titanium metal; the image does not prove the exact wire grade.",
        sourceId: imageSources.titanium.id,
    }],
    nickel: [{
        src: nickelUrl,
        alt: "Nickel metal sample",
        caption: "Representative nickel-family sample; the image does not prove Nickel 200 grade.",
        sourceId: imageSources.nickel.id,
    }],
    zirconium: [{
        src: zirconiumUrl,
        alt: "Pure zirconium crystal bar",
        caption: "Pure zirconium crystal bar.",
        sourceId: imageSources.zirconium.id,
    }],
} as const;

const feCrAl = (images?: readonly MaterialImage[]): MaterialEncyclopediaRecord => ({
    overview: "This FeCrAl resistance alloy is made by melting and alloying iron, chromium, and aluminium, then processing the alloy into resistance wire. The aluminium-rich surface forms a protective alumina layer during high-temperature service.",
    vapingContext: "FeCrAl wire is commonly used for straightforward wattage coils because its resistivity is relatively high and its temperature coefficient is modest. Kanthal A-family grades are not normally used for temperature-control mode because their resistance change is too small for typical vape electronics to measure reliably.",
    safetyNote: "Industrial maximum temperatures describe furnace or heating-element service, not a vaping setpoint. Use the correct wire profile and avoid overheating a dry coil.",
    safetyNoteScope: "vaping-specific",
    practicalProperties: [
        { label: "Thermal conductivity at 20 °C", value: "13", unit: "W/(m·K)" },
    ],
    secondaryProperties: [
        { label: "Linear thermal expansion", value: "14–15", unit: "µm/(m·K)", note: "20–1000 °C." },
        { label: "Melting point", value: "1500", unit: "°C", note: "Approximate." },
    ],
    propertyNotes: [{
        label: "Surface behavior",
        description: "A protective alumina scale forms during high-temperature oxidation.",
        explanation: "The scale slows further oxidation of the alloy.",
    }],
    sources: [kanthalSource, kanthalWireSource, vapingWireSource, coilTemperatureSource,
        ...(images ? [imageSources.kanthal] : [])],
    images,
});

const niCr = (images?: readonly MaterialImage[]): MaterialEncyclopediaRecord => ({
    overview: "Nichrome is a nickel–chromium resistance-alloy family. Commercial grades are produced by melting the specified alloy composition and drawing or rolling it into resistance wire; the exact grade changes resistivity, oxidation behavior, and temperature capability.",
    vapingContext: "Nichrome is popular for wattage coils because it heats readily and has higher resistivity than many stainless grades. Its temperature coefficient is usually too small or too variable for dependable temperature-control operation, so it is generally treated as wattage wire unless the exact alloy profile is known.",
    safetyNote: "The exact Nichrome grade matters, especially for temperature-control use. Use a known alloy and replace wire that is damaged or heavily oxidized.",
    safetyNoteScope: "vaping-specific",
    practicalProperties: [
        { label: "Thermal conductivity at 20 °C", value: "13–15", unit: "W/(m·K)" },
    ],
    secondaryProperties: [
        { label: "Linear thermal expansion", value: "16–18", unit: "µm/(m·K)", note: "20–1000 °C." },
        { label: "Melting point", value: "1380–1400", unit: "°C", note: "Grade-dependent." },
    ],
    propertyNotes: [{
        label: "Magnetic behavior",
        description: "Grade- and condition-dependent.",
        explanation: "Nickel-rich Nichrome grades and their processing history can differ.",
    }],
    sources: [kanthalSource, kanthalWireSource, vapingWireSource, coilTemperatureSource,
        ...(images ? [imageSources.nichrome] : [])],
    images,
});

const stainless = (images?: readonly MaterialImage[]): MaterialEncyclopediaRecord => ({
    overview: "Stainless steel is an iron-based alloy family whose chromium content supports a passive, corrosion-resistant surface; nickel, molybdenum, nitrogen, and carbon vary by grade. Production generally involves melting, refining, casting, hot and cold working, and heat treatment to achieve the specified grade and condition.",
    vapingContext: "Stainless steel became common in vaping because selected grades combine useful resistance change with practical wire availability. SS316L is especially common in temperature-control profiles, while SS304, SS317L, SS430, and SS904L should be treated as distinct grades rather than interchangeable presets.",
    safetyNote: "Grade, surface condition, temperature, liquid chemistry, and dry-coil operation all matter. Temperature-control estimates depend on the wire identity, resistance measurement, and device calibration.",
    safetyNoteScope: "vaping-specific",
    practicalProperties: [
        { label: "Thermal conductivity", value: "14–16", unit: "W/(m·K)", note: "Grade-dependent." },
    ],
    secondaryProperties: [
        { label: "Linear thermal expansion", value: "16–18", unit: "µm/(m·K)", note: "Grade-dependent." },
        { label: "Melting range", value: "1370–1450", unit: "°C", note: "Grade-dependent." },
    ],
    propertyNotes: [{
        label: "Surface behavior",
        description: "Chromium supports a passive oxide surface.",
        explanation: "Corrosion resistance depends on grade, processing, contamination, and environment.",
    }],
    sources: [stainlessSource, vapingWireSource, coilTemperatureSource,
        ...(images ? [images[0].sourceId === imageSources.stainless304.id ? imageSources.stainless304
            : images[0].sourceId === imageSources.stainless316.id ? imageSources.stainless316
                : images[0].sourceId === imageSources.stainless317.id ? imageSources.stainless317
                    : images[0].sourceId === imageSources.stainless430.id ? imageSources.stainless430
                        : imageSources.stainless904] : [])],
    images,
});

const titanium = (images?: readonly MaterialImage[]): MaterialEncyclopediaRecord => ({
    overview: "Titanium is a light metallic element used commercially in several grades; Grade 1 and Grade 2 are commercially pure grades with different impurity limits and mechanical properties. Industrial titanium is produced from titanium minerals through chloride chemistry and reduction before melting and working into the required product form.",
    vapingContext: "Titanium wire was an early temperature-control material because its resistance changes strongly with temperature. It is less forgiving than ordinary wattage wire: the exact grade and profile matter, and uncontrolled overheating can damage the wire or alter its surface.",
    safetyNote: "Use titanium with a correctly configured temperature-control device and a verified wire profile. Avoid dry-burning it to glowing temperatures.",
    safetyNoteScope: "vaping-specific",
    practicalProperties: [
        { label: "Thermal conductivity", value: "16–22", unit: "W/(m·K)", note: "Grade-dependent." },
    ],
    secondaryProperties: [
        {
            label: "Linear thermal expansion",
            value: "8.5–9.0",
            unit: "µm/(m·K)",
            note: "Near room temperature.",
        },
        { label: "Melting point", value: "1668", unit: "°C", note: "Titanium." },
    ],
    propertyNotes: [{
        label: "Surface behavior",
        description: "Titanium rapidly forms a stable oxide film.",
        explanation: "The film contributes to its corrosion resistance.",
    }],
    sources: [elementSource("Titanium", "Titanium"), vapingWireSource, coilTemperatureSource,
        ...(images ? [imageSources.titanium] : [])],
    images,
});

const records: Readonly<Record<string, MaterialEncyclopediaRecord>> = {
    ka1: {
        ...feCrAl(kanthalImages),
        researchSummary: "Kanthal A-1 / APM is an FeCrAl resistance-wire profile used in the calculator for wattage-oriented builds.",
        evidenceNotes: kanthalEvidenceNotes,
        safetyNoteScope: "vaping-specific",
    },
    ka: feCrAl(),
    kd: feCrAl(),
    n20: niCr(),
    n40: niCr(),
    n60: niCr(),
    n70: niCr(),
    n80: niCr(familyImages.nichrome),
    n90: niCr(),
    ss304: stainless(familyImages.stainless304),
    ss316: stainless(familyImages.stainless316),
    ss316l: stainless(),
    ss317l: stainless(familyImages.stainless317),
    ss430: stainless(familyImages.stainless430),
    ss904l: stainless(familyImages.stainless904),
    ti1: titanium(familyImages.titanium),
    ti2: titanium(),
    tie: {
        ...titanium(),
        overview: "Titanium ready is a commercial ready-wire alloy label rather than a standard commercially pure titanium grade. Its producer describes a multi-element titanium alloy, so its composition and temperature behavior should not be silently substituted for Grade 1 or Grade 2 titanium.",
        vapingContext: "This profile is useful only when the actual product and its resistance-temperature behavior are known. Treat it as a specialty temperature-control wire and use the supplied profile rather than a generic titanium preset.",
        safetyNote: "The catalog's calculator values are estimates for this commercial label. Verify the actual product before treating the profile as authoritative.",
        safetyNoteScope: "vaping-specific",
    },
    w: {
        overview: "Tungsten is a refractory metallic element with an exceptionally high melting point and high density. Industrial tungsten wire and rod are made from powder-derived tungsten that is compacted, sintered, and worked into the required form.",
        vapingContext: "Tungsten has appeared as a specialty resistance-wire option, but its very low resistivity and high mass make it unusual for ordinary rebuildable coils. It is not a mainstream vaping material and should not be treated as interchangeable with temperature-control alloys.",
        safetyNote: "This is a specialty material with no general vaping recommendation in the catalog; use exact product data rather than extrapolating from industrial service conditions.",
        safetyNoteScope: "vaping-specific",
        practicalProperties: [{
            label: "Thermal conductivity",
            value: "174",
            unit: "W/(m·K)",
            note: "Pure tungsten.",
        }],
        secondaryProperties: [{ label: "Melting point", value: "3422", unit: "°C", note: "Tungsten." }],
        sources: [elementSource("Tungsten", "Tungsten"), vapingWireSource],
    },
    nio: {
        overview: "The catalog's niobium-alloy entry represents a specialty resistance wire rather than pure niobium. It is described as an FeCrAl-family wire with a niobium addition, so the commercial name should not be read as a standardized composition.",
        vapingContext: "This is a niche specialty wire with a low-confidence calculator resistivity estimate. Use the exact product's measured resistance and temperature behavior rather than assuming that pure-niobium properties apply.",
        safetyNote: "Composition and product history are unresolved for this catalog label, so the entry remains an approximate calculator profile.",
        safetyNoteScope: "general-material",
        practicalProperties: [{ label: "Thermal conductivity", value: "Not established", note: "The catalog record does not contain a product-grade measurement." }],
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "Exact alloy composition is unresolved." }],
        sources: [vapingWireSource],
    },
    ni200: {
        overview: "Nickel 200 is a commercially pure nickel grade with controlled impurity limits. It is produced by refining nickel and then casting, working, and annealing it to meet the grade specification; the resulting material is ductile and corrosion resistant in many environments.",
        vapingContext: "Nickel 200 was one of the earliest widely documented temperature-control wires because its resistance changes strongly and predictably over the practical coil-temperature range. It is now less commonly chosen than stainless steel, but the profile remains important for legacy devices and calculator comparisons.",
        safetyNote: "Nickel wire belongs with a verified temperature-control profile. Follow the exact device and wire guidance, particularly when setting temperature limits.",
        safetyNoteScope: "vaping-specific",
        practicalProperties: [{
            label: "Thermal conductivity",
            value: "90",
            unit: "W/(m·K)",
            note: "Near room temperature.",
        }],
        secondaryProperties: [{
            label: "Melting point",
            value: "1446",
            unit: "°C",
            note: "Nickel 200 family.",
        }],
        sources: [elementSource("Nickel", "Nickel"), kanthalSource, vapingWireSource, coilTemperatureSource,
            imageSources.nickel],
        images: familyImages.nickel,
    },
    nife30: {
        overview: "NiFe30 is a nickel–iron resistance alloy made by melting the specified composition and working it into wire. Resistherm is a commercial grade whose electrical behavior is represented in the catalog by a full temperature-factor curve.",
        vapingContext: "NiFe30 has been used as a high-sensitivity temperature-control wire. The name is not enough to identify the curve: commercial NiFe products can have different resistivity and TCR values, so the exact product profile matters.",
        safetyNote: "Use the exact curve only with a device that supports it; another NiFe30-labelled wire may not be equivalent.",
        safetyNoteScope: "vaping-specific",
        practicalProperties: [{ label: "Thermal conductivity", value: "Not separately verified", note: "The calculator inherits a thermal estimate from the catalog family." }],
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "Exact commercial grade data is not shown in the calculator catalog." }],
        sources: [vapingWireSource, coilTemperatureSource],
    },
    dicodes: {
        overview: "This entry is the TCR representation of the same NiFe30 Resistherm material used by the catalog's TFR entry. It is a numerical model variant, not a separate alloy.",
        vapingContext: "The fixed coefficient is convenient for devices that accept a TCR value, while the companion TFR entry preserves the fuller curve. Choose the representation that matches the device and the exact wire.",
        safetyNote: "A TCR value is an approximation over a temperature interval, so it should be matched to the device and wire rather than treated as a universal material constant.",
        safetyNoteScope: "vaping-specific",
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "See the companion Resistherm material record." }],
        sources: [vapingWireSource, coilTemperatureSource],
    },
    reactor: {
        overview: "Reactor Wire is a commercial NiFe resistance wire rather than a standardized elemental material. The catalog preserves the product's historical resistivity and TCR representation separately from the generic NiFe30 records.",
        vapingContext: "It was marketed for temperature-control builds and is best treated as a product-specific profile. Do not substitute the profile of Resistherm or another NiFe wire without checking the actual product.",
        safetyNote: "The catalog thermal properties are inherited estimates rather than product-grade measurements; inspect the wire for overheating or surface changes.",
        safetyNoteScope: "vaping-specific",
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "Commercial composition is not fully documented in the catalog." }],
        sources: [vapingWireSource, coilTemperatureSource],
    },
    nife30stealth: {
        overview: "This is a commercial StealthVape NiFe30 product profile. The trade label identifies a product family, but the exact alloy and resistance-temperature behavior remain manufacturer- or batch-dependent.",
        vapingContext: "It was sold as temperature-control wire and should be used with the product-specific coefficient or measured profile. Treat it as distinct from Resistherm even though both use the NiFe30 name.",
        safetyNote: "Nominal NiFe30 labels do not guarantee identical composition or TCR. Verify the actual spool before relying on this profile.",
        safetyNoteScope: "vaping-specific",
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "Exact commercial composition is unresolved." }],
        sources: [vapingWireSource, coilTemperatureSource],
    },
    nft70: {
        overview: "Nifethal 70 is a nickel–iron resistance alloy produced for controlled electrical resistance and a large temperature coefficient. Its catalog curve is based on the manufacturer's tabulated temperature factors.",
        vapingContext: "This is a niche temperature-control material with a stronger resistance response than ordinary Kanthal or Nichrome. It is useful for comparison and specialist builds, but device support and exact wire identity still matter.",
        safetyNote: "The manufacturer temperature limit is an industrial wire-service value, not a vaping setpoint. Keep the coil wet and within the device's operating range.",
        safetyNoteScope: "vaping-specific",
        practicalProperties: [{
            label: "Industrial service limit",
            value: "600",
            unit: "°C",
            note: "Manufacturer wire data. Not a recommended vaping temperature.",
        }],
        secondaryProperties: [{ label: "Melting point", value: "Not shown", note: "The catalog preserves the manufacturer's service data rather than a melting point." }],
        sources: [kanthalSource, kanthalWireSource, vapingWireSource, coilTemperatureSource],
    },
    nft52: {
        overview: "Nifethal 52 is a nickel–iron controlled-expansion resistance alloy. The alloy is melted to composition and worked into wire; the catalog retains a historical curve whose resistivity differs from some current manufacturer tables.",
        vapingContext: "It is a specialty temperature-control wire, not a generic substitute for NiFe30. The stored curve is useful for compatibility with historical calculator designs, but the exact product revision should be confirmed before relying on it.",
        safetyNote: "The catalog records an unresolved resistivity conflict for this grade; treat the values as calculator compatibility data.",
        safetyNoteScope: "general-material",
        practicalProperties: [{ label: "Industrial service data", value: "Grade-dependent", note: "Do not transfer a furnace-wire service rating to vaping." }],
        secondaryProperties: [{ label: "Melting point", value: "Not established", note: "The grade conflict is not resolved in the catalog audit." }],
        sources: [kanthalSource, nifethal52Source, vapingWireSource, coilTemperatureSource],
    },
    zr: {
        overview: "Zirconium is a corrosion-resistant metallic element that forms a protective oxide film. Commercial zirconium is produced from mineral concentrates through chemical separation, reduction, and melting before it is worked into products such as wire.",
        vapingContext: "Zirconium wire is a niche temperature-control material with a strong positive resistance response. It is less standardized in vaping than stainless steel, nickel, or titanium, so exact product data and device support are important.",
        safetyNote: "Use a verified profile and treat the catalog's curve as product-specific calculator data; zirconium wire is not interchangeable with titanium or stainless steel.",
        safetyNoteScope: "vaping-specific",
        practicalProperties: [{
            label: "Thermal conductivity",
            value: "22",
            unit: "W/(m·K)",
            note: "Pure zirconium.",
        }],
        secondaryProperties: [{ label: "Melting point", value: "1855", unit: "°C", note: "Zirconium." }],
        propertyNotes: [{
            label: "Surface behavior",
            description: "Zirconium forms a protective zirconium-oxide film in oxidizing conditions.",
        }],
        sources: [elementSource("Zirconium", "Zirconium"), vapingWireSource, coilTemperatureSource,
            imageSources.zirconium],
        images: familyImages.zirconium,
    },
};

const sourceIdsForResearch = (record: MaterialEncyclopediaRecord): readonly string[] => record.sources
    .filter((source) => !source.id.startsWith("image-"))
    .map((source) => source.id);

const firstSentence = (value: string): string => value.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0].trim() ?? value;

const withMaterialResearch = (
    id: string,
    record: MaterialEncyclopediaRecord,
): MaterialEncyclopediaRecord => {
    if (record.researchSummary && record.evidenceNotes && record.evidenceNotes.length > 0) return record;
    const sourceIds = sourceIdsForResearch(record);
    const contextSourceIds: readonly string[] = sourceIds.filter((sourceId) =>
        sourceId === "vaping-wire-guide" || sourceId === "coil-temperature-study");
    const identitySourceIds = sourceIds.filter((sourceId) => !contextSourceIds.includes(sourceId));
    const fallbackSourceIds = contextSourceIds.length > 0 ? contextSourceIds : sourceIds;
    return {
        ...record,
        researchSummary: record.researchSummary ?? firstSentence(record.overview),
        evidenceNotes: record.evidenceNotes ?? [
            {
                id: `${id}-material-context`,
                statement: record.overview,
                sourceIds: (identitySourceIds.length > 0 ? identitySourceIds : fallbackSourceIds).slice(0, 2),
                confidence: "medium",
                limitations: "Sources may describe a material family or industrial grade rather than this exact wire product.",
            },
            {
                id: `${id}-vaping-context`,
                statement: record.vapingContext,
                sourceIds: fallbackSourceIds.slice(0, 2),
                confidence: "medium",
                limitations: "Vaping-use context does not establish exact composition or a universal operating recommendation.",
            },
        ],
    };
};

const recordsWithResearch: Readonly<Record<string, MaterialEncyclopediaRecord>> = Object.fromEntries(
    Object.entries(records).map(([id, record]) => [id, withMaterialResearch(id, record)]),
) as Readonly<Record<string, MaterialEncyclopediaRecord>>;

export const materialEncyclopediaRecordFor = (
    material: DefaultMaterial,
): MaterialEncyclopediaRecord => recordsWithResearch[material.id] ?? withMaterialResearch(material.id, {
    overview: "This built-in material has a calculator profile but no encyclopedia research summary yet.",
    vapingContext: "Use the calculator values as compatibility data and verify the exact wire product before building.",
    safetyNote: "No material-specific vaping temperature recommendation is recorded for this entry.",
    safetyNoteScope: "general-material",
    secondaryProperties: [],
    sources: [vapingWireSource, coilTemperatureSource],
});

export const materialEncyclopediaRecords = recordsWithResearch;
