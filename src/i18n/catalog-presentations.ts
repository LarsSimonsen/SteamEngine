import { presentations as finnish, batteryTexts as fiBatteryTexts,
    materialTexts as fiMaterialTexts, modTexts as fiModTexts } from "./catalog-presentations/fi";
import type { Locale } from "./locales";
import { batteryPresets } from "../catalogs/batteries/defaults";
import { concepts, type ConceptSection } from "../catalogs/concepts/catalog";
import { builtInPresets } from "../catalogs/mods/presets";
import { materials } from "../catalogs/materials/catalog";
import type { CatalogCategory } from "../pages/encyclopedia/routes";
import type { BatteryTextDictionary } from "./battery-presentation-text";
import type { ModTextDictionary } from "./mod-presentation-text";
import type { MaterialTextDictionary } from "./material-presentation-text";

export type CatalogPresentation = {
    readonly displayName: string;
    readonly description?: string;
    readonly summary?: string;
    readonly sections?: readonly ConceptSection[];
    readonly wikipediaUrl?: string;
    readonly notes?: readonly string[];
    readonly safetyText?: string;
};

export type CatalogPresentationMap = Readonly<Record<string, CatalogPresentation>>;

export type CatalogPresentationSet = Readonly<Record<CatalogCategory, CatalogPresentationMap>>;

