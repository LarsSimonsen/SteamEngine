import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import {
    checkpointIteration,
    finishLocale,
    pauseLocale,
    repositoryContext,
    requeueLocale,
    selectLocale,
    startLocale,
    validateFindingsReport,
    validateQueue,
} from "./translation-critique-queue.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const queueScript = path.join(projectRoot, "tools", "translation-critique-queue.mjs");
const context = repositoryContext(projectRoot);
const initialQueue = () => {
    const queue = JSON.parse(fs.readFileSync(
        path.join(projectRoot, "translation-quality", "work-queue.json"),
        "utf8",
    ));
    for (const locale of ["nn", "ar", "bn", "da"]) {
        const entry = queue.locales.find((candidate) => candidate.locale === locale);
        entry.status = "queued";
        entry.reason = "Test fixture locale.";
        delete entry.checkpoint;
    }
    return queue;
};
const clock = () => new Date("2026-08-18T12:00:00.000Z");

const reportFor = (entry, findings = []) => ({
    schemaVersion: 1,
    locale: entry.locale,
    cycleId: entry.checkpoint.cycleId,
    resourceProfile: {
        classification: "standard",
        assessment: "General dictionaries and established technical usage are available.",
    },
    review: {
        automatedQuality: { state: "passed", summary: "Structural and generated checks passed." },
        linguisticCritique: { state: "completed", summary: "The complete published scope was critiqued." },
        competentHumanReview: { state: "not-performed", summary: "No competent human review was claimed." },
        publicationAuthorization: { state: "not-requested", summary: "No publication action was authorized." },
    },
    findings,
});

