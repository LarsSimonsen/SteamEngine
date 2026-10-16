import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { before, test } from "node:test";
import { entrySignatureFor, loadTranslationEntries } from "../../../../tools/translation-review-data.mjs";

const projectRoot = fileURLToPath(new URL("../../../../", import.meta.url));
const helper = fileURLToPath(new URL("./compare.mjs", import.meta.url));
let entries;

before(async () => {
    entries = await loadTranslationEntries({ projectRoot });
}, { timeout: 30000 });

const run = (...args) => spawnSync(process.execPath, [helper, ...args], {
    cwd: projectRoot,
    encoding: "utf8",
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
});

const compare = (group, ...prefixes) => {
    const result = run(group, ...prefixes);
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, "", "One-shot collection must not start a conflicting WebSocket server");
    const output = JSON.parse(result.stdout);
    assert.deepEqual(output.locales, ["en", ...group.split(",")]);
    const expectedIds = [...entries.en.keys()].sort().filter((id) => !prefixes.length
        || prefixes.some((prefix) => id === prefix || id.startsWith(`${prefix}.`)));
    assert.deepEqual(output.rows.map(({ id }) => id), expectedIds);
    for (const row of output.rows) {
        assert.equal(row.sourceText, entries.en.get(row.id));
        assert.equal(row.sourceSignature, entrySignatureFor(row.id, row.sourceText));
        for (const locale of output.locales) {
            const text = entries[locale].get(row.id);
            assert.deepEqual(row.translations[locale], { text, signature: entrySignatureFor(row.id, text) });
        }
    }
};

test("Portuguese battery comparison preserves collector text and signatures", () => {
    compare("pt,pt-BR", "calculators.batt");
});

test("Scandinavian full export preserves correction overlays and functional placeholders", () => {
    compare("nb,nn,da,sv");
});

test("exact IDs and overlapping prefixes select each row once", () => {
    const id = [...entries.en.keys()].find((key) => key.startsWith("calculators.batt."));
    compare("pt,pt-BR", id);
    compare("pt,pt-BR", "calculators.batt", id);
});

test("invalid groups and non-boundary prefixes fail without emitting a partial report", () => {
    const invalid = [[], ["pt"], ["pt,pt"], ["en,pt"], ["pt,unknown"], ["pt,pt-BR", "calculators.bat"]];
    for (const args of invalid) {
        const result = run(...args);
        assert.equal(result.error, undefined);
        assert.notEqual(result.status, 0);
        assert.equal(result.stdout, "");
        assert.match(
            result.stderr,
            /Supply at least two distinct supported target locale codes|Unknown semantic-ID prefix/,
        );
    }
});
