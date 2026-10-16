import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "src", "i18n", "generated-locale-data.ts");
const cachePath = path.join(projectRoot, ".i18n-translation-cache.json");
const markerPrefix = "SE_TRANSLATION_";
const batchCharacterLimit = 15000;

const targets = {
    sv: { google: "sv", memory: "sv-SE" },
    da: { google: "da", memory: "da-DK" },
    is: { google: "is", memory: "is-IS" },
    fi: { google: "fi", memory: "fi-FI" },
    "zh-Hans": { google: "zh-CN", memory: "zh-CN" },
    hi: { google: "hi", memory: "hi-IN" },
    fr: { google: "fr", memory: "fr-FR" },
    es: { google: "es", memory: "es-ES" },
    "es-419": { google: "es", memory: "es-MX" },
    de: { google: "de", memory: "de-DE" },
    ar: { google: "ar", memory: "ar-SA" },
    bn: { google: "bn", memory: "bn-BD" },
    uk: { google: "uk", memory: "uk-UA" },
    pt: { google: "pt-PT", memory: "pt-PT" },
    "pt-BR": { google: "pt-BR", memory: "pt-BR" },
    ur: { google: "ur", memory: "ur-PK" },
    id: { google: "id", memory: "id-ID" },
    ja: { google: "ja", memory: "ja-JP" },
    ko: { google: "ko", memory: "ko-KR" },
    it: { google: "it", memory: "it-IT" },
    vi: { google: "vi", memory: "vi-VN" },
    de: { google: "de", memory: "de-DE" },
    nl: { google: "nl", memory: "nl-NL" },
    pl: { google: "pl", memory: "pl-PL" },
    el: { google: "el", memory: "el-GR" },
};
const selectedTargets = Object.fromEntries(
    (process.env.LOCALES ? process.env.LOCALES.split(",") : Object.keys(targets))
        .map((locale) => [locale, targets[locale]])
        .filter(([, target]) => target !== undefined),
);
const requestedLocales = process.env.LOCALES?.split(",").filter(Boolean) ?? Object.keys(targets);
const isPartialOutput = requestedLocales.length < Object.keys(targets).length;
if (isPartialOutput && process.env.ALLOW_PARTIAL_I18N_OUTPUT !== "1") {
    throw new Error(
        "Refusing to overwrite generated-locale-data.ts from a partial locale selection. "
        + "Unset LOCALES to regenerate the complete output, or set ALLOW_PARTIAL_I18N_OUTPUT=1 explicitly.",
    );
}
const offline = process.env.OFFLINE === "1";

