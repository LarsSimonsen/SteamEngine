import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultQueuePath = path.join(projectRoot, "translation-quality", "work-queue.json");

export const queueStatuses = Object.freeze(["queued", "active", "needs-owner", "blocked", "stable"]);
export const finishOutcomes = Object.freeze(["improved", "stable", "needs-owner", "blocked"]);
export const findingCategories = Object.freeze([
    "translation-defect",
    "source-content-defect",
    "factual-or-safety-risk",
    "terminology-disagreement",
    "tool-false-positive",
]);
export const findingDispositions = Object.freeze([
    "resolved",
    "rejected-with-evidence",
    "owner-accepted",
    "awaiting-owner",
]);

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isSignature = (value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const isCommitSignature = (value) => typeof value === "string" && /^[a-f0-9]{7,64}$/.test(value);
const clone = (value) => structuredClone(value);

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const stablePairs = (entries, field) => Object.entries(entries)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([id, entry]) => [id, entry[field]]);

export const repositoryContext = (root = projectRoot) => {
    const index = readJson(path.join(root, "src", "i18n", "translation-review.json"));
    const contract = readJson(path.join(root, "tools", "route-contract.json"));
    const reviewLocales = Object.keys(index.locales).filter((locale) => locale !== index.sourceLocale).sort();
    const locales = contract.localization.publishedLocales
        .filter((locale) => locale !== index.sourceLocale)
        .sort();
    assert(JSON.stringify(locales) === JSON.stringify(reviewLocales),
        "Published locales and translation review metadata disagree.");
    const queueSchema = readJson(path.join(root, "translation-quality", "work-queue.schema.json"));
    const findingsSchema = readJson(path.join(root, "translation-quality", "findings.schema.json"));
    assert(JSON.stringify(queueSchema.$defs.locale.properties.status.enum) === JSON.stringify(queueStatuses),
        "Queue status schema and implementation disagree.");
    assert(JSON.stringify(findingsSchema.$defs.finding.properties.category.enum)
        === JSON.stringify(findingCategories), "Finding category schema and implementation disagree.");
    assert(JSON.stringify(findingsSchema.$defs.finding.properties.disposition.enum)
        === JSON.stringify(findingDispositions), "Finding disposition schema and implementation disagree.");
    const signatures = Object.fromEntries(locales.map((locale) => {
        const review = readJson(path.join(root, "src", "i18n", "translation-review", `${locale}.json`));
        return [locale, {
            sourceSignature: sha256(JSON.stringify(stablePairs(review.entries, "sourceSignature"))),
            contentSignature: sha256(JSON.stringify(stablePairs(review.entries, "translationSignature"))),
        }];
    }));
    return { locales, signatures };
};

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const validateLimits = (limits) => {
    assert(isObject(limits), "Queue defaultLimits must be an object.");
    for (const field of [
        "localesPerRun",
        "maxIterationsPerLocaleRun",
        "maxActionableFindingsPerIteration",
        "stopAfterConsecutiveNoImprovement",
    ]) {
        assert(Number.isInteger(limits[field]) && limits[field] > 0, `Invalid queue limit: ${field}.`);
    }
    assert(limits.localesPerRun === 1, "The queue must allow one locale per run by default.");
};

