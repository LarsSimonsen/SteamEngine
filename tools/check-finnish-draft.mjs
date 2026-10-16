import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { entrySignatureFor, loadTranslationEntries } from "./translation-review-data.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const draft = read("src/i18n/drafts/fi.json");
const records = read("src/i18n/translation-review/fi.json");
const allEntries = await loadTranslationEntries({ projectRoot: root });
const english = allEntries.en;
const published = allEntries.fi !== undefined;
const keys = [...english.keys()].sort();
assert.deepEqual(Object.keys(draft.translations).sort(), keys, "Finnish draft must cover current English exactly");
for (const key of keys) assert(records.entries[key], `Missing Finnish review record: ${key}`);
assert.equal(draft.locale, "fi");
assert.equal(draft.sourceLocale, "en");
assert.equal(draft.publicationStatus, "unpublished");
const argumentsIn = (text) => [...text.matchAll(/__SE_ARG_\d+__/gi)].map(([value]) => value).sort();
for (const [id, source] of english) {
    const target = published ? allEntries.fi.get(id) : draft.translations[id];
    assert.equal(typeof target, "string", id);
    assert(target.trim(), `${id}: empty translation`);
    assert(!/__se_arg_/i.test(target.replaceAll(/__SE_ARG_\d+__/gi, "")), `${id}: malformed argument`);
    assert.deepEqual(argumentsIn(target).map((value) => value.toUpperCase()),
        argumentsIn(source).map((value) => value.toUpperCase()), `${id}: interpolation arguments changed`);
    assert.equal(records.entries[id].sourceSignature, entrySignatureFor(id, source), `${id}: stale source`);
    assert.equal(records.entries[id].translationSignature, entrySignatureFor(id, target), `${id}: stale target`);
    assert(["machine", "needs-review"].includes(records.entries[id].state), `${id}: unsupported approval`);
    if (source.includes("Steam Engine")) assert(target.includes("Steam Engine"), `${id}: brand changed`);
}
if (published) {
    assert(!process.argv.includes("--write"), "Published Finnish is maintained in locale-owned TypeScript files.");
    console.log(`Validated ${keys.length} published Finnish entries, protected arguments and review signatures.`);
    process.exit(0);
}
const snapshotPath = path.join(root, "src/i18n/generated-locale-data.ts");
let snapshot = fs.readFileSync(snapshotPath, "utf8");
const eol = snapshot.includes("\r\n") ? "\r\n" : "\n";
snapshot = snapshot.replaceAll("\r\n", "\n");
if (process.argv.includes("--write")) {
    let replaced = 0;
    snapshot = snapshot.replace(/^    "fi": \{[\s\S]*?^    \}(,?)$/gm, (_match, comma) => {
        const value = replaced++ === 0 ? draft.translations : draft.provenance;
        return `    "fi": ${JSON.stringify(value, null, 4).replaceAll("\n", "\n    ")}${comma}`;
    });
    assert.equal(replaced, 2, "Expected exactly the Finnish data and provenance blocks");
    fs.writeFileSync(snapshotPath, snapshot.replaceAll("\n", eol), "utf8");
}
const start = snapshot.indexOf(" = {") + 3;
const data = JSON.parse(snapshot.slice(start, snapshot.indexOf(";\n", start)));
assert.equal(Object.keys(data.fi).length, keys.length, "Generated Finnish snapshot has stale keys; run with --write");
for (const id of keys) assert.equal(data.fi[id], draft.translations[id], `${id}: stale generated Finnish text`);
console.log(`Validated ${keys.length} Finnish draft entries, protected arguments, signatures and generated snapshot.`);