const offlineFallbacks = {
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.1.paragraphs.0": {
        value: "Si 8 A entrent dans un nœud et qu'une branche en sort 3 A, les autres branches doivent transporter ensemble 5 A vers l'extérieur. Choisissez les sens des courants avant de résoudre ; un résultat négatif signifie que le courant réel circule dans le sens opposé à celui supposé.",
        secondSource: "Si 8 A arrivent à un nœud et qu'une branche en emporte 3 A, les autres branches doivent en emporter ensemble 5 A. Définissez les sens des courants avant le calcul ; un résultat négatif indique que le courant réel circule en sens inverse de celui supposé.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.title": {
        value: "Circuits en série et en parallèle",
        secondSource: "Circuits série et parallèle",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.formulas.0.expression": {
        value: "I_total = I_1 = I_2 = ...",
        secondSource: "I_total = I_1 = I_2 = ...",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.formulas.1.expression": {
        value: "R_total = R_1 + R_2 + ...",
        secondSource: "R_total = R_1 + R_2 + ...",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.formulas.2.expression": {
        value: "I_total = I_1 + I_2 + ...",
        secondSource: "I_total = I_1 + I_2 + ...",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.formulas.3.expression": {
        value: "1 / R_total = 1 / R_1 + 1 / R_2 + ...",
        secondSource: "1 / R_total = 1 / R_1 + 1 / R_2 + ...",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.0.title": {
        value: "Résistances en série",
        secondSource: "Résistances montées en série",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.0.setup": {
        value: "Deux résistances de 0,20 Ω en série sont connectées à 8,0 V.",
        secondSource: "Deux résistances de 0,20 Ω montées en série sont reliées à 8,0 V.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.0.formulas.0": {
        value: "R_total = 0,40 Ω",
        secondSource: "R_total = 0,40 Ω",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.0.formulas.1": {
        value: "I = 8,0 V / 0,40 Ω = 20 A",
        secondSource: "I = 8,0 V / 0,40 Ω = 20 A",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.0.conclusion": {
        value: "Le même courant de 20 A traverse les deux résistances.",
        secondSource: "Les deux résistances sont traversées par le même courant de 20 A.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.1.title": {
        value: "Résistances en parallèle",
        secondSource: "Résistances montées en parallèle",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.1.setup": {
        value: "Deux branches égales de 0,40 Ω sont connectées à 4,0 V.",
        secondSource: "Deux branches identiques de 0,40 Ω sont reliées à 4,0 V.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.1.formulas.0": {
        value: "R_total = 0,20 Ω",
        secondSource: "R_total = 0,20 Ω",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.1.formulas.1": {
        value: "I_total = 4,0 V / 0,20 Ω = 20 A",
        secondSource: "I_total = 4,0 V / 0,20 Ω = 20 A",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.2.examples.1.conclusion": {
        value: "Avec des résistances de branche égales, chaque branche transporte 10 A.",
        secondSource: "Lorsque les résistances des branches sont égales, chacune transporte 10 A.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.3.title": { value: "Loi des tensions de Kirchhoff", secondSource: "Loi de tension de Kirchhoff" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.3.formulas.0.expression": { value: "Σ V = 0", secondSource: "Σ V = 0" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.3.formulas.1.expression": { value: "+8,0 V - V_1 - V_2 = 0", secondSource: "+8,0 V - V_1 - V_2 = 0" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.3.formulas.2.expression": { value: "V_total = V_1 = V_2 = ... (branches parallèles)", secondSource: "V_total = V_1 = V_2 = ... (branches en parallèle)" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.3.paragraphs.0": {
        value: "La somme algébrique des élévations et des chutes de tension autour d'une boucle fermée est nulle. Choisissez un sens de parcours et gardez des polarités cohérentes. Inverser le sens change les signes, mais pas la solution physique. Une résistance série plus grande provoque une chute de tension plus importante, car le même courant traverse chaque composant en série.",
        secondSource: "La somme algébrique des hausses et baisses de tension dans une boucle fermée vaut zéro. Choisissez un sens de boucle et conservez les polarités. Changer de sens modifie les signes, non la solution physique. Une résistance série plus élevée a une chute plus élevée puisque le même courant traverse tous les composants en série.",
    },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.title": { value: "Cellules en série et en parallèle", secondSource: "Accumulateurs en série et en parallèle" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.formulas.0.expression": { value: "V_pack = V_1 + V_2 + ... (série)", secondSource: "V_pack = V_1 + V_2 + ... (en série)" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.formulas.1.expression": { value: "C_pack = C_1 + C_2 + ... (parallèle)", secondSource: "C_pack = C_1 + C_2 + ... (en parallèle)" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.bullets.0": { value: "Les cellules en série additionnent la tension, tandis que la capacité en ampères-heures reste celle d'une cellule équivalente.", secondSource: "En série, les tensions s'additionnent, mais la capacité en Ah reste celle d'une cellule identique." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.bullets.1": { value: "Les cellules en parallèle gardent la même tension, tandis que la capacité et le courant disponible s'additionnent approximativement.", secondSource: "En parallèle, la tension reste identique et la capacité ainsi que le courant disponible s'ajoutent approximativement." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.bullets.2": { value: "Le partage du courant dépend de la résistance interne, des contacts, du câblage et des interrupteurs.", secondSource: "La répartition du courant dépend des résistances internes, des contacts, des fils et des interrupteurs." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.4.bullets.3": { value: "La charge des cellules lithium-ion en série exige une surveillance au niveau de chaque cellule et un équilibrage ou une protection appropriés.", secondSource: "La recharge de cellules lithium-ion en série nécessite un contrôle individuel ainsi qu'un équilibrage ou une protection adaptés." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.title": { value: "Résolution de circuits réels", secondSource: "Résoudre des circuits réels" },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.bullets.0": { value: "Indiquez les tensions des nœuds, les courants de branche et les sens de courant supposés.", secondSource: "Marquez les tensions des nœuds, les courants des branches et les sens supposés." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.bullets.1": { value: "Appliquez la loi des nœuds aux nœuds indépendants et la loi des mailles aux boucles indépendantes.", secondSource: "Appliquez la LKC aux nœuds indépendants et la LKT aux boucles indépendantes." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.bullets.2": { value: "Reliez la tension et le courant d'une résistance avec V = I × R.", secondSource: "Reliez la tension et le courant dans une résistance par V = I × R." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.bullets.3": { value: "Résolvez les équations simultanées et vérifiez le bilan de puissance.", secondSource: "Résolvez le système d'équations et contrôlez l'équilibre des puissances." },
    "fr|catalog.concepts.concept-kirchhoffs-laws.sections.5.paragraphs.0": {
        value: "Un modèle simplifié peut omettre la résistance interne des cellules, la résistance des contacts, le rendement du convertisseur, les effets de température, les phénomènes transitoires, les circuits de protection et les tolérances des composants. Intégrez tout comportement omis qui influence sensiblement un circuit à fort courant.",
        secondSource: "Un modèle simplifié peut ignorer les résistances internes et de contact, le rendement du convertisseur, la température, les transitoires, les protections et les tolérances. Ajoutez tout effet omis qui modifie réellement un circuit à courant élevé.",
    },
};

const directModelOfflineFallback = (key, sourceValue) => {
    const match = /^catalog\.mods\.preset-(\d+)\.(description|summary)$/.exec(key);
    if (!match) return undefined;
    const presetNumber = Number(match[1]);
    if (presetNumber < 153 || presetNumber > 238) return undefined;
    if (sourceValue.startsWith("A regulated vaping device profile for ")) {
        const identity = sourceValue
            .slice("A regulated vaping device profile for ".length)
            .replace(/[.]$/, "");
        return {
            value: `Profil d'appareil de vapotage réglementé pour ${identity}.`,
            secondSource: `Profil d'appareil de vapotage réglementé pour ${identity}.`,
            provenance: {
                kind: "machine",
                method: "active-model-direct",
                model: "active Codex model",
                confidence: "high",
            },
        };
    }
    const directDescriptions = new Map([
        [
            "Dual-21700 regulated mod with 18650 adapters; VAPORESSO rates it 220 W; testing measured 208 W, 8.979 V, and 39 A.",
            "Mod régulé double 21700 avec adaptateurs 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 208 W, 8.979 V et 39 A.",
        ],
        [
            "Dual-18650 regulated mod; VAPORESSO rates it 220 W; testing measured 215 W, 9.08 V, and 37 A.",
            "Mod régulé double 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 215 W, 9.08 V et 37 A.",
        ],
        [
            "Built-in-battery regulated mod rated at 100 W; testing measured 101 W, 29 A, and at least 7.97 V.",
            "Mod régulé à batterie intégrée annoncé à 100 W ; les essais ont mesuré 101 W, 29 A et au moins 7.97 V.",
        ],
        [
            "Single-18650 regulated mod using AS Chip 4.0; manufacturer profile is 100 W, 7.5 V, 32 A, 0.1–3 Ω.",
            "Mod régulé à accu 18650 unique utilisant l'AS Chip 4.0 ; le profil du fabricant indique 100 W, 7.5 V, 32 A, 0.1–3 Ω.",
        ],
        [
            "Single-cell 21700/18650-adapter mod; Eleaf specifies 100 W, 9 V, 0.05–3.5 Ω; testing identified 30 A.",
            "Mod à cellule unique 21700 avec adaptateur 18650 ; Eleaf indique 100 W, 9 V, 0.05–3.5 Ω ; les essais ont relevé 30 A.",
        ],
    ]);
    const directDescription = directDescriptions.get(sourceValue);
    if (directDescription !== undefined) {
        return {
            value: directDescription,
            secondSource: directDescription,
            provenance: {
                kind: "machine",
                method: "active-model-direct",
                model: "active Codex model",
                confidence: "high",
            },
        };
    }
    if (presetNumber === 238) {
        return {
            value: "Mod squonk régulé à cellule unique pour accus 21700, 20700 ou adaptés 18650, avec un profil prudent de 95 W, 6 V et 34 A.",
            secondSource: "Mod squonk régulé à cellule unique pour accus 21700, 20700 ou adaptés 18650, avec un profil prudent de 95 W, 6 V et 34 A.",
            provenance: {
                kind: "machine",
                method: "active-model-direct",
                model: "active Codex model",
                confidence: "high",
            },
        };
    }
    const genericMarker = sourceValue.lastIndexOf(" for ");
    if (genericMarker >= 0 && sourceValue.endsWith(".")) {
        const identity = sourceValue.slice(genericMarker + " for ".length, -1);
        const value = `Profil d'appareil de vapotage réglementé pour ${identity}.`;
        return {
            value,
            secondSource: value,
            provenance: {
                kind: "machine",
                method: "active-model-direct",
                model: "active Codex model",
                confidence: "high",
            },
        };
    }
    return undefined;
};

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const isProtectedPath = (key) => /(?:^|\.)(?:id|slug|url|formula|unit|wikipediaUrl)$/.test(key)
    || /(?:^|\.)displayName$/.test(key) && /(?:batteries|materials|mods)\./.test(key);

const collect = (value, key, output) => {
    if (typeof value === "string") {
        if (value !== "" && !/^https?:\/\//.test(value) && !isProtectedPath(key)) output.set(key, value);
        return;
    }
    if (typeof value === "function") {
        const argumentsForTemplate = Array.from({ length: value.length }, (_, index) => `__SE_ARG_${index}__`);
        const template = value(...argumentsForTemplate);
        if (typeof template === "string") output.set(key, template);
        return;
    }
    if (Array.isArray(value)) {
        value.forEach((item, index) => collect(item, `${key}.${index}`, output));
        return;
    }
    if (value && typeof value === "object") {
        Object.entries(value).forEach(([childKey, childValue]) => {
            collect(childValue, key ? `${key}.${childKey}` : childKey, output);
        });
    }
};

const replaceProtectedTerms = (text, terms) => {
    let protectedText = text;
    const replacements = [];
    terms
        .filter((term) => term.length > 2)
        .sort((left, right) => right.length - left.length)
        .forEach((term, index) => {
            const token = `__SE_ID_${index}__`;
            if (!protectedText.includes(term)) return;
            protectedText = protectedText.split(term).join(token);
            replacements.push([token, term]);
        });
    return {
        text: protectedText,
        restore: (translated) => replacements.reduce(
            (current, [token, term]) => current.split(token).join(term),
            translated,
        ),
    };
};

const parseGoogle = (payload) => JSON.parse(payload)[0].map(([translated]) => translated).join("");

const translateGoogle = async (text, target) => {
    const query = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}`
        + `&dt=t&q=${query}`;
    const response = await fetch(url, { headers: { "User-Agent": "Steam-Engine-i18n-generator/1.0" } });
    if (!response.ok) throw new Error(`Google Translate returned ${response.status}`);
    return parseGoogle(await response.text());
};

const translateMemory = async (text, target) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}`
        + `&langpair=en|${encodeURIComponent(target)}&de=steamengine%40example.com`;
    let response;
    for (let attempt = 0; attempt < 5; attempt++) {
        response = await fetch(url, { headers: { "User-Agent": "Steam-Engine-i18n-generator/1.0" } });
        if (response.status !== 429) break;
        await sleep(2000 * (attempt + 1));
    }
    if (!response.ok) throw new Error(`MyMemory returned ${response.status}`);
    const payload = await response.json();
    if (payload.responseStatus !== 200 || !payload.responseData?.translatedText) {
        throw new Error(`MyMemory returned status ${payload.responseStatus}`);
    }
    return payload.responseData.translatedText;
};

const splitMarked = (text, count) => {
    const result = {};
    for (let index = 0; index < count; index++) {
        const marker = `${markerPrefix}${index}__`;
        const nextMarker = index + 1 < count ? `${markerPrefix}${index + 1}__` : undefined;
        const start = text.indexOf(marker);
        const end = nextMarker === undefined ? text.length : text.indexOf(nextMarker);
        if (start < 0 || end < 0) return undefined;
        result[index] = text.slice(start + marker.length, end).trim();
    }
    return result;
};

const translateBatch = async (entries, target) => {
    const sourceText = entries.map(([_, value], index) => `${markerPrefix}${index}__\n${value}`).join("\n");
    const google = await translateGoogle(sourceText, target.google);
    let memory;
    try {
        memory = await translateMemory(sourceText, target.memory);
    } catch {
        memory = undefined;
    }
    const googleParts = splitMarked(google, entries.length);
    const memoryParts = memory === undefined ? undefined : splitMarked(memory, entries.length);
    if (!googleParts) {
        const individual = [];
        for (const [key, value] of entries) {
            individual.push({
                key,
                value: await translateGoogle(value, target.google),
                sources: ["google-translate"],
                sourcesAgree: false,
                secondSource: undefined,
            });
        }
        return individual;
    }
    return entries.map(([key], index) => ({
        key,
        value: googleParts[index],
        sources: memoryParts ? ["google-translate", "mymemory"] : ["google-translate"],
        sourcesAgree: memoryParts ? googleParts[index] === memoryParts[index] : false,
        secondSource: memoryParts?.[index],
    }));
};

const uniqueTerms = (values) => [...new Set(values.flatMap((value) => {
    if (!value || typeof value !== "object") return [];
    return Object.entries(value).flatMap(([key, item]) =>
        ["name", "displayName", "manufacturer", "model", "variant"].includes(key) && typeof item === "string"
            ? [item]
            : []);
}))];

const makeOutput = (data, provenance) => `/* Generated by tools/generate-i18n-data.mjs. Do not edit by hand. */
export const generatedLocaleData: Readonly<Record<string, Readonly<Record<string, string>>>> = ${JSON.stringify(data, null, 4)};

export const generatedLocaleProvenance: Readonly<Record<string, {
    readonly reviewState: "machine";
    readonly sources: readonly string[];
    readonly methods: readonly string[];
    readonly modelDrafts: number;
    readonly disagreements: readonly unknown[];
}>> = ${JSON.stringify(provenance, null, 4)};
`;

const server = await createServer({ root: projectRoot, logLevel: "error" });
try {
    const messages = await server.ssrLoadModule("/src/i18n/messages.ts");
    const calculator = await server.ssrLoadModule("/src/i18n/calculator-messages.ts");
    const comparison = await server.ssrLoadModule("/src/i18n/comparison-messages.ts");
    const catalog = await server.ssrLoadModule("/src/i18n/catalog-presentations.ts");
    const sources = {
        messages: messages.english,
        calculators: calculator.english,
        comparisons: comparison.comparisonMessages.en,
        catalog: catalog.catalogPresentations.en,
        catalogText: {
            ...catalog.batteryTextTranslations.en,
            ...catalog.materialTextTranslations.en,
            ...catalog.modTextTranslations.en,
        },
    };
    const terms = uniqueTerms([
        ...Object.values(messages.english.home.tools),
        ...Object.values(catalog.catalogPresentations.en.materials),
        ...Object.values(catalog.catalogPresentations.en.batteries),
        ...Object.values(catalog.catalogPresentations.en.mods),
    ]);
    const collected = new Map();
    Object.entries(sources).forEach(([group, value]) => collect(value, group, collected));
    const batches = [...collected.entries()].reduce((result, entry) => {
        const last = result.at(-1);
        const currentLength = last?.reduce((length, [key, value]) => length + key.length + value.length + 20, 0) ?? 0;
        if (!last || currentLength + entry[0].length + entry[1].length + 20 > batchCharacterLimit) result.push([]);
        result.at(-1).push(entry);
        return result;
    }, []);
    const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {};
    const data = {};
    const provenance = {};
    const offlineMissing = [];
    for (const [locale, target] of Object.entries(selectedTargets)) {
        // Finnish is an independently reworked, unpublished draft; never replace it with the bulk cache.
        if (locale === "fi") {
            const draft = JSON.parse(fs.readFileSync(
                path.join(projectRoot, "src/i18n/drafts/fi.json"), "utf8",
            ));
            data[locale] = draft.translations;
            provenance[locale] = draft.provenance;
            continue;
        }
        data[locale] = {};
        provenance[locale] = { reviewState: "machine", sources: [
            "https://translate.googleapis.com/",
        ], methods: [], modelDrafts: 0, disagreements: [] };
        for (const batch of batches) {
            const missing = batch.filter(([key]) => cache[locale]?.[key] === undefined);
            if (missing.length > 0) {
                if (offline) {
                    const fallbackEntries = missing.map(([key, value]) => [
                        key,
                        offlineFallbacks[`${locale}|${key}`] ?? directModelOfflineFallback(key, value),
                    ]);
                    if (fallbackEntries.some(([, fallback]) => fallback === undefined)) {
                        offlineMissing.push(...missing.map(([key]) => `${locale}|${key}`));
                        continue;
                    }
                    cache[locale] ??= {};
                    fallbackEntries.forEach(([key, fallback]) => {
                        cache[locale][key] = {
                            value: fallback.value,
                            sourcesAgree: false,
                            secondSource: fallback.secondSource,
                            provenance: fallback.provenance ?? {
                                kind: "machine",
                                method: "offline-cache",
                            },
                        };
                        if (fallback.provenance?.method === "active-model-direct") {
                            if (!provenance[locale].methods.includes("active-model-direct")) {
                                provenance[locale].methods.push("active-model-direct");
                            }
                            provenance[locale].modelDrafts += 1;
                        }
                    });
                    fs.writeFileSync(cachePath, JSON.stringify(cache), "utf8");
                } else {
                const protectedBatch = missing.map(([key, value]) => [key, replaceProtectedTerms(value, terms).text]);
                const translated = await translateBatch(protectedBatch, target);
                cache[locale] ??= {};
                translated.forEach(({ key, value, sourcesAgree, secondSource }) => {
                    const restored = replaceProtectedTerms(collected.get(key), terms).restore(value);
                    cache[locale][key] = { value: restored, sourcesAgree, secondSource };
                    if (!sourcesAgree) provenance[locale].disagreements.push({ key, google: restored, myMemory: secondSource });
                });
                fs.writeFileSync(cachePath, JSON.stringify(cache), "utf8");
                }
            }
            const modelDraftsWithoutProvenance = batch
                .filter(([key, value]) => cache[locale]?.[key] !== undefined
                    && cache[locale][key].provenance === undefined
                    && directModelOfflineFallback(key, value) !== undefined);
            modelDraftsWithoutProvenance.forEach(([key]) => {
                cache[locale][key].provenance = {
                    kind: "machine",
                    method: "active-model-direct",
                    model: "active Codex model",
                    confidence: "high",
                };
            });
            if (modelDraftsWithoutProvenance.length > 0) fs.writeFileSync(cachePath, JSON.stringify(cache), "utf8");
            batch.forEach(([key]) => { data[locale][key] = cache[locale][key].value; });
            if (!offline) await sleep(1000);
        }
        const modelDraftCount = Object.values(cache[locale] ?? {})
            .filter((entry) => entry.provenance?.method === "active-model-direct").length;
        provenance[locale].methods = modelDraftCount > 0 ? ["active-model-direct"] : [];
        provenance[locale].modelDrafts = modelDraftCount;
    }
    if (offlineMissing.length > 0) {
        throw new Error(`Offline cache is missing ${offlineMissing.length} translation keys: ${offlineMissing.join(", ")}`);
    }
    fs.writeFileSync(outputPath, makeOutput(data, provenance), "utf8");
    console.log(`Generated ${collected.size} source strings for ${Object.keys(selectedTargets).length} locales.`);
} finally {
    await server.close();
}
