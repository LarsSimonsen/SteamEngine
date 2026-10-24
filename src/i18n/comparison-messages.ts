import { messages as fibatteries } from "./comparison-messages/batteries/fi";
import { messages as fimaterials } from "./comparison-messages/materials/fi";
import { messages as fimods } from "./comparison-messages/mods/fi";
import type { Locale } from "./locales";
import { messages as en } from "./comparison-messages/batteries/en";
import { messages as nb } from "./comparison-messages/batteries/nb";
import { messages as nn } from "./comparison-messages/batteries/nn";
import { messages as zhHans } from "./comparison-messages/batteries/zh-Hans";
import { messages as ar } from "./comparison-messages/batteries/ar";
import { messages as es } from "./comparison-messages/batteries/es";
import {
    batteries as es419,
    materials as materialEs419,
    mods as modEs419,
} from "./comparison-messages/es-419-corrections";
import { messages as fr } from "./comparison-messages/batteries/fr";
import { messages as pl } from "./comparison-messages/batteries/pl";
import { messages as uk } from "./comparison-messages/batteries/uk";
import { messages as it } from "./comparison-messages/batteries/it";
import { messages as vi } from "./comparison-messages/batteries/vi";
import { messages as de } from "./comparison-messages/batteries/de";
import { messages as sv } from "./comparison-messages/batteries/sv";
import { messages as da } from "./comparison-messages/batteries/da";
import { messages as is } from "./comparison-messages/batteries/is";
import { messages as hi } from "./comparison-messages/batteries/hi";
import { messages as bn } from "./comparison-messages/batteries/bn";
import { messages as pt } from "./comparison-messages/batteries/pt";
import { messages as ptBR } from "./comparison-messages/batteries/pt-BR";
import { messages as ja } from "./comparison-messages/batteries/ja";
import { messages as ko } from "./comparison-messages/batteries/ko";
import { messages as el } from "./comparison-messages/batteries/el";
import { messages as tr } from "./comparison-messages/batteries/tr";
import { messages as modEn } from "./comparison-messages/mods/en";
import { messages as modNb } from "./comparison-messages/mods/nb";
import { messages as modNn } from "./comparison-messages/mods/nn";
import { messages as modZhHans } from "./comparison-messages/mods/zh-Hans";
import { messages as modAr } from "./comparison-messages/mods/ar";
import { messages as modEs } from "./comparison-messages/mods/es";
import { messages as modFr } from "./comparison-messages/mods/fr";
import { messages as modPl } from "./comparison-messages/mods/pl";
import { messages as modUk } from "./comparison-messages/mods/uk";
import { messages as modIt } from "./comparison-messages/mods/it";
import { messages as modVi } from "./comparison-messages/mods/vi";
import { messages as modDe } from "./comparison-messages/mods/de";
import { messages as modSv } from "./comparison-messages/mods/sv";
import { messages as modDa } from "./comparison-messages/mods/da";
import { messages as modIs } from "./comparison-messages/mods/is";
import { messages as modHi } from "./comparison-messages/mods/hi";
import { mods as modBn } from "./comparison-messages/bn-corrections";
import { messages as modPt } from "./comparison-messages/mods/pt";
import { messages as modPtBR } from "./comparison-messages/mods/pt-BR";
import { messages as modJa } from "./comparison-messages/mods/ja";
import { messages as modKo } from "./comparison-messages/mods/ko";
import { messages as modEl } from "./comparison-messages/mods/el";
import { messages as modTr } from "./comparison-messages/mods/tr";
import { messages as materialEn } from "./comparison-messages/materials/en";
import { messages as materialNb } from "./comparison-messages/materials/nb";
import { messages as materialNn } from "./comparison-messages/materials/nn";
import { messages as materialZhHans } from "./comparison-messages/materials/zh-Hans";
import { messages as materialAr } from "./comparison-messages/materials/ar";
import { messages as materialEs } from "./comparison-messages/materials/es";
import { messages as materialFr } from "./comparison-messages/materials/fr";
import { messages as materialPl } from "./comparison-messages/materials/pl";
import { messages as materialUk } from "./comparison-messages/materials/uk";
import { messages as materialIt } from "./comparison-messages/materials/it";
import { messages as materialVi } from "./comparison-messages/materials/vi";
import { messages as materialDe } from "./comparison-messages/materials/de";
import { messages as materialSv } from "./comparison-messages/materials/sv";
import { messages as materialDa } from "./comparison-messages/materials/da";
import { messages as materialIs } from "./comparison-messages/materials/is";
import { messages as materialHi } from "./comparison-messages/materials/hi";
import { messages as materialBn } from "./comparison-messages/materials/bn";
import { messages as materialPt } from "./comparison-messages/materials/pt";
import { messages as materialPtBR } from "./comparison-messages/materials/pt-BR";
import { messages as materialJa } from "./comparison-messages/materials/ja";
import { messages as materialKo } from "./comparison-messages/materials/ko";
import { messages as materialEl } from "./comparison-messages/materials/el";
import { messages as materialTr } from "./comparison-messages/materials/tr";
import { messages as id } from "./comparison-messages/batteries/id";
import { messages as modId } from "./comparison-messages/mods/id";
import { messages as materialId } from "./comparison-messages/materials/id";

