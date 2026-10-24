import { messages as finnish } from "./messages/fi";
import type { Locale } from "./locales";
import type { OhmField } from "../pages/ohm/domain";

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
        readonly languageMatches: (count: number) => string;
        readonly skipToContent: string;
    };
    readonly theme: {
        readonly switchToLight: string;
        readonly switchToDark: string;
    };
    readonly footer: {
        readonly purgeCache: string;
        readonly translationDraft: string;
        readonly suggestCorrection: string;
        readonly advertisement: string;
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
    readonly numericInput: {
        readonly enterNumber: string;
        readonly range: (min: string, max: string) => string;
        readonly atLeast: (min: string) => string;
        readonly atMost: (max: string) => string;
        readonly wholeNumber: string;
    };
    readonly calculatorHeader: {
        readonly oldVersionNote: string;
        readonly oldVersionLinkLabel: string;
    };
    readonly calculatorVisibility: {
        readonly label: string;
        readonly ariaLabel: (label: string) => string;
        readonly shown: string;
        readonly hidden: string;
    };
    readonly catalogManager: {
        readonly manage: (plural: string) => string;
        readonly shared: (noun: string) => string;
        readonly close: (noun: string) => string;
        readonly choose: (plural: string) => string;
        readonly builtIn: (plural: string) => string;
        readonly visibility: (plural: string) => string;
        readonly filterBuiltIns: string;
        readonly custom: (plural: string) => string;
        readonly customItemsDescription?: (plural: string) => string;
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
        readonly weightGrams: string;
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
        readonly sizeCodePlaceholder?: string;
        readonly wrapperColorPlaceholder?: string;
        readonly markingsPlaceholder?: string;
        readonly currentWithCRatingPlaceholder?: string;
        readonly cRatingWithCurrentPlaceholder?: string;
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
        readonly joulesLawLinkLabel?: string;
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
        readonly supportedModesAndCapabilities: string;
        readonly outputControlModes: string;
        readonly additionalCapabilities: string;
        readonly operatingFeatureLabels: Readonly<Record<string, string>>;
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

import { messages as english } from "./messages/en";
import { messages as bokmaal } from "./messages/nb-corrections";
import { messages as nynorsk } from "./messages/nn";
import { messages as simplifiedChinese } from "./messages/zh-Hans-corrections";
import { messages as arabic } from "./messages/ar";
import { messages as spanish } from "./messages/es-corrections";
import { messages as latinAmericanSpanish } from "./messages/es-419-corrections";
import { messages as french } from "./messages/fr-corrections";
import { messages as polish } from "./messages/pl-corrections";
import { messages as ukrainian } from "./messages/uk-corrections";
import { messages as italian } from "./messages/it-corrections";
import { messages as vietnamese } from "./messages/vi-corrections";
import { messages as german } from "./messages/de-corrections";
import { messages as swedish } from "./messages/sv-corrections";
import { messages as danish } from "./messages/da-corrections";
import { messages as icelandic } from "./messages/is-corrections";
import { messages as hindi } from "./messages/hi-corrections";
import { messages as bengali } from "./messages/bn-corrections";
import { messages as portuguese } from "./messages/pt-corrections";
import { messages as portugueseBrazilian } from "./messages/pt-BR-corrections";
import { messages as japanese } from "./messages/ja-corrections";
import { messages as korean } from "./messages/ko-corrections";
import { messages as greek } from "./messages/el-corrections";
import { messages as turkish } from "./messages/tr-corrections";
import { messages as indonesian } from "./messages/id-corrections";

export { english, bokmaal, nynorsk };

export const messages: Readonly<Record<Locale, SharedMessages>> = {
    en: english,
    nb: bokmaal,
    nn: nynorsk,
    "zh-Hans": simplifiedChinese,
    ar: arabic,
    es: spanish,
    "es-419": latinAmericanSpanish,
    fr: french,
    pl: polish,
    uk: ukrainian,
    it: italian,
    vi: vietnamese,
    de: german,
    sv: swedish,
    da: danish,
    is: icelandic,
    hi: hindi,
    bn: bengali,
    pt: portuguese,
    "pt-BR": portugueseBrazilian,
    ja: japanese,
    ko: korean,
    el: greek,
    tr: turkish,
    id: indonesian,
    fi: finnish,
};

export const messagesFor = (locale: Locale): SharedMessages => messages[locale];
