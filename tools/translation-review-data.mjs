import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

export const translationLocales = Object.freeze([
    "en", "nb", "nn", "zh-Hans", "ar", "es", "es-419", "fr", "pl", "uk", "it", "vi", "de", "sv", "da", "is", "hi",
    "bn", "pt", "pt-BR", "ja", "ko", "el", "tr", "id", "fi",
]);
export const targetTranslationLocales = Object.freeze(translationLocales.filter((locale) => locale !== "en"));

const protectedPath = (key) => /(?:^|\.)(?:id|slug|url|formula|expression|unit|wikipediaUrl)$/.test(key)
    || /(?:^|\.)displayName$/.test(key) && /(?:batteries|materials|mods)\./.test(key);

const argumentCountFor = (value) => {
    if (value.length > 0) return value.length;
    const indexes = [...Function.prototype.toString.call(value).matchAll(/__SE_ARG_(\d+)__/gi)]
        .map(([, index]) => Number(index));
    return indexes.length === 0 ? 0 : Math.max(...indexes) + 1;
};

export const collectTranslationEntries = (value, key, output = new Map()) => {
    if (typeof value === "string") {
        if (value !== "" && !/^https?:\/\//.test(value) && !protectedPath(key)) output.set(key, value);
        return output;
    }
    if (typeof value === "function") {
        const args = Array.from({ length: argumentCountFor(value) }, (_, index) => `__SE_ARG_${index}__`);
        const template = value(...args);
        if (typeof template === "string") output.set(key, template);
        return output;
    }
    if (Array.isArray(value)) {
        value.forEach((item, index) => collectTranslationEntries(item, `${key}.${index}`, output));
        return output;
    }
    if (value !== null && typeof value === "object") {
        Object.entries(value).forEach(([childKey, childValue]) => {
            collectTranslationEntries(childValue, key ? `${key}.${childKey}` : childKey, output);
        });
    }
    return output;
};

export const entrySignatureFor = (key, value) => crypto.createHash("sha256")
    .update(JSON.stringify([key, value]))
    .digest("hex");

const normalizedPath = (value) => value.split(path.sep).join("/");

export const loadTranslationEntries = async ({
    projectRoot,
    candidateRoot = projectRoot,
    overlayFiles = [],
}) => {
    const candidateOverlay = path.resolve(candidateRoot) === path.resolve(projectRoot)
        ? new Set()
        : new Set(overlayFiles.map(normalizedPath));
    const overlayPlugin = {
        name: "steam-engine-translation-candidate-overlay",
        enforce: "pre",
        load(id) {
            const cleanId = id.split("?", 1)[0];
            const relativePath = normalizedPath(path.relative(projectRoot, cleanId));
            if (!candidateOverlay.has(relativePath)) return undefined;
            return fs.readFileSync(path.join(candidateRoot, relativePath), "utf8");
        },
    };
    const server = await createServer({
        root: projectRoot,
        configFile: false,
        appType: "custom",
        logLevel: "error",
        optimizeDeps: { noDiscovery: true },
        // One-shot collection must not crawl/watch the workspace or start a development WebSocket server.
        server: { middlewareMode: true, watch: null, hmr: false, ws: false },
        plugins: [overlayPlugin],
    });
    try {
        const messageModule = await server.ssrLoadModule("/src/i18n/messages.ts");
        const calculatorModule = await server.ssrLoadModule("/src/i18n/calculator-messages.ts");
        const comparisonModule = await server.ssrLoadModule("/src/i18n/comparison-messages.ts");
        const catalogModule = await server.ssrLoadModule("/src/i18n/catalog-presentations.ts");
        return Object.fromEntries(translationLocales.map((locale) => {
            const entries = new Map();
            collectTranslationEntries(messageModule.messages[locale], "messages", entries);
            collectTranslationEntries(calculatorModule.calculatorMessages[locale], "calculators", entries);
            collectTranslationEntries(comparisonModule.comparisonMessages[locale], "comparisons", entries);
            const {
                batteries: _batteries,
                materials: _materials,
                mods: _mods,
                ...catalogPresentations
            } = catalogModule.catalogPresentations[locale];
            collectTranslationEntries(catalogPresentations, "catalog", entries);
            collectTranslationEntries(catalogModule.batteryTextTranslations[locale], "catalogText", entries);
            collectTranslationEntries(catalogModule.materialTextTranslations[locale], "catalogText", entries);
            collectTranslationEntries(catalogModule.modTextTranslations[locale], "catalogText", entries);
            return [locale, entries];
        }));
    } finally {
        await server.close();
    }
};

const removableBatteryIds = Array.from({ length: 124 }, (_, index) => `battery-${index + 1}`)
    .filter((id) => id !== "battery-30" && id !== "battery-31");
const materialIds = [
    "ka1", "ka", "kd", "n20", "n40", "n60", "n70", "n80", "ss304", "ss316", "ss316l", "ss317l",
    "ss430", "ti1", "ti2", "tie", "w", "nio", "ni200", "nife30", "dicodes", "reactor", "nife30stealth",
    "nft70", "nft52", "zr", "n90", "ss904l",
];

export const legacyReviewKeysFor = (key) => {
    const textId = key.startsWith("catalogText.") ? key.slice("catalogText.".length) : undefined;
    if (textId === "battery.summary.removable") {
        return removableBatteryIds.map((id) => `catalog.batteries.${id}.summary`);
    }
    if (textId === "battery.summary.integrated") {
        return ["catalog.batteries.battery-30.summary", "catalog.batteries.battery-31.summary"];
    }
    if (textId === "battery.note.capacityBelowLabel") {
        return ["catalog.batteries.battery-72.notes.0", "catalog.batteries.battery-73.notes.0"];
    }
    const batteryNote = textId?.match(/^battery\.note\.(battery-\d+)\.evidence$/)?.[1];
    if (batteryNote) return [`catalog.batteries.${batteryNote}.notes.0`];
    if (textId === "material.profile") {
        return materialIds.flatMap((id) => [
            `catalog.materials.${id}.description`,
            `catalog.materials.${id}.summary`,
        ]);
    }
    if (textId === "material.safety.verifiedProfile") {
        return materialIds.map((id) => `catalog.materials.${id}.safetyText`);
    }
    if (textId === "mod.profile.regulated") {
        const customIds = new Set([9, 10, 231, 234, 235, 236, 237, 238]);
        return Array.from({ length: 238 }, (_, index) => index + 1)
            .filter((id) => !customIds.has(id))
            .flatMap((id) => [
                `catalog.mods.preset-${id}.description`,
                `catalog.mods.preset-${id}.summary`,
            ]);
    }
    const modProfile = textId?.match(/^mod\.(preset-\d+)\.profile$/)?.[1];
    if (modProfile) return [
        `catalog.mods.${modProfile}.description`,
        `catalog.mods.${modProfile}.summary`,
    ];
    return [];
};

export const localeReviewStateFor = (entries) => {
    const states = Object.values(entries).map(({ state }) => state);
    if (states.includes("needs-review")) return "needs-review";
    if (states.includes("machine")) return "machine";
    if (states.includes("reviewed")) return "reviewed";
    return "approved";
};
