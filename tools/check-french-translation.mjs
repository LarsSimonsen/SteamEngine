import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { entrySignatureFor, loadTranslationEntries } from "./translation-review-data.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const entries = await loadTranslationEntries({ projectRoot: root });
const review = JSON.parse(fs.readFileSync(new URL("../src/i18n/translation-review/fr.json", import.meta.url)));
const args = (text) => [...text.matchAll(/__SE_ARG_\d+__/gi)].map(([value]) => value.toUpperCase()).sort();
assert([...entries.en.keys()].every((id) => entries.fr.has(id)), "Incomplete canonical French coverage");
for (const [id, source] of entries.en) {
    const target = entries.fr.get(id);
    assert.equal(typeof target, "string", id);
    assert(target.trim(), `${id}: empty translation`);
    assert.deepEqual(args(target), args(source), `${id}: changed interpolation arguments`);
    assert.equal(review.entries[id].sourceSignature, entrySignatureFor(id, source), `${id}: stale source`);
    assert.equal(review.entries[id].translationSignature, entrySignatureFor(id, target), `${id}: stale target`);
    if (source.includes("Steam Engine")) assert(target.includes("Steam Engine"), `${id}: changed brand`);
    if (/\bTFR\b/.test(source)) assert(!/\bISF\b/.test(target), `${id}: mistranslated TFR`);
}
console.log(`Validated ${entries.en.size} canonical French entries, interpolation, terminology and review signatures.`);
