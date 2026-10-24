import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Runs the axe sweep and rewrites tests/e2e/accessibility-baseline.json from its results. Each baseline entry
 * lists the page families where a rule fails on a selector, or "*" when it fails on every scanned family.
 */

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resultsRoot = path.join(projectRoot, "test-results");
const baselinePath = path.join(projectRoot, "tests", "e2e", "accessibility-baseline.json");

const run = spawnSync(process.execPath, ["tools/run-playwright-e2e.mjs", "tests/e2e/accessibility.spec.ts"], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
});
if (run.error) throw run.error;

const resultFiles = readdirSync(resultsRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "axe-violations.json")
    .map((entry) => path.join(entry.parentPath, entry.name));
if (resultFiles.length === 0) throw new Error("The sweep produced no results; the baseline was not changed.");

const families = new Set();
const failures = new Map();
for (const file of resultFiles) {
    const result = JSON.parse(readFileSync(file, "utf8"));
    families.add(result.family);
    for (const { rule, target } of result.violations) {
        const key = JSON.stringify([rule, target]);
        failures.set(key, (failures.get(key) ?? new Set()).add(result.family));
    }
}

const baseline = {};
for (const [key, failingFamilies] of [...failures].sort(([a], [b]) => a.localeCompare(b))) {
    const [rule, target] = JSON.parse(key);
    baseline[rule] ??= {};
    baseline[rule][target] = failingFamilies.size === families.size ? ["*"] : [...failingFamilies].sort();
}
writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 4)}\n`);
console.log(`Wrote ${failures.size} baseline entries from ${resultFiles.length} scans`
    + ` of ${families.size} page families.`);