const validateCheckpoint = (entry, limits) => {
    if (entry.checkpoint === undefined) {
        assert(entry.status !== "active", `Active locale ${entry.locale} requires a checkpoint.`);
        return;
    }
    const checkpoint = entry.checkpoint;
    assert(isObject(checkpoint), `Invalid checkpoint for ${entry.locale}.`);
    assert(isNonEmptyString(checkpoint.cycleId), `Checkpoint cycleId is required for ${entry.locale}.`);
    assert(isNonEmptyString(checkpoint.startedAt), `Checkpoint startedAt is required for ${entry.locale}.`);
    assert(Number.isInteger(checkpoint.iterations) && checkpoint.iterations >= 0,
        `Invalid checkpoint iteration count for ${entry.locale}.`);
    assert(checkpoint.iterations <= limits.maxIterationsPerLocaleRun,
        `Checkpoint exceeds the iteration limit for ${entry.locale}.`);
    assert(Number.isInteger(checkpoint.consecutiveWithoutImprovement)
        && checkpoint.consecutiveWithoutImprovement >= 0,
    `Invalid no-improvement count for ${entry.locale}.`);
    assert(checkpoint.consecutiveWithoutImprovement <= checkpoint.iterations,
        `No-improvement count exceeds completed iterations for ${entry.locale}.`);
    assert(isSignature(checkpoint.baselineSourceSignature),
        `Invalid baseline source signature for ${entry.locale}.`);
    assert(isSignature(checkpoint.baselineContentSignature),
        `Invalid baseline content signature for ${entry.locale}.`);
    if (checkpoint.pausedAt !== undefined) {
        assert(isNonEmptyString(checkpoint.pausedAt), `Invalid pause timestamp for ${entry.locale}.`);
        assert(entry.status === "queued", `Only a queued locale may retain a paused checkpoint: ${entry.locale}.`);
    }
};

export const validateQueue = (queue, context = repositoryContext()) => {
    assert(isObject(queue), "Translation critique queue must be an object.");
    assert(queue.schemaVersion === 1, "Unsupported translation critique queue schema version.");
    assert(queue.sourceLocale === "en", "The translation critique queue source locale must be en.");
    validateLimits(queue.defaultLimits);
    assert(Array.isArray(queue.locales), "Queue locales must be an array.");

    const seen = new Set();
    let activeCount = 0;
    let checkpointCount = 0;
    for (const entry of queue.locales) {
        assert(isObject(entry), "Every queue locale entry must be an object.");
        assert(context.locales.includes(entry.locale), `Unknown queue locale: ${entry.locale}.`);
        assert(!seen.has(entry.locale), `Duplicate queue locale: ${entry.locale}.`);
        seen.add(entry.locale);
        assert(Number.isInteger(entry.priority) && entry.priority > 0, `Invalid priority for ${entry.locale}.`);
        assert(queueStatuses.includes(entry.status), `Invalid status for ${entry.locale}: ${entry.status}.`);
        assert(isNonEmptyString(entry.reason), `A reason or next action is required for ${entry.locale}.`);
        assert(Number.isInteger(entry.iterationCount) && entry.iterationCount >= 0,
            `Invalid iteration count for ${entry.locale}.`);
        assert(entry.lastCompletedCycle === null || isNonEmptyString(entry.lastCompletedCycle),
            `Invalid last completed cycle for ${entry.locale}.`);
        assert(typeof entry.resultSummary === "string", `Invalid result summary for ${entry.locale}.`);
        if (entry.commitSignature !== undefined) {
            assert(isCommitSignature(entry.commitSignature), `Invalid commit signature for ${entry.locale}.`);
        }
        if (entry.sourceSignature !== undefined) {
            assert(isSignature(entry.sourceSignature), `Invalid source signature for ${entry.locale}.`);
        }
        if (entry.contentSignature !== undefined) {
            assert(isSignature(entry.contentSignature), `Invalid content signature for ${entry.locale}.`);
        }
        validateCheckpoint(entry, queue.defaultLimits);
        if (entry.status === "active") activeCount += 1;
        if (entry.checkpoint !== undefined) checkpointCount += 1;
        if (entry.status === "stable") {
            const current = context.signatures[entry.locale];
            assert(entry.sourceSignature === current.sourceSignature,
                `Stable locale ${entry.locale} has a stale source signature; requeue it.`);
            assert(entry.contentSignature === current.contentSignature,
                `Stable locale ${entry.locale} has a stale content signature; requeue it.`);
            assert(isNonEmptyString(entry.resultSummary), `Stable locale ${entry.locale} needs a result summary.`);
        }
    }
    assert(activeCount <= queue.defaultLimits.localesPerRun, "Only one locale may be active by default.");
    assert(checkpointCount <= queue.defaultLimits.localesPerRun,
        "Resume or explicitly requeue the existing locale checkpoint before selecting another locale.");
    assert(seen.size === context.locales.length && context.locales.every((locale) => seen.has(locale)),
        "Queue locale set must exactly match the published target locales.");
    return queue;
};

