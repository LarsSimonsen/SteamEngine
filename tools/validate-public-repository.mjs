// Guards the public repository: generated catalog data may contain only displayed fields, no file may carry
// identifiers of the private research workflow, and the proprietary calculation code stays out. Run with
// `npm run validate:public`.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Identifiers that only exist in the private research data and tooling.
const deniedPatterns = [
    /methodologyVersion/,
    /visibilityEligible/,
    /visibilityScore/,
    /confidenceFactor/,
    /technicalShortlistEligible/,
    /workflowRefs/,
    /collectionCoverage/,
    /assessmentContexts/,
    /discoveryContexts/,
    /sourceUses/,
    /retrievalRef/,
    /evaluationRef/,
    /research-methodology/,
    /research-source-candidates/,
    /catalog-entity-records/,
    /catalog-research-data/,
    /popularity-assessments/,
    /catalog-workflow-runs/,
    /catalog-candidate-discoveries/,
    // Entry points of the proprietary calculation code, which belongs to the private calculation Worker.
    new RegExp(`\\b(${[
        "calculateBatteryDrain",
        "calculateCoil",
        "convertV2",
        "calculateMix",
        "calculateModRange",
        "calculateFromField",
        "calculateTcr",
        "calculateWizard",
        "calculateEquivalentTemperature",
    ].join("|")})\\b`),
];

// Paths reserved for the private repository.
const deniedPathPrefixes = ["workers/"];

// Leaf values must be primitives; `[shape]` is an array of items; `{ "*": shape }` allows any key.
const leaf = true;
const introduction = {
    earliest: { date: leaf, event: leaf, relation: leaf },
    latest: { date: leaf, event: leaf, relation: leaf },
};
const formFactor = {
    kind: leaf,
    sizeCode: leaf,
    nominalDiameterMm: leaf,
    nominalLengthMm: leaf,
    terminalStyle: leaf,
    lengthMm: leaf,
    widthMm: leaf,
    thicknessMm: leaf,
};
const appearance = {
    wrapperColor: leaf,
    markings: [{ location: leaf, text: leaf, method: leaf, notes: leaf }],
};

const batteryShape = {
    id: leaf,
    slug: leaf,
    aliases: [leaf],
    description: leaf,
    manufacturer: leaf,
    model: leaf,
    formFactor,
    batteryAccess: leaf,
    protected: leaf,
    appearance,
    displayName: leaf,
    weightGrams: leaf,
    ratedCapacityMah: leaf,
    continuousDischargeCurrentAmps: leaf,
    continuousDischargeCRating: leaf,
    nominalVoltageVolts: leaf,
    safetyWarning: leaf,
    dataNote: leaf,
    introduction,
    initiallyVisible: leaf,
};

const materialShape = {
    id: leaf,
    slug: leaf,
    aliases: [leaf],
    description: leaf,
    name: leaf,
    resistivity: leaf,
    heatCapacity: leaf,
    density: leaf,
    meltingPoint: leaf,
    tcr: leaf,
    tfr: [[leaf]],
    initiallyVisible: leaf,
};

const modShape = {
    id: leaf,
    slug: leaf,
    aliases: [leaf],
    description: leaf,
    manufacturer: leaf,
    model: leaf,
    variant: leaf,
    basedOnPresetId: leaf,
    batteryType: leaf,
    batteryConfigurations: [{
        id: leaf,
        profileIds: [leaf],
        format: leaf,
        seriesCount: leaf,
        parallelCount: leaf,
        support: leaf,
        manufacturerClaimedCapacityMah: leaf,
        nominalPackVoltageVolts: leaf,
    }],
    supportedBatteryInputs: [{
        id: leaf,
        seriesCount: leaf,
        parallelCountConstraint: leaf,
        minimumInputVoltageVolts: leaf,
        typicalInputVoltageVolts: leaf,
        maximumInputVoltageVolts: leaf,
        profileIds: [leaf],
    }],
    operatingFeatures: { outputModes: { "*": leaf }, capabilities: { "*": leaf } },
    weightGrams: leaf,
    maximumOutputVoltageVolts: leaf,
    maximumOutputPowerWatts: leaf,
    maximumOutputCurrentAmps: leaf,
    minimumAtomizerResistanceOhms: leaf,
    maximumAtomizerResistanceOhms: leaf,
    introduction,
    initiallyVisible: leaf,
};

const recordBase = {
    entityId: leaf,
    recordStatus: leaf,
    updatedAt: leaf,
    identity: { identityStability: leaf },
    summary: { shortDescription: leaf, description: leaf, highlights: [leaf] },
    sources: [{ id: leaf, title: leaf, url: leaf, publisher: leaf, limitations: leaf }],
};