export type BatteryComparisonMessages = Readonly<Record<string, string>>;
export type ModComparisonMessages = Readonly<{
    readonly platform: string;
    readonly powerLimits: string;
    readonly atomizerRange: string;
    readonly category: string;
    readonly batteryConfiguration: string;
    readonly baseProfile: string;
    readonly invalidSelection: string;
    readonly sameSelection: string;
    readonly platformDiffers: string;
    readonly platformUnknown: string;
    readonly noSafetyFindings: string;
    readonly chooseMod: string;
    readonly firstMod: string;
    readonly secondMod: string;
    readonly swap: string;
}>;
export type MaterialComparisonMessages = Readonly<{
    readonly title: string;
    readonly description: string;
    readonly chooseMaterial: string;
    readonly firstMaterial: string;
    readonly secondMaterial: string;
    readonly swap: string;
    readonly identity: string;
    readonly name: string;
    readonly electricalProperties: string;
    readonly temperatureBehavior: string;
    readonly physicalProperties: string;
    readonly temperatureControlProfile: string;
    readonly profileAvailable: string;
    readonly profileUnavailable: string;
    readonly thermalConductivity: string;
    readonly invalidSelection: string;
    readonly sameSelection: string;
    readonly capabilityDiffers: string;
    readonly noSafetyNote: string;
}>;
export type ComparisonMessages = Readonly<{
    readonly batteries: BatteryComparisonMessages;
    readonly mods: ModComparisonMessages;
    readonly materials: MaterialComparisonMessages;
}>;

export const comparisonMessages: Readonly<Record<Locale, ComparisonMessages>> = {
    en: { batteries: en, mods: modEn, materials: materialEn },
    nb: { batteries: nb, mods: modNb, materials: materialNb },
    nn: { batteries: nn, mods: modNn, materials: materialNn },
    "zh-Hans": { batteries: zhHans, mods: modZhHans, materials: materialZhHans },
    ar: { batteries: ar, mods: modAr, materials: materialAr },
    es: { batteries: es, mods: modEs, materials: materialEs },
    "es-419": { batteries: es419, mods: modEs419, materials: materialEs419 },
    fr: { batteries: fr, mods: modFr, materials: materialFr },
    pl: { batteries: pl, mods: modPl, materials: materialPl },
    uk: { batteries: uk, mods: modUk, materials: materialUk },
    it: { batteries: it, mods: modIt, materials: materialIt },
    vi: { batteries: vi, mods: modVi, materials: materialVi },
    de: { batteries: de, mods: modDe, materials: materialDe },
    sv: { batteries: sv, mods: modSv, materials: materialSv },
    da: { batteries: da, mods: modDa, materials: materialDa },
    is: { batteries: is, mods: modIs, materials: materialIs },
    hi: { batteries: hi, mods: modHi, materials: materialHi },
    bn: { batteries: bn, mods: modBn, materials: materialBn },
    pt: { batteries: pt, mods: modPt, materials: materialPt },
    "pt-BR": { batteries: ptBR, mods: modPtBR, materials: materialPtBR },
    ja: { batteries: ja, mods: modJa, materials: materialJa },
    ko: { batteries: ko, mods: modKo, materials: materialKo },
    el: { batteries: el, mods: modEl, materials: materialEl },
    tr: { batteries: tr, mods: modTr, materials: materialTr },
    id: { batteries: id, mods: modId, materials: materialId },
    fi: { batteries: fibatteries, mods: fimods, materials: fimaterials },
};

export const comparisonMessagesFor = (locale: Locale): ComparisonMessages => comparisonMessages[locale];

export const comparisonMessageParityIssues = (): readonly string[] => {
    const sourceKeys = Object.keys(en).sort();
    const modSourceKeys = Object.keys(modEn).sort();
    const materialSourceKeys = Object.keys(materialEn).sort();
    return (Object.keys(comparisonMessages) as Locale[]).flatMap((locale) => [
        ...(JSON.stringify(Object.keys(comparisonMessages[locale].batteries).sort()) === JSON.stringify(sourceKeys)
            ? [] : [`${locale}:batteries`]),
        ...(JSON.stringify(Object.keys(comparisonMessages[locale].mods).sort()) === JSON.stringify(modSourceKeys)
            ? [] : [`${locale}:mods`]),
        ...(JSON.stringify(Object.keys(comparisonMessages[locale].materials).sort())
            === JSON.stringify(materialSourceKeys) ? [] : [`${locale}:materials`]),
    ]);
};
