import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
    reviewBundleLocaleFiles,
    reviewBundleSourceFiles,
    sourceSignatureFor,
} from "./translation-source-validation.mjs";
import {
    entrySignatureFor,
    legacyReviewKeysFor,
    loadTranslationEntries,
    localeReviewStateFor,
    targetTranslationLocales,
} from "./translation-review-data.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(projectRoot, "src", "i18n", "translation-review.json");
const reviewDirectory = path.join(projectRoot, "src", "i18n", "translation-review");
const checkOnly = process.argv.includes("--check");
const cacheEnabled = checkOnly && process.argv.includes("--cache");
const cachePath = path.join(projectRoot, ".build-runs", "i18n-review-check.json");

const filesUnder = (directory) => {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(entryPath) : [entryPath];
    });
};

const cacheInputs = [
    ...filesUnder(path.join(projectRoot, "src", "i18n")),
    ...[
        "tools/generate-translation-review.mjs",
        "tools/translation-review-data.mjs",
        "tools/translation-source-validation.mjs",
    ].map((relativePath) => path.join(projectRoot, relativePath)),
];

const cacheSignature = () => JSON.stringify(cacheInputs.sort().map((filePath) => {
    const stat = fs.statSync(filePath);
    return [path.relative(projectRoot, filePath), stat.size, stat.mtimeMs];
}));

if (cacheEnabled) {
    const signature = cacheSignature();
    try {
        const cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
        if (cache.signature === signature) {
            console.log("Translation review check cache hit.");
            process.exit(0);
        }
    } catch {
        // A missing or malformed cache simply triggers the complete check.
    }
}

const defaultProvenance = Object.freeze({
    fi: { kind: "machine", method: "English-source Finnish rework and terminology research", model: "GPT-6" },
    nb: { kind: "machine", method: "initial static localization draft" },
    nn: { kind: "machine", method: "materialized from Bokmal draft" },
    "zh-Hans": { kind: "machine", method: "Google Translate machine draft" },
    ar: { kind: "machine", method: "Google Translate draft with contextual Arabic editing" },
    es: { kind: "machine", method: "Google Translate machine draft with Spanish vaping terminology research" },
    "es-419": {
        kind: "machine",
        method: "Google Translate machine draft with Latin American Spanish terminology review",
    },
    fr: { kind: "machine", method: "Machine draft with French vaping terminology research" },
    pl: { kind: "machine", method: "Google Translate machine draft with Polish vaping terminology research" },
    uk: { kind: "machine", method: "Google Translate machine draft with Ukrainian vaping terminology research" },
    it: { kind: "machine", method: "Google Translate machine draft with Italian vaping terminology research" },
    vi: { kind: "machine", method: "Google Translate machine draft with Vietnamese vaping terminology research" },
    de: { kind: "machine", method: "Google Translate machine draft with German vaping terminology research" },
    sv: { kind: "machine", method: "Google Translate machine draft with Swedish vaping terminology research" },
    da: { kind: "machine", method: "Google Translate machine draft with Danish vaping terminology research" },
    is: { kind: "machine", method: "Google Translate machine draft with Icelandic vaping terminology research" },
    hi: { kind: "machine", method: "Google Translate machine draft with Hindi vaping terminology research" },
    bn: { kind: "machine", method: "Google Translate machine draft with Bengali vaping terminology research" },
    pt: {
        kind: "machine",
        method: "Google Translate machine draft with Portuguese (Portugal) vaping terminology research",
    },
    "pt-BR": {
        kind: "machine",
        method: "Google Translate machine draft with Brazilian Portuguese vaping terminology research",
    },
    ja: { kind: "machine", method: "Google Translate machine draft with Japanese vaping terminology research" },
    ko: { kind: "machine", method: "Google Translate machine draft with Korean vaping terminology research" },
    el: { kind: "machine", method: "Google Translate machine draft with Greek vaping terminology research" },
    tr: { kind: "machine", method: "Google Translate machine draft with Turkish vaping and electrical terminology research" },
    id: { kind: "machine", method: "Google Translate machine draft with Indonesian vaping and electrical terminology research" },
});
const defaultConfidence = Object.freeze({
    ar: "low", es: "low", "es-419": "low", fr: "low", pl: "low", uk: "low", it: "low", vi: "low", de: "low",
    sv: "low", da: "low", is: "low", hi: "low", bn: "low", pt: "low", "pt-BR": "low", ja: "low", ko: "low",
    el: "low", tr: "low", id: "low",
});

