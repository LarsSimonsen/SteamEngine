import path from "node:path";
import { fileURLToPath } from "node:url";
import {
    entrySignatureFor,
    loadTranslationEntries,
    targetTranslationLocales,
} from "../../../../tools/translation-review-data.mjs";

// Use the same semantic IDs and placeholder extraction as the project's review tooling.
const projectRoot = fileURLToPath(new URL("../../../../", import.meta.url));
const [group, ...prefixes] = process.argv.slice(2);
const requested = group?.split(",") ?? [];
if (requested.length < 2 || new Set(requested).size !== requested.length
    || requested.some((locale) => !targetTranslationLocales.includes(locale))) {
    throw new Error("Supply at least two distinct supported target locale codes, then optional semantic-ID prefixes.");
}
const locales = [...new Set(["en", ...requested])];
const entries = await loadTranslationEntries({ projectRoot: path.resolve(projectRoot) });
const matches = (id, prefix) => id === prefix || id.startsWith(`${prefix}.`);
const sourceIds = [...entries.en.keys()].sort();
for (const prefix of prefixes) {
    if (!sourceIds.some((id) => matches(id, prefix))) throw new Error(`Unknown semantic-ID prefix: ${prefix}`);
}
const selectedIds = sourceIds.filter((id) => !prefixes.length || prefixes.some((prefix) => matches(id, prefix)));
if (!selectedIds.length) throw new Error("The requested scope contains no English entries.");
const rows = selectedIds.map((id) => {
    const sourceText = entries.en.get(id);
    const translations = Object.fromEntries(locales.map((locale) => {
        const text = entries[locale]?.get(id);
        if (typeof text !== "string" || !text.trim()) throw new Error(`Missing translation: ${locale} ${id}`);
        return [locale, { text, signature: entrySignatureFor(id, text) }];
    }));
    return { id, sourceText, sourceSignature: entrySignatureFor(id, sourceText), translations };
});
console.log(JSON.stringify({
    sourceLocale: "en",
    locales,
    prefixes,
    scope: "Project translation collector only; inspect UI context and any metadata outside this collector separately.",
    rows,
}, null, 2));
