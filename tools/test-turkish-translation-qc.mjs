import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTranslationEntries } from "./translation-review-data.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const glossaryPath = path.join(projectRoot, "src", "i18n", "glossaries", "tr.json");
const reviewPath = path.join(projectRoot, "src", "i18n", "translation-review", "tr.json");
const commonEnglishWords = new Set([
    "about", "battery", "board", "cancel", "catalog", "close", "compare", "current", "delete",
    "edit", "error", "filter", "help", "home", "invalid", "loading", "material", "mod", "next",
    "no", "open", "power", "previous", "reset", "save", "search", "select", "settings", "unknown",
    "voltage", "warning", "weight",
]);

const flattenGlossary = (value, prefix = "") => Object.entries(value).flatMap(([key, entry]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return entry && typeof entry === "object" && "preferred" in entry
        ? [{ key: fullKey, ...entry }]
        : entry && typeof entry === "object" ? flattenGlossary(entry, fullKey) : [];
});

const wordPattern = (term) => new RegExp(`(?:^|[^\\p{L}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    + `(?:$|[^\\p{L}])`, "iu");

const normalized = (value) => value.replace(/\s+/g, " ").trim().toLocaleLowerCase("tr");
const entries = await loadTranslationEntries({ projectRoot });
const english = entries.en;
const turkish = entries.tr;
const glossary = JSON.parse(fs.readFileSync(glossaryPath, "utf8"));
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const glossaryEntries = flattenGlossary(glossary.entries);
const preferredTerms = new Set(glossaryEntries.map((entry) => normalized(entry.preferred)));
const acceptedIdentityTerms = new Set([
    "awg", "bwg", "blog", "dna200", "kelvin", "kilo", "kilogram", "mega", "metre", "mod", "mol", "nano",
]);
const findings = [];

for (const [key, value] of turkish) {
    const sourceValue = english.get(key);
    if (sourceValue === undefined) continue;
    if (normalized(value) === normalized(sourceValue)
        && /[A-Za-z]{3,}/.test(value)
        && !acceptedIdentityTerms.has(normalized(value))) {
        findings.push({ severity: "review", kind: "English duplicate", key, value });
    }
    const englishWords = value.toLocaleLowerCase("tr").match(/[\p{L}]{3,}/gu) ?? [];
    const suspiciousWords = [...new Set(englishWords.filter((word) => commonEnglishWords.has(word)
        && !preferredTerms.has(normalized(word))
        && !acceptedIdentityTerms.has(normalized(word))))];
    if (suspiciousWords.length > 0) {
        findings.push({
            severity: "review",
            kind: "English UI word",
            key,
            value: suspiciousWords.join(", "),
        });
    }
    if (value.length > sourceValue.length * 2.5 && value.length - sourceValue.length > 40) {
        findings.push({ severity: "layout", kind: "Large expansion", key, value: `${sourceValue.length} → ${value.length}` });
    }
}

for (const entry of glossaryEntries) {
    const discouraged = entry.discouraged ?? [];
    for (const term of discouraged) {
        const pattern = wordPattern(term);
        for (const [key, value] of turkish) {
            if (pattern.test(value)) {
                findings.push({
                    severity: "terminology",
                    kind: "Discouraged glossary term",
                    key,
                    value: `${term} (prefer ${entry.preferred})`,
                });
            }
        }
    }
}

const reviewStates = Object.values(review.entries).reduce((counts, entry) => {
    counts[entry.state] = (counts[entry.state] ?? 0) + 1;
    return counts;
}, {});
const TurkishLetters = /[çğıöşüÇĞİÖŞÜ]/;
const allText = [...turkish.values()].join(" ");

console.log("Turkish translation QC");
console.log(`Entries checked: ${turkish.size}`);
console.log(`Review states: ${Object.entries(reviewStates).map(([state, count]) => `${state}=${count}`).join(", ")}`);
console.log(`Turkish-specific letters present: ${TurkishLetters.test(allText) ? "yes" : "no"}`);
console.log(`Findings: ${findings.length}`);

for (const severity of ["review", "terminology", "layout"]) {
    const group = findings.filter((finding) => finding.severity === severity);
    if (group.length === 0) continue;
    console.log(`\n${severity.toUpperCase()} (${group.length})`);
    for (const finding of group.slice(0, 80)) {
        console.log(`- ${finding.kind}: ${finding.key} — ${finding.value}`);
    }
    if (group.length > 80) console.log(`- ... ${group.length - 80} more`);
}

process.exitCode = 0;
