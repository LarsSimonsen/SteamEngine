import type { Locale } from "./locales";
import type { OhmField } from "../pages/ohm/domain";
import { toNynorsk } from "./nynorsk";

export type SharedMessages = {
    readonly navigation: {
        readonly about: string;
        readonly blog: string;
        readonly catalog: string;
        readonly home: string;
        readonly primary: string;
        readonly calculators: string;
        readonly language: string;
        readonly languageFilter: string;
        readonly noLanguageMatches: string;
        readonly english: string;
        readonly bokmaal: string;
    };
    readonly theme: {
        readonly switchToLight: string;
        readonly switchToDark: string;
    };
    readonly footer: {
        readonly purgeCache: string;
    };
    readonly error: {
        readonly title: string;
        readonly cancel: string;
        readonly reset: string;
        readonly hideDetails: string;
        readonly viewDetails: string;
        readonly retry: string;
        readonly retrying: string;
    };
    readonly calculatorHeader: {
        readonly oldVersionNote: string;
        readonly oldVersionLinkLabel: string;
    };
    readonly catalogManager: {
        readonly manage: (plural: string) => string;
        readonly shared: (noun: string) => string;
        readonly close: (plural: string) => string;
        readonly choose: (plural: string) => string;
        readonly builtIn: (plural: string) => string;
        readonly visibility: (plural: string) => string;
        readonly filterBuiltIns: string;
        readonly custom: (plural: string) => string;
        readonly newCustom: (noun: string) => string;
        readonly noneYet: (plural: string) => string;
        readonly clone: string;
        readonly edit: string;
        readonly delete: string;
        readonly confirmDelete: string;
        readonly cancel: string;
        readonly confirmReset: string;
        readonly resetSaved: (noun: string) => string;
        readonly resetSavedMessage: string;
        readonly savedReset: (noun: string) => string;
        readonly usedBy: (noun: string, references: string) => string;
        readonly deleted: (label: string) => string;
    };
    readonly catalogEditor: {
        readonly editCustom: (noun: string) => string;
        readonly newCustom: (noun: string) => string;
        readonly clone: (label: string) => string;
        readonly properties: (noun: string) => string;
        readonly save: (noun: string) => string;
        readonly saved: (noun: string) => string;
        readonly cancel: string;
        readonly name: string;
        readonly manufacturer: string;
        readonly model: string;
        readonly variant: string;
        readonly optional: string;
        readonly unknown: string;
        readonly batteryAccess: string;
        readonly removableCell: string;
        readonly integratedMod: string;
        readonly formFactor: string;
        readonly selectFormFactor: string;
        readonly notApplicable: string;
        readonly cylindrical: string;
        readonly prismatic: string;
        readonly sizeCode: string;
        readonly nominalDiameter: string;
        readonly nominalLength: string;
        readonly terminalStyle: string;
        readonly flatTop: string;
        readonly buttonTop: string;
        readonly length: string;
        readonly width: string;
        readonly thickness: string;
        readonly protectedStatus: string;
        readonly protectedCell: string;
        readonly unprotectedCell: string;
        readonly wrapperColor: string;
        readonly markings: string;
        readonly ratedCapacity: string;
        readonly continuousCurrent: string;
        readonly continuousC: string;
        readonly nominalVoltage: string;
        readonly safetyWarning: string;
        readonly dataNote: string;
        readonly batteryHelp: string;
        readonly resistivity: string;
        readonly heatCapacity: string;
        readonly density: string;
        readonly temperatureModel: string;
        readonly noTemperatureData: string;
        readonly tcrPerDegree: string;
        readonly temperature: string;
        readonly resistanceFactor: string;
        readonly removeTfrPoint: string;
        readonly addTfrPoint: string;
        readonly normalizationHelp: string;
        readonly normalizationInterpolated: string;
        readonly normalizationExtrapolated: string;
        readonly normalizationExisting: string;
        readonly basedOnPreset: string;
        readonly none: string;
        readonly maxOutputVoltage: string;
        readonly maxOutputPower: string;
        readonly maxOutputCurrent: string;
        readonly minAtomizerResistance: string;
        readonly maxAtomizerResistance: string;
    };
    readonly home: {
        readonly intro: string;
        readonly toolkit: string;
        readonly chooseCalculator: string;
        readonly blogEyebrow: string;
        readonly blogTitle: string;
        readonly blogDescription: string;
        readonly catalogEyebrow: string;
        readonly catalogTitle: string;
        readonly catalogDescription: string;
        readonly tools: Readonly<Record<string, { readonly label: string; readonly description: string }>>;
    };
    readonly ohm: {
        readonly eyebrow: string;
        readonly title: string;
        readonly descriptionBeforeOhm: string;
        readonly descriptionBetweenLaws: string;
        readonly descriptionAfterLaws: string;
        readonly values: string;
        readonly lock: string;
        readonly reset: string;
        readonly simpleLocks: string;
        readonly showDetailedLocks: string;
        readonly hideDetailedLocks: string;
        readonly detailedLocks: string;
        readonly adjusting: (field: string) => string;
        readonly help: string;
        readonly about: string;
        readonly aboutText: string;
        readonly serviceUnavailable: string;
        readonly defaultsRestored: string;
        readonly fields: Readonly<Record<OhmField, string>>;
        readonly lockSummary: (adjusted: string, locked: string) => string;
    };
    readonly encyclopedia: {
        readonly kicker: string;
        readonly title: string;
        readonly lead: string;
        readonly entriesLabel: (count: number) => string;
        readonly browserLabel: string;
        readonly searchLabel: string;
        readonly searchPlaceholder: string;
        readonly filtersLabel: string;
        readonly all: string;
        readonly openEntry: string;
        readonly noMatches: string;
        readonly browseCategory: (label: string, count: number) => string;
        readonly categoryLabels: Readonly<Record<"concepts" | "batteries" | "materials" | "mods", string>>;
        readonly categoryDescriptions: Readonly<Record<"concepts" | "batteries" | "materials" | "mods", string>>;
    };
    readonly encyclopediaDetail: {
        readonly breadcrumb: string;
        readonly categoryLabels: Readonly<Record<"concepts" | "batteries" | "materials" | "mods", string>>;
        readonly additionalInformation: string;
        readonly aliases: string;
        readonly marketIntroduction: string;
        readonly introduced: (date: string) => string;
        readonly introducedBetween: (earliest: string, latest: string) => string;
        readonly introducedNoEarlier: (date: string) => string;
        readonly availableBy: (date: string) => string;
        readonly unknown: string;
        readonly relatedEntry: string;
        readonly sourceBackedMaterial: string;
        readonly sourceBackedEntity: string;
        readonly researchSummary: string;
        readonly noResearchSummary: string;
        readonly evidenceNotes: string;
        readonly source: string;
        readonly sources: string;
        readonly noSources: string;
        readonly noSourceBackedRecord: string;
        readonly property: string;
        readonly properties: string;
        readonly value: string;
        readonly unit: string;
        readonly additionalPropertyNotes: string;
        readonly unknownPropertyValue: string;
        readonly appearance: string;
        readonly loadingPowerCurve: string;
        readonly temperatureResistanceCurve: string;
        readonly temperature: string;
        readonly relativeResistance: string;
        readonly extrapolatedCurve: string;
        readonly loadingTemperatureCurve: string;
        readonly normalizedCurve: (method: string) => string;
        readonly loadingResearchRecord: string;
        readonly independentTestReview: string;
        readonly reviewed: (date: string) => string;
        readonly limitation: string;
        readonly evidenceDate: string;
        readonly confidence: string;
        readonly date: string;
        readonly relation: string;
        readonly lifecycleEvidence: string;
        readonly recordStatus: string;
        readonly identityStability: string;
        readonly lastUpdated: string;
        readonly researchSources: string;
        readonly deviceSafetyNotes: string;
        readonly safety: string;
        readonly catalogImplication: string;
        readonly noBatterySafety: string;
        readonly batteryInternal: string;
        readonly batteryRemovable: string;
        readonly continuousDischargeCurrent: (value: number) => string;
        readonly continuousDischargeC: (value: number) => string;
        readonly noContinuousDischarge: string;
        readonly rewrapExplanation: string;
        readonly oldBatteryWarning: string;
        readonly unknownBatteryIntroductionNotice: string;
        readonly unknownChemistry: string;
        readonly unknownAuthenticitySummary: string;
        readonly nonRemovableBatteryProfile: string;
        readonly basedOnBoardProfile: string;
        readonly builtIntoModProfile: string;
        readonly appliesTo: string;
        readonly status: string;
        readonly authenticityAssessment: string;
        readonly noAuthenticityAssessment: string;
        readonly catalogNote: string;
        readonly chemistry: string;
        readonly batteryAccess: string;
        readonly integratedInMod: string;
        readonly protection: string;
        readonly protectedCell: string;
        readonly unprotectedCell: string;
        readonly brand: string;
        readonly manufacturer: string;
        readonly nominalVoltage: string;
        readonly wrapperColor: string;
        readonly markings: string;
        readonly noDefinedCurve: (tcr: string) => string;
        readonly noUsableResistanceRange: string;
        readonly modBoardCatalog: string;
        readonly batteryCatalog: string;
        readonly materialCatalog: string;
        readonly overview: string;
        readonly inVaping: string;
        readonly materialSpecificLimitations: string;
        readonly secondaryProperties: string;
        readonly noMaterialSources: string;
        readonly basedOnArticle: string;
        readonly seeAlso: string;
        readonly wikipedia: string;
        readonly propertyLabels: Readonly<Record<string, string>>;
    };
};