const batteryRecordShape = {
    ...recordBase,
    classifications: [leaf],
    claims: [{ id: leaf, statement: leaf, evidenceDate: leaf, confidence: leaf }],
    reviews: [{
        id: leaf,
        reviewer: leaf,
        reviewedAt: leaf,
        verdict: leaf,
        summary: leaf,
        pros: [leaf],
        reservations: [leaf],
    }],
    safetyFindings: [{ summary: leaf, runtimeImplication: leaf }],
    domainData: {
        batteryAccess: leaf,
        formFactor,
        weightGrams: leaf,
        chemistry: leaf,
        protected: leaf,
        appearance,
        authenticity: { status: leaf, confidence: leaf, summary: leaf, checks: [leaf] },
    },
};

const modRecordShape = {
    ...recordBase,
    entityType: leaf,
    claims: [{ id: leaf, statement: leaf, evidenceDate: leaf, confidence: leaf, limitations: leaf }],
    lifecycleEvents: [{ id: leaf, summary: leaf, date: leaf, relation: leaf, confidence: leaf }],
    safetyFindings: [{ id: leaf, title: leaf, summary: leaf, appliesTo: leaf, status: leaf }],
    domainData: {
        deviceCategory: leaf,
        weightGrams: leaf,
        batterySystem: { configuration: leaf },
        batteryConfigurations: [{
            format: leaf,
            seriesCount: leaf,
            parallelCount: leaf,
            manufacturerClaimedCapacityMah: leaf,
        }],
        boardRelationships: [{ targetIdentity: leaf }],
    },
};

/** Returns a description of every value that does not fit the allowed shape. */
export const shapeViolations = (value, shape, location) => {
    if (value === null || value === undefined) return [];
    if (shape === leaf) {
        return typeof value === "object" ? [`${location} must be a plain value`] : [];
    }
    if (Array.isArray(shape)) {
        if (!Array.isArray(value)) return [`${location} must be an array`];
        return value.flatMap((item, index) => shapeViolations(item, shape[0], `${location}[${index}]`));
    }
    if (typeof value !== "object" || Array.isArray(value)) return [`${location} must be an object`];
    return Object.entries(value).flatMap(([key, child]) => {
        const childShape = shape[key] ?? shape["*"];
        return childShape === undefined
            ? [`${location}.${key} is not a published catalog field`]
            : shapeViolations(child, childShape, `${location}.${key}`);
    });
};

const importModule = (relativePath) => import(pathToFileURL(path.join(projectRoot, relativePath)).href);

const readJsonFiles = (relativeDirectory) => {
    const directory = path.join(projectRoot, relativeDirectory);
    return fs.readdirSync(directory).filter((file) => file.endsWith(".json")).map((file) => ({
        name: `${relativeDirectory}/${file}`,
        value: JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")),
    }));
};

export const catalogViolations = async () => {
    const { batteryPresets } = await importModule("src/catalogs/batteries/defaults.ts");
    const { materials } = await importModule("src/catalogs/materials/defaults.ts");
    const mods = JSON.parse(fs.readFileSync(path.join(projectRoot, "src/catalogs/mods/presets.json"), "utf8"));
    return [
        ...batteryPresets.flatMap((item) => shapeViolations(item, batteryShape, `batteries:${item.id}`)),
        ...materials.flatMap((item) => shapeViolations(item, materialShape, `materials:${item.id}`)),
        ...mods.flatMap((item) => shapeViolations(item, modShape, `mods:${item.id}`)),
        ...readJsonFiles("src/catalogs/entity-records/batteries")
            .flatMap(({ name, value }) => shapeViolations(value, batteryRecordShape, name)),
        ...readJsonFiles("src/catalogs/entity-records/mods")
            .flatMap(({ name, value }) => shapeViolations(value, modRecordShape, name)),
    ];
};

const repositoryFiles = () => execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: projectRoot,
    encoding: "utf8",
}).split("\n").filter(Boolean);

const binaryExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2", ".pdf"]);

export const deniedContentViolations = () => {
    const self = path.relative(projectRoot, fileURLToPath(import.meta.url)).replaceAll(path.sep, "/");
    const files = repositoryFiles();
    const deniedPaths = files.filter((file) => deniedPathPrefixes.some((prefix) => file.startsWith(prefix)))
        .map((file) => `${file} belongs to the private repository`);
    return deniedPaths.concat(files
        .filter((file) => file !== self && !binaryExtensions.has(path.extname(file).toLowerCase()))
        .flatMap((file) => {
            const absolute = path.join(projectRoot, file);
            if (!fs.existsSync(absolute)) return [];
            const content = fs.readFileSync(absolute, "utf8");
            return deniedPatterns.filter((pattern) => pattern.test(content))
                .map((pattern) => `${file} contains private identifier ${pattern}`);
        }));
};

const main = async () => {
    const violations = [...await catalogViolations(), ...deniedContentViolations()];
    if (violations.length > 0) {
        console.error(violations.slice(0, 50).join("\n"));
        if (violations.length > 50) console.error(`...and ${violations.length - 50} more.`);
        console.error(`Public repository validation failed with ${violations.length} violation(s).`);
        process.exitCode = 1;
        return;
    }
    console.log("Public repository validation passed.");
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
