import { describe, expect, it } from "vitest";
import { validateTargetReview } from "./translation-source-validation.mjs";

const approvedDraft = () => ({
    state: "approved",
    provenance: { kind: "machine", method: "Machine draft" },
    confidence: "medium",
    reviewer: "Maintainer instruction",
    reviewedAt: "2026-08-17",
});

describe("translation review attribution", () => {
    it("accepts attributed maintainer approval while retaining machine authorship", () => {
        expect(() => validateTargetReview(approvedDraft(), "tr:test")).not.toThrow();
    });

    it.each(["reviewer", "reviewedAt"])("rejects approval without %s", (field) => {
        const review = approvedDraft();
        delete review[field];
        expect(() => validateTargetReview(review, "tr:test")).toThrow("reviewer metadata");
    });

    it("does not treat a machine draft as a human linguistic review", () => {
        expect(() => validateTargetReview({ ...approvedDraft(), state: "reviewed" }, "tr:test"))
            .toThrow("reviewer metadata");
    });

    it("rejects a needs-review entry without its uncertainty reason", () => {
        expect(() => validateTargetReview({
            state: "needs-review", provenance: { kind: "machine" }, confidence: "medium",
        }, "zh-Hans:test")).toThrow("uncertainty reason");
    });
});