export const validateFindingsReport = (report) => {
    assert(isObject(report), "Findings report must be an object.");
    assert(report.schemaVersion === 1, "Unsupported findings report schema version.");
    assert(isNonEmptyString(report.locale), "Findings report locale is required.");
    assert(isNonEmptyString(report.cycleId), "Findings report cycleId is required.");
    assert(isObject(report.resourceProfile), "Findings report resourceProfile is required.");
    assert(["standard", "limited"].includes(report.resourceProfile.classification),
        "Resource profile classification must be standard or limited.");
    assert(isNonEmptyString(report.resourceProfile.assessment), "Resource profile assessment is required.");
    if (report.resourceProfile.classification === "limited" && report.resourceProfile.ownerConfirmed !== undefined) {
        assert(typeof report.resourceProfile.ownerConfirmed === "boolean",
            "Limited resource profile ownerConfirmed must be boolean when present.");
    }
    assert(isObject(report.review), "Findings report review boundaries are required.");
    const reviewStates = {
        automatedQuality: ["passed", "failed"],
        linguisticCritique: ["completed", "incomplete"],
        competentHumanReview: ["completed", "pending", "not-performed"],
        publicationAuthorization: ["owner-authorized", "not-authorized", "not-requested"],
    };
    for (const field of Object.keys(reviewStates)) {
        assert(isObject(report.review[field]), `Missing review boundary: ${field}.`);
        assert(reviewStates[field].includes(report.review[field].state), `Invalid ${field} state.`);
        assert(isNonEmptyString(report.review[field].summary), `Missing ${field} summary.`);
    }
    if (report.review.competentHumanReview.state === "completed") {
        assert(isNonEmptyString(report.review.competentHumanReview.reviewer),
            "Completed competent human review requires a reviewer identity.");
    }
    if (report.review.publicationAuthorization.state === "owner-authorized") {
        assert(isNonEmptyString(report.review.publicationAuthorization.reviewer),
            "Owner publication authorization requires an owner identity.");
    }
    assert(Array.isArray(report.findings), "Findings report findings must be an array.");
    const ids = new Set();
    for (const finding of report.findings) {
        assert(isNonEmptyString(finding.id), "Every finding needs a stable ID.");
        assert(!ids.has(finding.id), `Duplicate finding ID: ${finding.id}.`);
        ids.add(finding.id);
        assert(finding.translationId === undefined || isNonEmptyString(finding.translationId),
            `Invalid translation ID for finding ${finding.id}.`);
        assert(findingCategories.includes(finding.category), `Invalid category for finding ${finding.id}.`);
        assert(["low", "medium", "high", "critical"].includes(finding.severity),
            `Invalid severity for finding ${finding.id}.`);
        assert(isNonEmptyString(finding.summary), `Missing summary for finding ${finding.id}.`);
        assert(findingDispositions.includes(finding.disposition),
            `Invalid disposition for finding ${finding.id}.`);
        assert(Array.isArray(finding.evidence), `Finding ${finding.id} evidence must be an array.`);
        if (finding.disposition === "rejected-with-evidence") {
            assert(finding.evidence.length > 0, `Rejected finding ${finding.id} requires evidence.`);
        }
        if (finding.disposition === "owner-accepted") {
            assert(isNonEmptyString(finding.ownerDecision),
                `Owner-accepted finding ${finding.id} requires an owner decision record.`);
            assert(isNonEmptyString(finding.ownerIdentity),
                `Owner-accepted finding ${finding.id} requires an owner identity.`);
            assert(finding.severity !== "critical",
                `Critical integrity finding ${finding.id} cannot be owner-accepted.`);
        }
        if (finding.disposition === "awaiting-owner") {
            assert(isNonEmptyString(finding.ownerQuestion),
                `Finding ${finding.id} awaiting the owner requires a specific question.`);
        }
    }
    return report;
};