import {
    batteryTexts as englishBatteryTexts,
    materialTexts as englishMaterialTexts,
    modTexts as englishModTexts,
    presentations as english,
} from "./catalog-presentations/en";
import {
    batteryTexts as bokmaalBatteryTexts,
    materialTexts as bokmaalMaterialTexts,
    modTexts as bokmaalModTexts,
} from "./catalog-presentations/nb";
import { presentations as bokmaal } from "./catalog-presentations/nb-corrections";
import {
    batteryTexts as nynorskBatteryTexts,
    materialTexts as nynorskMaterialTexts,
    modTexts as nynorskModTexts,
} from "./catalog-presentations/nn";
import { presentations as nynorsk } from "./catalog-presentations/nn-corrections";
import {
    batteryTexts as simplifiedChineseBatteryTexts,
    materialTexts as simplifiedChineseMaterialTexts,
    modTexts as simplifiedChineseModTexts,
} from "./catalog-presentations/zh-Hans";
import { presentations as simplifiedChinese } from "./catalog-presentations/zh-Hans-corrections";
import {
    batteryTexts as arabicBatteryTexts,
    materialTexts as arabicMaterialTexts,
    modTexts as arabicModTexts,
} from "./catalog-presentations/ar";
import { presentations as arabic } from "./catalog-presentations/ar-corrections";
import {
    batteryTexts as spanishBatteryTexts,
    materialTexts as spanishMaterialTexts,
    modTexts as spanishModTexts,
} from "./catalog-presentations/es";
import { presentations as spanish } from "./catalog-presentations/es-corrections";
import {
    batteryTexts as latinAmericanSpanishBatteryTexts,
    materialTexts as latinAmericanSpanishMaterialTexts,
    modTexts as latinAmericanSpanishModTexts,
    presentations as latinAmericanSpanish,
} from "./catalog-presentations/es-419-corrections";
import {
    batteryTexts as frenchBatteryTexts,
    materialTexts as frenchMaterialTexts,
    modTexts as frenchModTexts,
} from "./catalog-presentations/fr";
import { presentations as french } from "./catalog-presentations/fr-corrections";
import {
    batteryTexts as polishBatteryTexts,
    materialTexts as polishMaterialTexts,
    modTexts as polishModTexts,
} from "./catalog-presentations/pl";
import { presentations as polish } from "./catalog-presentations/pl-corrections";
import {
    batteryTexts as ukrainianBatteryTexts,
    materialTexts as ukrainianMaterialTexts,
    modTexts as ukrainianModTexts,
} from "./catalog-presentations/uk";
import { presentations as ukrainian } from "./catalog-presentations/uk-corrections";
import {
    batteryTexts as italianBatteryTexts,
    materialTexts as italianMaterialTexts,
    modTexts as italianModTexts,
} from "./catalog-presentations/it";
import { presentations as italian } from "./catalog-presentations/it-corrections";
import {
    batteryTexts as vietnameseBatteryTexts,
    materialTexts as vietnameseMaterialTexts,
    modTexts as vietnameseModTexts,
} from "./catalog-presentations/vi";
import { presentations as vietnamese } from "./catalog-presentations/vi-corrections";
import {
    batteryTexts as germanBatteryTexts,
    materialTexts as germanMaterialTexts,
    modTexts as germanModTexts,
} from "./catalog-presentations/de";
import { presentations as german } from "./catalog-presentations/de-corrections";
import {
    batteryTexts as swedishBatteryTexts,
    materialTexts as swedishMaterialTexts,
    modTexts as swedishModTexts,
} from "./catalog-presentations/sv";
import { presentations as swedish } from "./catalog-presentations/sv-corrections";
import {
    batteryTexts as danishBatteryTexts,
    materialTexts as danishMaterialTexts,
    modTexts as danishModTexts,
} from "./catalog-presentations/da";
import { presentations as danish } from "./catalog-presentations/da-corrections";
import {
    batteryTexts as icelandicBatteryTexts,
    materialTexts as icelandicMaterialTexts,
    modTexts as icelandicModTexts,
} from "./catalog-presentations/is";
import { presentations as icelandic } from "./catalog-presentations/is-corrections";
import {
    batteryTexts as hindiBatteryTexts,
    materialTexts as hindiMaterialTexts,
    modTexts as hindiModTexts,
} from "./catalog-presentations/hi";
import { presentations as hindi } from "./catalog-presentations/hi-corrections";
import {
    batteryTexts as bengaliBatteryTexts,
    materialTexts as bengaliMaterialTexts,
    modTexts as bengaliModTexts,
    presentations as bengali,
} from "./catalog-presentations/bn-corrections";
import {
    batteryTexts as portugueseBatteryTexts,
    materialTexts as portugueseMaterialTexts,
    modTexts as portugueseModTexts,
} from "./catalog-presentations/pt";
import { presentations as portuguese } from "./catalog-presentations/pt-corrections";
import {
    batteryTexts as portugueseBrazilianBatteryTexts,
    materialTexts as portugueseBrazilianMaterialTexts,
    modTexts as portugueseBrazilianModTexts,
} from "./catalog-presentations/pt-BR";
import { presentations as portugueseBrazilian } from "./catalog-presentations/pt-BR-corrections";
import {
    batteryTexts as japaneseBatteryTexts,
    materialTexts as japaneseMaterialTexts,
    modTexts as japaneseModTexts,
} from "./catalog-presentations/ja";
import { presentations as japanese } from "./catalog-presentations/ja-corrections";
import {
    batteryTexts as koreanBatteryTexts,
    materialTexts as koreanMaterialTexts,
    modTexts as koreanModTexts,
} from "./catalog-presentations/ko";
import { presentations as korean } from "./catalog-presentations/ko-corrections";
import {
    batteryTexts as greekBatteryTexts,
    materialTexts as greekMaterialTexts,
    modTexts as greekModTexts,
} from "./catalog-presentations/el";
import { presentations as greek } from "./catalog-presentations/el-corrections";
import {
    batteryTexts as turkishBatteryTexts,
    materialTexts as turkishMaterialTexts,
    modTexts as turkishModTexts,
} from "./catalog-presentations/tr";
import { presentations as turkish } from "./catalog-presentations/tr-corrections";
import { presentations as indonesian } from "./catalog-presentations/id-corrections";
import {
    batteryTexts as indonesianBatteryTexts,
    materialTexts as indonesianMaterialTexts,
    modTexts as indonesianModTexts,
} from "./catalog-presentations/id";

export const catalogPresentations: Readonly<Record<Locale, CatalogPresentationSet>> = {
    "en": english,
    "nb": bokmaal,
    "nn": nynorsk,
    "zh-Hans": simplifiedChinese,
    "ar": arabic,
    "es": spanish,
    "es-419": latinAmericanSpanish,
    "fr": french,
    "pl": polish,
    "uk": ukrainian,
    "it": italian,
    "vi": vietnamese,
    "de": german,
    "sv": swedish,
    "da": danish,
    "is": icelandic,
    "hi": hindi,
    "bn": bengali,
    "pt": portuguese,
    "pt-BR": portugueseBrazilian,
    "ja": japanese,
    "ko": korean,
    "el": greek,
    "tr": turkish,
    "id": indonesian,
    fi: finnish,
};