const readExisting = (filePath) => {
    if (!fs.existsSync(filePath)) return undefined;
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
        return undefined;
    }
};

const stableJson = (value) => `${JSON.stringify(value, null, 4)}\n`;

const withoutPlaceholderTokens = (value) => value.replace(/__SE_ARG_\d+__/gi, "");

const writeOrCheck = (filePath, value, staleFiles) => {
    const content = stableJson(value);
    if (checkOnly) {
        if (!fs.existsSync(filePath) || fs.readFileSync(filePath, "utf8") !== content) {
            staleFiles.push(path.relative(projectRoot, filePath).split(path.sep).join("/"));
        }
        return;
    }
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
};

const sourceSignature = (relativePath) => sourceSignatureFor(
    path.join(projectRoot, relativePath),
    fs.readFileSync(path.join(projectRoot, relativePath), "utf8"),
);

const bundleEntry = (bundle, sourceFiles) => {
    if (typeof sourceFiles === "string") {
        return {
            sourceFile: sourceFiles,
            sourceSignature: sourceSignature(sourceFiles),
            files: reviewBundleLocaleFiles[bundle],
        };
    }
    return {
        sourceFiles,
        sourceSignatures: Object.fromEntries(Object.entries(sourceFiles).map(([key, relativePath]) => [
            key,
            sourceSignature(relativePath),
        ])),
        files: reviewBundleLocaleFiles[bundle],
    };
};

const entriesByLocale = await loadTranslationEntries({ projectRoot });
const englishEntries = entriesByLocale.en;
const staleFiles = [];
const localeIndexes = {};

for (const locale of targetTranslationLocales) {
    const filePath = path.join(reviewDirectory, `${locale}.json`);
    const existing = readExisting(filePath);
    const targetEntries = entriesByLocale[locale];
    const entries = {};
    for (const [key, sourceValue] of [...englishEntries.entries()].sort(([left], [right]) =>
        left.localeCompare(right))) {
        const targetValue = targetEntries.get(key);
        if (targetValue === undefined) throw new Error(`Missing ${locale} translation entry: ${key}`);
        const sourceValueSignature = entrySignatureFor(key, sourceValue);
        const translationSignature = entrySignatureFor(key, targetValue);
        const previous = existing?.entries?.[key];
        const remainsCurrent = previous?.sourceSignature === sourceValueSignature
            && (previous?.translationSignature === translationSignature
                || entrySignatureFor(key, withoutPlaceholderTokens(targetValue))
                    === previous?.translationSignature);
        const migratedReview = previous === undefined
            ? legacyReviewKeysFor(key).map((legacyKey) => existing?.entries?.[legacyKey]).find(Boolean)
            : undefined;
        entries[key] = remainsCurrent ? {
            ...previous,
            translationSignature,
        } : migratedReview ? {
            ...migratedReview,
            sourceSignature: sourceValueSignature,
            translationSignature,
        } : {
            sourceSignature: sourceValueSignature,
            translationSignature,
            state: "machine",
            provenance: defaultProvenance[locale],
            confidence: defaultConfidence[locale] ?? "medium",
        };
    }
    const reviewFile = {
        schemaVersion: 1,
        sourceLocale: "en",
        locale,
        entries,
    };
    writeOrCheck(filePath, reviewFile, staleFiles);
    localeIndexes[locale] = {
        state: localeReviewStateFor(entries),
        reviewFile: `src/i18n/translation-review/${locale}.json`,
        glossaryFile: `src/i18n/glossaries/${locale}.json`,
    };
}

const index = {
    schemaVersion: 2,
    sourceLocale: "en",
    locales: {
        en: { state: "source" },
        ...localeIndexes,
    },
    bundles: Object.fromEntries(Object.entries(reviewBundleSourceFiles).map(([bundle, sourceFiles]) => [
        bundle,
        bundleEntry(bundle, sourceFiles),
    ])),
};
writeOrCheck(indexPath, index, staleFiles);

if (staleFiles.length > 0) {
    throw new Error(`Translation review metadata is stale: ${staleFiles.join(", ")}`);
}
if (cacheEnabled) {
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, `${JSON.stringify({ signature: cacheSignature() }, null, 4)}\n`, "utf8");
}
if (!checkOnly) console.log(`Generated ${englishEntries.size} review entries for each target locale.`);