export const selectLocale = (queue) => {
    const active = queue.locales.find((entry) => entry.status === "active");
    if (active) return active;
    const paused = queue.locales.find((entry) => entry.status === "queued" && entry.checkpoint !== undefined);
    if (paused) return paused;
    return [...queue.locales]
        .filter((entry) => entry.status === "queued")
        .sort((left, right) => left.priority - right.priority || left.locale.localeCompare(right.locale))[0] ?? null;
};

const localeEntry = (queue, locale) => {
    const entry = queue.locales.find((candidate) => candidate.locale === locale);
    assert(entry, `Locale is not in the queue: ${locale}.`);
    return entry;
};

const timestamp = (clock) => clock().toISOString();
const cycleId = (locale, clock) => `${locale}-${timestamp(clock).replace(/[-:.]/g, "")}`;

export const startLocale = (queueValue, locale, context = repositoryContext(), clock = () => new Date()) => {
    const queue = clone(queueValue);
    validateQueue(queue, context);
    const selected = locale ? localeEntry(queue, locale) : selectLocale(queue);
    assert(selected, "No queued locale is available.");
    const active = queue.locales.find((entry) => entry.status === "active");
    if (active) {
        assert(active.locale === selected.locale, `Locale ${active.locale} is already active.`);
        return queue;
    }
    const paused = queue.locales.find((entry) => entry.status === "queued" && entry.checkpoint !== undefined);
    assert(!paused || paused.locale === selected.locale,
        `Resume or requeue paused locale ${paused?.locale} before starting ${selected.locale}.`);
    assert(selected.status === "queued", `Locale ${selected.locale} is not queued.`);
    if (selected.checkpoint) {
        delete selected.checkpoint.pausedAt;
    } else {
        const signatures = context.signatures[selected.locale];
        selected.checkpoint = {
            cycleId: cycleId(selected.locale, clock),
            startedAt: timestamp(clock),
            iterations: 0,
            consecutiveWithoutImprovement: 0,
            baselineSourceSignature: signatures.sourceSignature,
            baselineContentSignature: signatures.contentSignature,
        };
    }
    selected.status = "active";
    selected.reason = "Complete or safely checkpoint the active critique-and-improvement cycle.";
    validateQueue(queue, context);
    return queue;
};

export const checkpointIteration = (queueValue, locale, details, context = repositoryContext()) => {
    const queue = clone(queueValue);
    validateQueue(queue, context);
    const entry = localeEntry(queue, locale);
    assert(entry.status === "active", `Locale ${locale} is not active.`);
    assert(Number.isInteger(details.actionableFindings) && details.actionableFindings >= 0,
        "Actionable finding count must be a non-negative integer.");
    assert(details.actionableFindings <= queue.defaultLimits.maxActionableFindingsPerIteration,
        `An iteration may contain at most ${queue.defaultLimits.maxActionableFindingsPerIteration} findings.`);
    assert(typeof details.measurableImprovement === "boolean", "Measurable improvement must be boolean.");
    assert(isNonEmptyString(details.summary), "Iteration summary is required.");
    assert(entry.checkpoint.iterations < queue.defaultLimits.maxIterationsPerLocaleRun,
        `Locale ${locale} has reached the per-run iteration limit.`);
    assert(entry.checkpoint.consecutiveWithoutImprovement
        < queue.defaultLimits.stopAfterConsecutiveNoImprovement,
    `Locale ${locale} already met the no-improvement stopping rule.`);
    entry.checkpoint.iterations += 1;
    entry.iterationCount += 1;
    entry.checkpoint.consecutiveWithoutImprovement = details.measurableImprovement
        ? 0
        : entry.checkpoint.consecutiveWithoutImprovement + 1;
    entry.resultSummary = details.summary;
    validateQueue(queue, context);
    return queue;
};