describe("translation critique queue", () => {
    it("validates initialized repository state and deterministically selects the highest priority locale", () => {
        const queue = initialQueue();

        expect(validateQueue(queue, context)).toBe(queue);
        expect(selectLocale(queue)?.locale).toBe("nn");
    });

    it("starts, checkpoints, pauses, resumes, and enforces both stopping limits", () => {
        let queue = startLocale(initialQueue(), undefined, context, clock);
        const firstCycle = selectLocale(queue).checkpoint.cycleId;
        expect(selectLocale(queue)).toMatchObject({ locale: "nn", status: "active" });

        queue = checkpointIteration(queue, "nn", {
            actionableFindings: 25,
            measurableImprovement: true,
            summary: "Resolved a confirmed translation defect.",
        }, context);
        queue = pauseLocale(queue, "nn", "Resume the independent critique.", "One iteration completed.",
            context, clock);
        expect(selectLocale(queue)?.locale).toBe("nn");

        queue = startLocale(queue, "nn", context, clock);
        expect(selectLocale(queue).checkpoint.cycleId).toBe(firstCycle);
        queue = checkpointIteration(queue, "nn", {
            actionableFindings: 0,
            measurableImprovement: false,
            summary: "No confirmed defect was resolved.",
        }, context);
        queue = checkpointIteration(queue, "nn", {
            actionableFindings: 0,
            measurableImprovement: false,
            summary: "A second iteration produced no measurable improvement.",
        }, context);

        expect(() => checkpointIteration(queue, "nn", {
            actionableFindings: 0,
            measurableImprovement: false,
            summary: "This iteration must not start.",
        }, context)).toThrow("iteration limit");
    });

    it("finishes every outcome and explicitly requeues owner and blocker states", () => {
        let queue = startLocale(initialQueue(), "nn", context, clock);
        let entry = queue.locales.find(({ locale }) => locale === "nn");
        queue = finishLocale(queue, "nn", "needs-owner", "A terminology choice needs the owner.",
            reportFor(entry, [{
                id: "nn-term-1",
                translationId: "messages.footer.suggestCorrection",
                category: "terminology-disagreement",
                severity: "medium",
                summary: "Independent passes disagree on the preferred term.",
                disposition: "awaiting-owner",
                evidence: ["Both alternatives are established in the available references."],
                ownerQuestion: "Which established term should be preferred in the glossary?",
            }]), {}, context);
        expect(queue.locales.find(({ locale }) => locale === "nn")?.status).toBe("needs-owner");
        queue = requeueLocale(queue, "nn", "The owner supplied the requested terminology decision.", context);

        queue = startLocale(queue, "ar", context, clock);
        entry = queue.locales.find(({ locale }) => locale === "ar");
        queue = finishLocale(queue, "ar", "blocked", "A required source explanation is missing.",
            reportFor(entry, [{
                id: "ar-source-1",
                category: "source-content-defect",
                severity: "high",
                summary: "The English source is ambiguous in a safety-sensitive context.",
                disposition: "awaiting-owner",
                evidence: ["Two plausible meanings produce materially different Arabic wording."],
                ownerQuestion: "Which technical meaning is intended by the English source?",
            }]), { reason: "Clarify the ambiguous English safety instruction." }, context);
        expect(queue.locales.find(({ locale }) => locale === "ar")?.status).toBe("blocked");
        queue = requeueLocale(queue, "ar", "The English source ambiguity was clarified.", context);

        queue = startLocale(queue, "bn", context, clock);
        entry = queue.locales.find(({ locale }) => locale === "bn");
        queue = finishLocale(queue, "bn", "improved", "Resolved one confirmed defect.", reportFor(entry, [{
            id: "bn-fix-1",
            translationId: "messages.common.reset",
            category: "translation-defect",
            severity: "medium",
            summary: "The prior wording changed the command meaning.",
            disposition: "resolved",
            evidence: ["The corrected wording matches the English command and surrounding controls."],
            resolution: "Replaced the mistranslation.",
        }]), {}, context);
        expect(queue.locales.find(({ locale }) => locale === "bn")?.status).toBe("queued");

        queue = startLocale(queue, "da", context, clock);
        entry = queue.locales.find(({ locale }) => locale === "da");
        queue = finishLocale(queue, "da", "stable", "No unresolved actionable automated findings remain.",
            reportFor(entry), {}, context);
        expect(queue.locales.find(({ locale }) => locale === "da")?.status).toBe("stable");
        expect(validateQueue(queue, context)).toBe(queue);
    });

    it("requires evidence, explicit owner questions, and current signatures", () => {
        const queue = initialQueue();
        const report = reportFor({ locale: "nn", checkpoint: { cycleId: "cycle" } }, [{
            id: "finding",
            category: "tool-false-positive",
            severity: "low",
            summary: "The protected token is intentional.",
            disposition: "rejected-with-evidence",
            evidence: [],
        }]);
        expect(() => validateFindingsReport(report)).toThrow("requires evidence");

        const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "steamengine-translation-queue-"));
        const filePath = path.join(temporaryRoot, "queue.json");
        const staleQueue = structuredClone(queue);
        const stableTurkish = staleQueue.locales.find(({ locale }) => locale === "tr");
        stableTurkish.status = "stable";
        stableTurkish.sourceSignature = context.signatures.tr.sourceSignature;
        stableTurkish.contentSignature = "0".repeat(64);
        fs.writeFileSync(filePath, JSON.stringify(staleQueue), "utf8");
        expect(() => validateQueue(JSON.parse(fs.readFileSync(filePath, "utf8")), context))
            .toThrow("stale content signature");
    });

    it("runs selection and resumable state commands against an isolated queue file", () => {
        const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "steamengine-translation-queue-cli-"));
        const queuePath = path.join(temporaryRoot, "queue.json");
        const reportPath = path.join(temporaryRoot, "report.json");
        fs.writeFileSync(queuePath, `${JSON.stringify(initialQueue(), null, 4)}\n`, "utf8");
        const run = (...arguments_) => execFileSync(
            process.execPath,
            [queueScript, ...arguments_, "--file", queuePath],
            { cwd: projectRoot, encoding: "utf8" },
        );

        expect(run("select")).toMatch(/^nn\tqueued\t/);
        run("start", "nn");
        run("checkpoint", "nn", "--findings", "1", "--measurable", "yes", "--summary", "Fixed one defect.");
        run("pause", "nn", "--reason", "Resume the cycle.", "--summary", "One iteration is complete.");
        const paused = JSON.parse(fs.readFileSync(queuePath, "utf8"));
        const pausedCycle = paused.locales.find(({ locale }) => locale === "nn").checkpoint.cycleId;
        run("start", "nn");
        const active = JSON.parse(fs.readFileSync(queuePath, "utf8"));
        const activeEntry = active.locales.find(({ locale }) => locale === "nn");
        expect(activeEntry.checkpoint.cycleId).toBe(pausedCycle);
        fs.writeFileSync(reportPath, `${JSON.stringify(reportFor(activeEntry), null, 4)}\n`, "utf8");
        run("finish", "nn", "improved", "--report", reportPath, "--summary", "Verified improvement batch.");
        const requeueTarget = initialQueue().locales.find(
            ({ locale, status }) => locale !== "nn" && status !== "active",
        )?.locale;
        expect(requeueTarget).toBeDefined();
        run("requeue", requeueTarget, "--reason", "New visitor feedback arrived.");
        expect(run("validate")).toContain("Validated translation critique queue");
        fs.rmSync(temporaryRoot, { recursive: true, force: true });
    });
});