export const batteryTextTranslations: Readonly<Record<Locale, BatteryTextDictionary>> = {
    "en": englishBatteryTexts,
    "nb": bokmaalBatteryTexts,
    "nn": nynorskBatteryTexts,
    "zh-Hans": simplifiedChineseBatteryTexts,
    "ar": arabicBatteryTexts,
    "es": spanishBatteryTexts,
    "es-419": latinAmericanSpanishBatteryTexts,
    "fr": frenchBatteryTexts,
    "pl": polishBatteryTexts,
    "uk": ukrainianBatteryTexts,
    "it": italianBatteryTexts,
    "vi": vietnameseBatteryTexts,
    "de": germanBatteryTexts,
    "sv": swedishBatteryTexts,
    "da": danishBatteryTexts,
    "is": icelandicBatteryTexts,
    "hi": hindiBatteryTexts,
    "bn": bengaliBatteryTexts,
    "pt": portugueseBatteryTexts,
    "pt-BR": portugueseBrazilianBatteryTexts,
    "ja": japaneseBatteryTexts,
    "ko": koreanBatteryTexts,
    "el": greekBatteryTexts,
    "tr": turkishBatteryTexts,
    "id": indonesianBatteryTexts,
    fi: fiBatteryTexts,
};

export const materialTextTranslations: Readonly<Record<Locale, MaterialTextDictionary>> = {
    "en": englishMaterialTexts,
    "nb": bokmaalMaterialTexts,
    "nn": nynorskMaterialTexts,
    "zh-Hans": simplifiedChineseMaterialTexts,
    "ar": arabicMaterialTexts,
    "es": spanishMaterialTexts,
    "es-419": latinAmericanSpanishMaterialTexts,
    "fr": frenchMaterialTexts,
    "pl": polishMaterialTexts,
    "uk": ukrainianMaterialTexts,
    "it": italianMaterialTexts,
    "vi": vietnameseMaterialTexts,
    "de": germanMaterialTexts,
    "sv": swedishMaterialTexts,
    "da": danishMaterialTexts,
    "is": icelandicMaterialTexts,
    "hi": hindiMaterialTexts,
    "bn": bengaliMaterialTexts,
    "pt": portugueseMaterialTexts,
    "pt-BR": portugueseBrazilianMaterialTexts,
    "ja": japaneseMaterialTexts,
    "ko": koreanMaterialTexts,
    "el": greekMaterialTexts,
    "tr": turkishMaterialTexts,
    "id": indonesianMaterialTexts,
    fi: fiMaterialTexts,
};
export const modTextTranslations: Readonly<Record<Locale, ModTextDictionary>> = {
    "en": englishModTexts,
    "nb": bokmaalModTexts,
    "nn": nynorskModTexts,
    "zh-Hans": simplifiedChineseModTexts,
    "ar": arabicModTexts,
    "es": spanishModTexts,
    "es-419": latinAmericanSpanishModTexts,
    "fr": frenchModTexts,
    "pl": polishModTexts,
    "uk": ukrainianModTexts,
    "it": italianModTexts,
    "vi": vietnameseModTexts,
    "de": germanModTexts,
    "sv": swedishModTexts,
    "da": danishModTexts,
    "is": icelandicModTexts,
    "hi": hindiModTexts,
    "bn": bengaliModTexts,
    "pt": portugueseModTexts,
    "pt-BR": portugueseBrazilianModTexts,
    "ja": japaneseModTexts,
    "ko": koreanModTexts,
    "el": greekModTexts,
    "tr": turkishModTexts,
    "id": indonesianModTexts,
    fi: fiModTexts,
};
export const catalogPresentationFor = (
    locale: Locale,
    category: CatalogCategory,
    id: string,
): CatalogPresentation => {
    const presentation = catalogPresentations[locale][category][id];
    if (!presentation) throw new Error(`Missing ${locale} catalog presentation for ${category}:${id}`);
    return presentation;
};

const catalogIds: Readonly<Record<CatalogCategory, readonly string[]>> = {
    concepts: concepts.map((item) => item.id),
    materials: materials.map((item) => item.id),
    batteries: batteryPresets.map((item) => item.id),
    mods: builtInPresets.map((item) => item.id),
};

export const missingCatalogPresentationKeys = (): readonly string[] => Object.entries(catalogIds).flatMap(
    ([category, ids]) => Object.keys(catalogPresentations).flatMap((locale) => ids
        .filter((id) => catalogPresentations[locale as Locale][category as CatalogCategory][id] === undefined)
        .map((id) => `${locale}:${category}:${id}`)),
);

export const assertCatalogPresentationCoverage = (): void => {
    const missing = missingCatalogPresentationKeys();
    if (missing.length > 0) throw new Error(`Missing catalog presentation coverage: ${missing.join(", ")}`);
};

assertCatalogPresentationCoverage();