export const pauseLocale = (queueValue, locale, reason, summary, context = repositoryContext(),
    clock = () => new Date()) => {
    const queue = clone(queueValue);
    validateQueue(queue, context);
    const entry = localeEntry(queue, locale);
    assert(entry.status === "active", `Locale ${locale} is not active.`);
    assert(isNonEmptyString(reason), "A pause reason or next action is required.");
    assert(isNonEmptyString(summary), "A pause result summary is required.");
    entry.status = "queued";
    entry.reason = reason;
    entry.resultSummary = summary;
    entry.checkpoint.pausedAt = timestamp(clock);
    validateQueue(queue, context);
    return queue;
};

export const finishLocale = (queueValue, locale, outcome, summary, report, options = {},
    context = repositoryContext()) => {
    const queue = clone(queueValue);
    validateQueue(queue, context);
    validateFindingsReport(report);
    assert(finishOutcomes.includes(outcome), `Invalid finish outcome: ${outcome}.`);
    assert(isNonEmptyString(summary), "A finish result summary is required.");
    const entry = localeEntry(queue, locale);
    assert(entry.status === "active", `Locale ${locale} is not active.`);
    assert(report.locale === locale, "Findings report locale does not match the active locale.");
    assert(report.cycleId === entry.checkpoint.cycleId, "Findings report cycle does not match the checkpoint.");
    const awaitingOwner = report.findings.filter((finding) => finding.disposition === "awaiting-owner");
    if (["improved", "stable", "needs-owner"].includes(outcome)) {
        assert(report.review.automatedQuality.state === "passed",
            `${outcome} requires passing automated quality checks.`);
        assert(report.review.linguisticCritique.state === "completed",
            `${outcome} requires a completed whole-locale linguistic critique.`);
    }
    if (outcome === "stable") {
        assert(awaitingOwner.length === 0, "A stable locale cannot have findings awaiting an owner decision.");
    }
    if (outcome === "needs-owner") {
        assert(awaitingOwner.length > 0, "needs-owner requires a specific finding awaiting an owner decision.");
    }
    if (outcome === "improved") {
        assert(awaitingOwner.length === 0, "An improved locale cannot leave findings awaiting an owner decision.");
    }
    if (outcome === "blocked") {
        assert(isNonEmptyString(options.reason), "A blocked outcome requires a concrete missing prerequisite.");
    }
    if (options.commitSignature !== undefined) {
        assert(isCommitSignature(options.commitSignature), "Invalid commit signature.");
        entry.commitSignature = options.commitSignature;
    }
    entry.status = outcome === "improved" ? "queued" : outcome;
    entry.lastOutcome = outcome;
    entry.lastCompletedCycle = entry.checkpoint.cycleId;
    entry.resultSummary = summary;
    entry.reason = options.reason ?? (outcome === "improved"
        ? "Improved in the completed cycle; select again for the next bounded cycle."
        : outcome === "stable"
            ? "Requeue when English changes, visitor feedback arrives, or stronger checks become available."
            : outcome === "needs-owner"
                ? "Resolve the specific owner questions recorded in the findings report."
                : "Provide the concrete missing prerequisite recorded in the findings report.");
    const signatures = context.signatures[locale];
    entry.sourceSignature = signatures.sourceSignature;
    entry.contentSignature = signatures.contentSignature;
    delete entry.checkpoint;
    validateQueue(queue, context);
    return queue;
};

export const requeueLocale = (queueValue, locale, reason, context = repositoryContext()) => {
    const queue = clone(queueValue);
    validateQueue(queue, context);
    const entry = localeEntry(queue, locale);
    assert(entry.status !== "active", `Pause active locale ${locale} before requeueing it.`);
    assert(isNonEmptyString(reason), "A concrete requeue reason is required.");
    entry.status = "queued";
    entry.reason = reason;
    entry.lastOutcome = "requeued";
    delete entry.checkpoint;
    validateQueue(queue, context);
    return queue;
};