export const english: SharedMessages = {
    navigation: {
        about: "About",
        blog: "Blog",
        catalog: "Catalog",
        home: "Steam Engine home",
        primary: "Primary navigation",
        calculators: "Calculator navigation",
        language: "Language",
        languageFilter: "Filter languages",
        noLanguageMatches: "No languages found.",
        english: "English",
        bokmaal: "Bokmål",
    },
    theme: { switchToLight: "Switch to light mode", switchToDark: "Switch to dark mode" },
    footer: { purgeCache: "Purge cache" },
    error: {
        title: "The calculator could not update",
        cancel: "Cancel",
        reset: "Reset",
        hideDetails: "Hide details",
        viewDetails: "View details",
        retry: "Retry",
        retrying: "Retrying…",
    },
    calculatorHeader: { oldVersionNote: "You can find the old version of this calculator", oldVersionLinkLabel: "here" },
    catalogManager: {
        manage: (plural) => `Manage ${plural.toLocaleLowerCase()}`,
        shared: (noun) => `shared ${noun.toLocaleLowerCase()} catalog`,
        close: (plural) => `Close ${plural.toLocaleLowerCase()} manager`,
        choose: (plural) => `Choose visible built-ins or create ${plural.toLocaleLowerCase()} stored in this browser.`,
        builtIn: (plural) => `Built-in ${plural.toLocaleLowerCase()}`,
        visibility: (plural) => `Visibility changes save immediately. Hidden ${plural.toLocaleLowerCase()} remain available for cloning.`,
        filterBuiltIns: "Filter built-ins",
        custom: (plural) => `Custom ${plural.toLocaleLowerCase()}`,
        newCustom: (noun) => `New custom ${noun.toLocaleLowerCase()}`,
        noneYet: (plural) => `No custom ${plural.toLocaleLowerCase()} yet.`,
        clone: "Clone", edit: "Edit", delete: "Delete", confirmDelete: "Confirm delete", cancel: "Cancel",
        confirmReset: "Confirm reset", resetSaved: (noun) => `Reset saved ${noun.toLocaleLowerCase()} data`,
        resetSavedMessage: "This removes only the saved data. Continue?",
        savedReset: (noun) => `Saved ${noun.toLocaleLowerCase()} data was reset.`,
        usedBy: (noun, references) => `Cannot delete ${noun}; it is used by ${references}.`,
        deleted: (label) => `${label} was deleted.`,
    },
    catalogEditor: {
        editCustom: (noun) => `Edit custom ${noun.toLocaleLowerCase()}`,
        newCustom: (noun) => `New custom ${noun.toLocaleLowerCase()}`,
        clone: (label) => `Clone ${label}`,
        properties: (noun) => `${noun} properties`,
        save: (noun) => `Save ${noun.toLocaleLowerCase()}`,
        saved: (noun) => `${noun} saved.`,
        cancel: "Cancel", name: "Name", manufacturer: "Manufacturer", model: "Model", variant: "Variant",
        optional: "Optional", unknown: "Unknown", batteryAccess: "Battery access", removableCell: "Removable cell",
        integratedMod: "Integrated in mod", formFactor: "Form factor", selectFormFactor: "Select a form factor",
        notApplicable: "Not applicable", cylindrical: "Cylindrical", prismatic: "Prismatic", sizeCode: "Size code",
        nominalDiameter: "Nominal diameter (mm)", nominalLength: "Nominal length (mm)", terminalStyle: "Terminal style",
        flatTop: "Flat top", buttonTop: "Button top", length: "Length (mm)", width: "Width (mm)",
        thickness: "Thickness (mm)", protectedStatus: "Protected status", protectedCell: "Protected",
        unprotectedCell: "Unprotected", wrapperColor: "Wrapper color", markings: "Markings",
        ratedCapacity: "Rated capacity (mAh)", continuousCurrent: "Continuous discharge current (A)",
        continuousC: "Continuous discharge C rating", nominalVoltage: "Nominal voltage (V)",
        safetyWarning: "Safety warning", dataNote: "Data note",
        batteryHelp: "Enter at least one continuous discharge limit. Integrated batteries are internal mod packs, so standalone cell dimensions are not required. Removable-cell dimensions are nominal; use the notes for measured as-sold dimensions. When both discharge limits are set, the calculator continues to use the safer derived limit if they differ materially.",
        resistivity: "Resistivity (Ω mm²/m)", heatCapacity: "Heat capacity (J/g·K)", density: "Density (g/cm³)",
        temperatureModel: "Temperature model", noTemperatureData: "No temperature data", tcrPerDegree: "TCR (per °C)",
        temperature: "Temperature (°C)", resistanceFactor: "Resistance factor", removeTfrPoint: "Remove TFR point",
        addTfrPoint: "Add TFR point", normalizationHelp: "Saving sorts the curve, inserts or derives the 20 °C reference, and normalizes all factors.",
        normalizationInterpolated: " The 20 °C point was interpolated and the curve was normalized.",
        normalizationExtrapolated: " The 20 °C point was extrapolated and the curve was normalized.",
        normalizationExisting: " The TFR curve was normalized at 20 °C.",
        basedOnPreset: "Based on preset", none: "None", maxOutputVoltage: "Maximum output voltage (V)",
        maxOutputPower: "Maximum output power (W)", maxOutputCurrent: "Maximum output current (A)",
        minAtomizerResistance: "Minimum atomizer resistance (Ω)", maxAtomizerResistance: "Maximum atomizer resistance (Ω)",
    },
    home: {
        intro:
            "Steam Engine is a suite of practical calculators for building coils, checking battery drain, "
            + "mixing e-liquid, and understanding the numbers behind your setup.",
        toolkit: "The toolkit",
        chooseCalculator: "Choose a calculator",
        blogEyebrow: "Keep up to date",
        blogTitle: "Steam Engine blog",
        blogDescription: "Find updates and calculator tips on the Steam Engine blog.",
        catalogEyebrow: "Reference library",
        catalogTitle: "Explore the catalog",
        catalogDescription:
            "Learn the concepts and look up the materials, batteries, mods, and boards used by Steam Engine.",
        tools: {
            ohm: {
                label: "Ohm's law",
                description: "Calculate resistance, voltage, current, and power with Joule heating.",
            },
            coil: {
                label: "Coil wrapping",
                description: "Plan rebuildable atomizer coils and explore their electrical behavior.",
            },
            wirewiz: {
                label: "Wire Wizard", description: "Combine different wires to shape a coil and its temperature curve.",
            },
            batt: { label: "Battery drain", description: "See current and power drain for a battery-powered device." },
            modrange: { label: "Mod range", description: "Find the useful resistance range for a regulated mod." },
            juice: { label: "E-liquid", description: "Mix a recipe to your target nicotine strength and VG/PG ratio." },
            converter: {
                label: "Convert",
                description: "Convert between millimeters, inches, fractional inches, and wire gauges.",
            },
            old: { label: "Legacy site", description: "You can find the old versions of the calculators here." },
        },
    },
    ohm: {
        eyebrow: "Ohm's law calculator",
        title: "Ohm's law",
        descriptionBeforeOhm: "This is a simple",
        descriptionBetweenLaws: "and",
        descriptionAfterLaws: "calculator.",
        values: "Values",
        lock: "Lock",
        reset: "Reset",
        simpleLocks: "Simple locks",
        showDetailedLocks: "Show detailed locks",
        hideDetailedLocks: "Hide detailed locks",
        detailedLocks: "Detailed locks",
        adjusting: (field) => `When adjusting ${field.toLowerCase()}`,
        help: "What to keep constant while you adjust other values.",
        about: "About this calculator",
        aboutText: "You can change any value. The other values update immediately. Values can be locked so they do not "
            + "change when you adjust another value.",
        serviceUnavailable: "The calculator service is unavailable.",
        defaultsRestored: "Default settings have been restored.",
        fields: { resistance: "Resistance", voltage: "Voltage", current: "Current", power: "Power" },
        lockSummary: (adjusted, locked) => `Changing ${adjusted} keeps ${locked.toLowerCase()} constant.`,
    },
    encyclopedia: {
        kicker: "Steam Engine reference",
        title: "Catalog",
        lead: "Browse the concepts, materials, batteries, mods, and control boards behind the calculators.",
        entriesLabel: (count) => `${count} ${count === 1 ? "entry" : "entries"}`,
        browserLabel: "Catalog entries",
        searchLabel: "Search encyclopedia entries",
        searchPlaceholder: "Search names, models, or aliases",
        filtersLabel: "Filter encyclopedia entries",
        all: "All",
        openEntry: "Open entry",
        noMatches: "No entries match that search.",
        browseCategory: (label, count) => `Browse ${label} (${count} ${count === 1 ? "entry" : "entries"})`,
        categoryLabels: {
            concepts: "Concepts", batteries: "Batteries", materials: "Materials", mods: "Mods and boards",
        },
        categoryDescriptions: {
            concepts: "The principles behind the calculators and their results.",
            batteries: "Cells, packs, and integrated power sources.",
            materials: "Resistance wire and temperature-control materials.",
            mods: "Regulated devices and control-board profiles.",
        },
    },
    encyclopediaDetail: {
        breadcrumb: "Breadcrumb",
        categoryLabels: { concepts: "Concepts", batteries: "Batteries", materials: "Materials", mods: "Mods" },
        additionalInformation: "Additional information",
        aliases: "Aliases",
        marketIntroduction: "Market introduction",
        introduced: (date) => `Introduced ${date}`,
        introducedBetween: (earliest, latest) => `Introduced between ${earliest} and ${latest}`,
        introducedNoEarlier: (date) => `Introduced no earlier than ${date}`,
        availableBy: (date) => `Available by ${date}`,
        unknown: "Unknown",
        relatedEntry: "Related entry",
        sourceBackedMaterial: "Source-backed material record",
        sourceBackedEntity: "Source-backed entity record",
        researchSummary: "Research summary",
        noResearchSummary: "No research summary is available for this entry.",
        evidenceNotes: "Evidence notes",
        source: "Source",
        sources: "Sources",
        noSources: "No sources are available for this entry.",
        noSourceBackedRecord: "No source-backed research record is available for this entry.",
        property: "Property",
        properties: "Properties",
        value: "Value",
        unit: "Unit",
        additionalPropertyNotes: "Additional property notes",
        unknownPropertyValue: "The catalog does not establish a value for this property.",
        appearance: "Appearance",
        loadingPowerCurve: "Loading power curve",
        temperatureResistanceCurve: "Temperature resistance curve",
        temperature: "Temperature",
        relativeResistance: "Relative resistance",
        extrapolatedCurve: "Values beyond the supplied points are linearly extrapolated for the graph only.",
        loadingTemperatureCurve: "Loading temperature curve…",
        normalizedCurve: (method) => `The catalog curve is normalized to R/R20. Normalization method: ${method}.`,
        loadingResearchRecord: "Loading research record…",
        independentTestReview: "Independent test and review",
        reviewed: (date) => `Reviewed ${date}`,
        limitation: "Limitation",
        evidenceDate: "Evidence date",
        confidence: "Confidence",
        date: "Date",
        relation: "Relation",
        lifecycleEvidence: "Lifecycle evidence",
        recordStatus: "Record status",
        identityStability: "Identity stability",
        lastUpdated: "Last updated",
        researchSources: "Research sources",
        deviceSafetyNotes: "Device-specific safety notes",
        safety: "Safety",
        catalogImplication: "Catalog implication",
        noBatterySafety: "No battery-specific safety note is recorded for this entry.",
        batteryInternal: "This battery is an internal pack in the device rather than a user-replaceable cell.",
        batteryRemovable: "This is a removable rechargeable cell used in compatible devices.",
        continuousDischargeCurrent: (value) => `The catalog lists a ${value} A continuous-discharge rating.`,
        continuousDischargeC: (value) => `The catalog lists a ${value} C continuous-discharge rating.`,
        noContinuousDischarge: "A continuous-discharge rating is not established in the catalog.",
        rewrapExplanation: "The label is treated as a rewrap brand; the underlying cell manufacturer is not assumed from the wrapper.",
        oldBatteryWarning: "This is an old battery model and is probably superseded by more suitable models.",
        unknownBatteryIntroductionNotice: "The market introduction date for this cell is unknown, so its age and whether it has been superseded cannot be determined.",
        unknownChemistry: "The research record does not establish a chemistry label for this entry.",
        unknownAuthenticitySummary: "The record does not include a fuller authenticity summary.",
        nonRemovableBatteryProfile: "This mod has a non-removable battery profile:",
        basedOnBoardProfile: "This device profile is based on the board profile:",
        builtIntoModProfile: "This battery profile is built into the mod profile:",
        appliesTo: "Applies to",
        status: "Status",
        authenticityAssessment: "Authenticity assessment",
        noAuthenticityAssessment: "No entry-specific authenticity assessment has been recorded.",
        catalogNote: "Catalog note",
        chemistry: "Chemistry",
        batteryAccess: "Battery access",
        integratedInMod: "Integrated in mod",
        protection: "Protection",
        protectedCell: "Protected cell.",
        unprotectedCell: "Unprotected cell.",
        brand: "Brand",
        manufacturer: "Manufacturer",
        nominalVoltage: "Nominal voltage",
        wrapperColor: "Wrapper color",
        markings: "Markings",
        noDefinedCurve: (tcr) => `This material has no defined TFR curve points. Its TCR is ${tcr} per °C.`,
        noUsableResistanceRange: "No usable resistance range can be calculated from the catalog limits.",
        modBoardCatalog: "Mod board and device catalog",
        batteryCatalog: "Battery catalog",
        materialCatalog: "Coil material catalog",
        overview: "Overview",
        inVaping: "In vaping",
        materialSpecificLimitations: "Material-specific limitations",
        secondaryProperties: "Secondary properties",
        noMaterialSources: "No sources are available for this material.",
        basedOnArticle: "Based on the Steam Engine knowledge-base article",
        seeAlso: "See also",
        wikipedia: "Wikipedia",
        propertyLabels: {
            formFactor: "Form factor",
            dimensions: "Dimensions",
            ratedCapacity: "Rated capacity",
            continuousDischarge: "Continuous-discharge rating",
            maximumPower: "Maximum power",
            maximumVoltage: "Maximum voltage",
            maximumCurrent: "Maximum current",
            resistanceRange: "Resistance range",
            boardController: "Board/controller",
            resistivity: "Electrical resistivity at 20 °C",
            temperatureModel: "Temperature model",
            fullResistanceCurve: "Full resistance curve",
            temperatureCoefficient: "Temperature coefficient",
            specificHeatCapacity: "Specific heat capacity",
            maximumRecommendedTemperature: "Maximum recommended vaping temperature",
            density: "Density",
            meltingPoint: "Melting point",
        },
    },
};