const writeQueue = (filePath, queue) => {
    const temporaryPath = `${filePath}.${process.pid}.tmp`;
    fs.writeFileSync(temporaryPath, `${JSON.stringify(queue, null, 4)}\n`, "utf8");
    fs.renameSync(temporaryPath, filePath);
};

const parseArguments = (arguments_) => {
    const positional = [];
    const flags = {};
    for (let index = 0; index < arguments_.length; index += 1) {
        const value = arguments_[index];
        if (!value.startsWith("--")) {
            positional.push(value);
            continue;
        }
        const name = value.slice(2);
        const next = arguments_[index + 1];
        if (next === undefined || next.startsWith("--")) flags[name] = true;
        else {
            flags[name] = next;
            index += 1;
        }
    }
    return { positional, flags };
};

const requireFlag = (flags, name) => {
    assert(isNonEmptyString(flags[name]), `Missing required --${name}.`);
    return flags[name];
};

const usage = () => `Usage:
  node tools/translation-critique-queue.mjs validate [--file <path>]
  node tools/translation-critique-queue.mjs select [--file <path>]
  node tools/translation-critique-queue.mjs start [locale] [--file <path>]
  node tools/translation-critique-queue.mjs checkpoint <locale> --findings <count> --measurable <yes|no>
      --summary <text> [--file <path>]
  node tools/translation-critique-queue.mjs pause <locale> --reason <text> --summary <text> [--file <path>]
  node tools/translation-critique-queue.mjs finish <locale> <improved|stable|needs-owner|blocked>
      --report <path> --summary <text> [--reason <text>] [--commit <hash>] [--file <path>]
  node tools/translation-critique-queue.mjs requeue <locale> --reason <text> [--file <path>]
  node tools/translation-critique-queue.mjs signatures <locale>`;

const runCli = () => {
    const { positional, flags } = parseArguments(process.argv.slice(2));
    const [command, locale, outcome] = positional;
    assert(command, usage());
    const queuePath = path.resolve(flags.file ?? defaultQueuePath);
    const context = repositoryContext();
    if (command === "signatures") {
        assert(locale && context.signatures[locale], `Unknown locale: ${locale ?? ""}.`);
        console.log(JSON.stringify(context.signatures[locale], null, 4));
        return;
    }
    const queue = readJson(queuePath);
    if (command === "validate") {
        validateQueue(queue, context);
        console.log(`Validated translation critique queue for ${queue.locales.length} target locales.`);
        return;
    }
    if (command === "select") {
        validateQueue(queue, context);
        const selected = selectLocale(queue);
        console.log(selected ? `${selected.locale}\t${selected.status}\t${selected.reason}` : "No locale available.");
        return;
    }
    let updated;
    if (command === "start") {
        updated = startLocale(queue, locale, context);
    } else if (command === "checkpoint") {
        const measurable = requireFlag(flags, "measurable");
        assert(["yes", "no"].includes(measurable), "--measurable must be yes or no.");
        updated = checkpointIteration(queue, locale, {
            actionableFindings: Number.parseInt(requireFlag(flags, "findings"), 10),
            measurableImprovement: measurable === "yes",
            summary: requireFlag(flags, "summary"),
        }, context);
    } else if (command === "pause") {
        updated = pauseLocale(queue, locale, requireFlag(flags, "reason"), requireFlag(flags, "summary"), context);
    } else if (command === "finish") {
        const report = readJson(path.resolve(requireFlag(flags, "report")));
        updated = finishLocale(queue, locale, outcome, requireFlag(flags, "summary"), report, {
            reason: flags.reason,
            commitSignature: flags.commit,
        }, context);
    } else if (command === "requeue") {
        updated = requeueLocale(queue, locale, requireFlag(flags, "reason"), context);
    } else {
        throw new Error(usage());
    }
    writeQueue(queuePath, updated);
    const entry = localeEntry(updated, locale ?? selectLocale(updated)?.locale);
    console.log(`${entry.locale}: ${entry.status} — ${entry.reason}`);
};

if (path.resolve(process.argv[1] ?? "") === scriptPath) {
    try {
        runCli();
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
    }
}