export const bokmaal: SharedMessages = {
    navigation: {
        about: "Om",
        blog: "Blogg",
        catalog: "Katalog",
        home: "Steam Engine-hjem",
        primary: "Hovednavigasjon",
        calculators: "Kalkulatornavigasjon",
        language: "Språk",
        languageFilter: "Filtrer språk",
        noLanguageMatches: "Ingen språk funnet.",
        english: "English",
        bokmaal: "Bokmål",
    },
    theme: { switchToLight: "Bytt til lys modus", switchToDark: "Bytt til mørk modus" },
    footer: { purgeCache: "Tøm hurtigbuffer" },
    error: {
        title: "Kalkulatoren kunne ikke oppdateres",
        cancel: "Avbryt",
        reset: "Tilbakestill",
        hideDetails: "Skjul detaljer",
        viewDetails: "Vis detaljer",
        retry: "Prøv igjen",
        retrying: "Prøver igjen…",
    },
    calculatorHeader: {
        oldVersionNote: "Du finner den gamle versjonen av denne kalkulatoren",
        oldVersionLinkLabel: "her",
    },
    catalogManager: {
        manage: (plural) => `Administrer ${plural.toLocaleLowerCase()}`,
        shared: (noun) => `felles katalog for ${noun.toLocaleLowerCase()}`,
        close: (plural) => `Lukk ${plural.toLocaleLowerCase()}-administrasjon`,
        choose: (plural) => `Velg synlige innebygde elementer eller opprett ${plural.toLocaleLowerCase()} som lagres i nettleseren.`,
        builtIn: (plural) => `Innebygde ${plural.toLocaleLowerCase()}`,
        visibility: (plural) => `Synlighetsendringer lagres med en gang. Skjulte ${plural.toLocaleLowerCase()} kan fortsatt klones.`,
        filterBuiltIns: "Filtrer innebygde",
        custom: (plural) => `Egendefinerte ${plural.toLocaleLowerCase()}`,
        newCustom: (noun) => `Ny egendefinert ${noun.toLocaleLowerCase()}`,
        noneYet: (plural) => `Ingen egendefinerte ${plural.toLocaleLowerCase()} ennå.`,
        clone: "Klon", edit: "Rediger", delete: "Slett", confirmDelete: "Bekreft sletting", cancel: "Avbryt",
        confirmReset: "Bekreft tilbakestilling", resetSaved: (noun) => `Tilbakestill lagrede data for ${noun.toLocaleLowerCase()}`,
        resetSavedMessage: "Dette fjerner bare de lagrede dataene. Fortsette?",
        savedReset: (noun) => `Lagrede data for ${noun.toLocaleLowerCase()} ble tilbakestilt.`,
        usedBy: (noun, references) => `Kan ikke slette ${noun}; den brukes av ${references}.`,
        deleted: (label) => `${label} ble slettet.`,
    },
    catalogEditor: {
        editCustom: (noun) => `Rediger egendefinert ${noun.toLocaleLowerCase()}`,
        newCustom: (noun) => `Ny egendefinert ${noun.toLocaleLowerCase()}`,
        clone: (label) => `Klon ${label}`,
        properties: (noun) => `${noun}-egenskaper`,
        save: (noun) => `Lagre ${noun.toLocaleLowerCase()}`,
        saved: (noun) => `${noun} ble lagret.`,
        cancel: "Avbryt", name: "Navn", manufacturer: "Produsent", model: "Modell", variant: "Variant",
        optional: "Valgfritt", unknown: "Ukjent", batteryAccess: "Batteritilgang", removableCell: "Utskiftbar celle",
        integratedMod: "Integrert i mod", formFactor: "Format", selectFormFactor: "Velg et format",
        notApplicable: "Ikke aktuelt", cylindrical: "Sylindrisk", prismatic: "Prismatisk", sizeCode: "Størrelseskode",
        nominalDiameter: "Nominell diameter (mm)", nominalLength: "Nominell lengde (mm)", terminalStyle: "Terminaltype",
        flatTop: "Flat topp", buttonTop: "Knappetopp", length: "Lengde (mm)", width: "Bredde (mm)",
        thickness: "Tykkelse (mm)", protectedStatus: "Beskyttelsesstatus", protectedCell: "Beskyttet",
        unprotectedCell: "Ubeskyttet", wrapperColor: "Farge på innpakning", markings: "Merking",
        ratedCapacity: "Angitt kapasitet (mAh)", continuousCurrent: "Kontinuerlig utladningsstrøm (A)",
        continuousC: "Kontinuerlig utladning, C-verdi", nominalVoltage: "Nominell spenning (V)",
        safetyWarning: "Sikkerhetsadvarsel", dataNote: "Datanotat",
        batteryHelp: "Angi minst én grense for kontinuerlig utladning. Integrerte batterier er interne modulpakker og trenger ikke frittstående celledimensjoner. Dimensjoner for utskiftbare celler er nominelle; bruk notatene for målte dimensjoner. Når begge utladningsgrensene er angitt, bruker kalkulatoren fortsatt den tryggeste beregnede grensen hvis de avviker vesentlig.",
        resistivity: "Resistivitet (Ω mm²/m)", heatCapacity: "Varmekapasitet (J/g·K)", density: "Tetthet (g/cm³)",
        temperatureModel: "Temperaturmodell", noTemperatureData: "Ingen temperaturdata", tcrPerDegree: "TCR (per °C)",
        temperature: "Temperatur (°C)", resistanceFactor: "Motstandsfaktor", removeTfrPoint: "Fjern TFR-punkt",
        addTfrPoint: "Legg til TFR-punkt", normalizationHelp: "Lagring sorterer kurven, setter inn eller utleder referansen ved 20 °C og normaliserer alle faktorene.",
        normalizationInterpolated: " 20 °C-punktet ble interpolert og kurven ble normalisert.",
        normalizationExtrapolated: " 20 °C-punktet ble ekstrapolert og kurven ble normalisert.",
        normalizationExisting: " TFR-kurven ble normalisert ved 20 °C.",
        basedOnPreset: "Basert på forvalg", none: "Ingen", maxOutputVoltage: "Maksimal utgangsspenning (V)",
        maxOutputPower: "Maksimal utgangseffekt (W)", maxOutputCurrent: "Maksimal utgangsstrøm (A)",
        minAtomizerResistance: "Minimum forstøvermotstand (Ω)", maxAtomizerResistance: "Maksimum forstøvermotstand (Ω)",
    },
    home: {
        intro: "Steam Engine er en samling praktiske kalkulatorer for bygging av spoler, kontroll av batteriforbruk, "
            + "blanding av e-væske og forståelse av tallene bak oppsettet ditt.",
        toolkit: "Verktøykassen",
        chooseCalculator: "Velg en kalkulator",
        blogEyebrow: "Følg med",
        blogTitle: "Steam Engine-bloggen",
        blogDescription: "Finn oppdateringer og kalkulatortips på Steam Engine-bloggen.",
        catalogEyebrow: "Referansebibliotek",
        catalogTitle: "Utforsk katalogen",
        catalogDescription:
            "Lær om konseptene og slå opp materialene, batteriene, moddene og kortene som brukes av Steam Engine.",
        tools: {
            ohm: {
                label: "Ohms lov",
                description: "Beregn motstand, spenning, strøm og effekt med Joule-oppvarming.",
            },
            coil: {
                label: "Spolevikling",
                description: "Planlegg spoler for ombyggbare forstøvere og utforsk deres elektriske egenskaper.",
            },
            wirewiz: {
                label: "Wire Wizard",
                description: "Kombiner ulike tråder for å forme en spole og temperaturkurven dens.",
            },
            batt: { label: "Batteriforbruk", description: "Se strøm- og effektforbruket til en batteridrevet enhet." },
            modrange: { label: "Mod-område", description: "Finn det nyttige motstandsområdet for en regulert mod." },
            juice: { label: "E-væske", description: "Bland en oppskrift til ønsket nikotinstyrke og VG/PG-forhold." },
            converter: {
                label: "Konverter",
                description: "Konverter mellom millimeter, tommer, brøktommer og tråddiametere.",
            },
            old: { label: "Gammelt nettsted", description: "Her finner du de gamle versjonene av kalkulatorene." },
        },
    },
    ohm: {
        eyebrow: "Ohms lov-kalkulator",
        title: "Ohms lov",
        descriptionBeforeOhm: "Dette er en enkel",
        descriptionBetweenLaws: "og",
        descriptionAfterLaws: "kalkulator.",
        values: "Verdier",
        lock: "Lås",
        reset: "Tilbakestill",
        simpleLocks: "Enkle låser",
        showDetailedLocks: "Vis detaljerte låser",
        hideDetailedLocks: "Skjul detaljerte låser",
        detailedLocks: "Detaljerte låser",
        adjusting: (field) => `Ved justering av ${field.toLowerCase()}`,
        help: "Hva som skal holdes konstant mens du justerer andre verdier.",
        about: "Om denne kalkulatoren",
        aboutText: "Du kan endre hvilken som helst verdi. De andre verdiene oppdateres umiddelbart. Verdier kan låses "
            + "slik at de ikke endres når du justerer en annen verdi.",
        serviceUnavailable: "Kalkulatortjenesten er utilgjengelig.",
        defaultsRestored: "Standardinnstillingene er gjenopprettet.",
        fields: { resistance: "Motstand", voltage: "Spenning", current: "Strøm", power: "Effekt" },
        lockSummary: (adjusted, locked) => `Når ${adjusted} endres, forblir ${locked.toLowerCase()} konstant.`,
    },
    encyclopedia: {
        kicker: "Steam Engine-referanse",
        title: "Katalog",
        lead: "Utforsk konseptene, materialene, batteriene, moddene og styrekortene bak kalkulatorene.",
        entriesLabel: (count) => `${count} ${count === 1 ? "oppføring" : "oppføringer"}`,
        browserLabel: "Katalogoppføringer",
        searchLabel: "Søk i leksikonoppføringer",
        searchPlaceholder: "Søk etter navn, modeller eller aliaser",
        filtersLabel: "Filtrer leksikonoppføringer",
        all: "Alle",
        openEntry: "Åpne oppføring",
        noMatches: "Ingen oppføringer samsvarer med søket.",
        browseCategory: (label, count) => `Se ${label.toLowerCase()} (${count} ${count === 1 ? "oppføring" : "oppføringer"})`,
        categoryLabels: {
            concepts: "Konsepter", batteries: "Batterier", materials: "Materialer", mods: "Modder og styrekort",
        },
        categoryDescriptions: {
            concepts: "Prinsippene bak kalkulatorene og resultatene deres.",
            batteries: "Celler, pakker og integrerte strømkilder.",
            materials: "Motstandstråd og materialer for temperaturkontroll.",
            mods: "Regulerte enheter og profiler for styrekort.",
        },
    },
    encyclopediaDetail: {
        breadcrumb: "Brødsmulesti",
        categoryLabels: { concepts: "Konsepter", batteries: "Batterier", materials: "Materialer", mods: "Modder" },
        additionalInformation: "Tilleggsinformasjon",
        aliases: "Alias",
        marketIntroduction: "Markedsintroduksjon",
        introduced: (date) => `Introdusert ${date}`,
        introducedBetween: (earliest, latest) => `Introdusert mellom ${earliest} og ${latest}`,
        introducedNoEarlier: (date) => `Introdusert tidligst ${date}`,
        availableBy: (date) => `Tilgjengelig innen ${date}`,
        unknown: "Ukjent",
        relatedEntry: "Relatert oppføring",
        sourceBackedMaterial: "Kildestøttet materialoppføring",
        sourceBackedEntity: "Kildestøttet enhetsoppføring",
        researchSummary: "Forskningssammendrag",
        noResearchSummary: "Det finnes ikke noe forskningssammendrag for denne oppføringen.",
        evidenceNotes: "Evidensnotater",
        source: "Kilde",
        sources: "Kilder",
        noSources: "Det finnes ingen kilder for denne oppføringen.",
        noSourceBackedRecord: "Det finnes ingen kildestøttet forskningsoppføring for denne oppføringen.",
        property: "Egenskap",
        properties: "Egenskaper",
        value: "Verdi",
        unit: "Enhet",
        additionalPropertyNotes: "Flere egenskapsnotater",
        unknownPropertyValue: "Katalogen fastsetter ingen verdi for denne egenskapen.",
        appearance: "Utseende",
        loadingPowerCurve: "Laster effektkurve",
        temperatureResistanceCurve: "Temperaturmotstandskurve",
        temperature: "Temperatur",
        relativeResistance: "Relativ motstand",
        extrapolatedCurve: "Verdier utenfor de oppgitte punktene ekstrapoleres lineært, kun for grafen.",
        loadingTemperatureCurve: "Laster temperaturkurve…",
        normalizedCurve: (method) => `Katalogkurven er normalisert til R/R20. Normaliseringsmetode: ${method}.`,
        loadingResearchRecord: "Laster forskningsoppføring…",
        independentTestReview: "Uavhengig test og vurdering",
        reviewed: (date) => `Vurdert ${date}`,
        limitation: "Begrensning",
        evidenceDate: "Evidensdato",
        confidence: "Sikkerhet",
        date: "Dato",
        relation: "Relasjon",
        lifecycleEvidence: "Livssyklusevidens",
        recordStatus: "Oppføringsstatus",
        identityStability: "Identitetsstabilitet",
        lastUpdated: "Sist oppdatert",
        researchSources: "Forskningskilder",
        deviceSafetyNotes: "Enhetsspesifikke sikkerhetsnotater",
        safety: "Sikkerhet",
        catalogImplication: "Katalogens betydning",
        noBatterySafety: "Det er ikke registrert noe batterispesifikt sikkerhetsnotat for denne oppføringen.",
        batteryInternal: "Dette batteriet er en intern batteripakke i enheten, ikke en celle som brukeren kan bytte.",
        batteryRemovable: "Dette er en utskiftbar, oppladbar celle for kompatible enheter.",
        continuousDischargeCurrent: (value) => `Katalogen oppgir ${value} A som kontinuerlig utladingsverdi.`,
        continuousDischargeC: (value) => `Katalogen oppgir ${value} C som kontinuerlig utladingsverdi.`,
        noContinuousDischarge: "Katalogen fastsetter ingen kontinuerlig utladingsverdi.",
        rewrapExplanation: "Merket behandles som et rewrap-merke; den underliggende celleprodusenten antas ikke ut fra omslaget.",
        oldBatteryWarning: "Dette er en gammel batterimodell som trolig er erstattet av bedre egnede modeller.",
        unknownBatteryIntroductionNotice: "Markedsintroduksjonen for denne cellen er ukjent, så alder og eventuell erstatning kan ikke fastslås.",
        unknownChemistry: "Forskningsoppføringen fastsetter ingen kjemibetegnelse for denne oppføringen.",
        unknownAuthenticitySummary: "Oppføringen inneholder ikke noe mer utfyllende ekthetssammendrag.",
        nonRemovableBatteryProfile: "Denne modden har en profil med et ikke-utskiftbart batteri:",
        basedOnBoardProfile: "Denne enhetsprofilen er basert på styrekortprofilen:",
        builtIntoModProfile: "Denne batteriprofilen er innebygd i modprofilen:",
        appliesTo: "Gjelder",
        status: "Status",
        authenticityAssessment: "Ekthetsvurdering",
        noAuthenticityAssessment: "Det er ikke registrert noen ekthetsvurdering for denne oppføringen.",
        catalogNote: "Katalognotat",
        chemistry: "Kjemi",
        batteryAccess: "Batteritilgang",
        integratedInMod: "Integrert i mod",
        protection: "Beskyttelse",
        protectedCell: "Beskyttet celle.",
        unprotectedCell: "Ubeskyttet celle.",
        brand: "Merke",
        manufacturer: "Produsent",
        nominalVoltage: "Nominell spenning",
        wrapperColor: "Farge på omslag",
        markings: "Merkinger",
        noDefinedCurve: (tcr) => `Dette materialet har ingen definerte TFR-punkter. TCR er ${tcr} per °C.`,
        noUsableResistanceRange: "Det kan ikke beregnes et brukbart motstandsområde fra kataloggrensene.",
        modBoardCatalog: "Katalog over modder og styrekort",
        batteryCatalog: "Batterikatalog",
        materialCatalog: "Katalog over coilmaterialer",
        overview: "Oversikt",
        inVaping: "I damping",
        materialSpecificLimitations: "Materialspesifikke begrensninger",
        secondaryProperties: "Sekundære egenskaper",
        noMaterialSources: "Det finnes ingen kilder for dette materialet.",
        basedOnArticle: "Basert på Steam Engines kunnskapsbaseartikkel",
        seeAlso: "Se også",
        wikipedia: "Wikipedia",
        propertyLabels: {
            formFactor: "Format",
            dimensions: "Mål",
            ratedCapacity: "Nominell kapasitet",
            continuousDischarge: "Kontinuerlig utladingsverdi",
            maximumPower: "Maksimal effekt",
            maximumVoltage: "Maksimal spenning",
            maximumCurrent: "Maksimal strøm",
            resistanceRange: "Motstandsområde",
            boardController: "Styrekort/kontroller",
            resistivity: "Elektrisk resistivitet ved 20 °C",
            temperatureModel: "Temperaturmodell",
            fullResistanceCurve: "Full motstandskurve",
            temperatureCoefficient: "Temperaturkoeffisient",
            specificHeatCapacity: "Spesifikk varmekapasitet",
            maximumRecommendedTemperature: "Maksimal anbefalt damptemperatur",
            density: "Tetthet",
            meltingPoint: "Smeltepunkt",
        },
    },
};

const nynorsk = toNynorsk(bokmaal);

export const messages: Readonly<Record<Locale, SharedMessages>> = { en: english, nb: bokmaal, nn: nynorsk };

export const messagesFor = (locale: Locale): SharedMessages => messages[locale];
