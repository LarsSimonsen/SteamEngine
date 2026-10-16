import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import bokmaalReview from "./translation-review/nb.json";
import nynorskReview from "./translation-review/nn.json";
import simplifiedChineseReview from "./translation-review/zh-Hans.json";
import arabicReview from "./translation-review/ar.json";
import spanishReview from "./translation-review/es.json";
import latinAmericanSpanishReview from "./translation-review/es-419.json";
import frenchReview from "./translation-review/fr.json";
import polishReview from "./translation-review/pl.json";
import ukrainianReview from "./translation-review/uk.json";
import italianReview from "./translation-review/it.json";
import vietnameseReview from "./translation-review/vi.json";
import germanReview from "./translation-review/de.json";
import swedishReview from "./translation-review/sv.json";
import danishReview from "./translation-review/da.json";
import icelandicReview from "./translation-review/is.json";
import hindiReview from "./translation-review/hi.json";
import bengaliReview from "./translation-review/bn.json";
import portugueseReview from "./translation-review/pt.json";
import brazilianPortugueseReview from "./translation-review/pt-BR.json";
import japaneseReview from "./translation-review/ja.json";
import koreanReview from "./translation-review/ko.json";
import greekReview from "./translation-review/el.json";
import turkishReview from "./translation-review/tr.json";
import reviewMetadata from "./translation-review.json";
import { localeDefinitions } from "./locales";
import { nynorsk as nynorskCalculatorMessages } from "./calculator-messages";
import { presentations as nynorskCatalogPresentations } from "./catalog-presentations/nn";
import { messages as nynorskMessages } from "./messages/nn";
import {
    localeNeedsTranslationReview,
    translationReviewStateFor,
} from "./translation-review";

type ReviewFixture = {
    locale: string;
    entries: Record<string, {
        sourceSignature: string;
        translationSignature: string;
        state: string;
        provenance: { kind: string };
        reviewer?: string;
        reviewedAt?: string;
    }>;
};

const targetReviews: Record<string, ReviewFixture> = {
    nb: bokmaalReview,
    nn: nynorskReview,
    "zh-Hans": simplifiedChineseReview,
    ar: arabicReview,
    es: spanishReview,
    "es-419": latinAmericanSpanishReview,
    fr: frenchReview,
        pl: polishReview,
        uk: ukrainianReview,
        it: italianReview,
        vi: vietnameseReview,
        de: germanReview,
        sv: swedishReview,
        da: danishReview,
        is: icelandicReview,
        hi: hindiReview,
        bn: bengaliReview,
        pt: portugueseReview,
        "pt-BR": brazilianPortugueseReview,
        ja: japaneseReview,
    ko: koreanReview,
    el: greekReview,
    tr: turkishReview,
} as const;

describe("translation review metadata", () => {
    it("lists every non-English locale in the correction issue template", () => {
        const template = readFileSync(
            join(process.cwd(), ".github", "ISSUE_TEMPLATE", "translation-correction.yml"),
            "utf8",
        );
        const optionCodes = [...template.matchAll(/^\s+- .+ \(([^)]+)\)$/gm)].map((match) => match[1]);
        const expectedCodes = localeDefinitions
            .filter(({ code }) => code !== "en")
            .slice()
            .sort((left, right) => left.englishAlias.localeCompare(right.englishAlias, "en"))
            .map(({ code }) => code);

        expect(optionCodes).toEqual(expectedCodes);
        expect(optionCodes).not.toContain("en");
    });

    it("tracks every target locale at semantic-ID granularity", () => {
        expect(reviewMetadata.schemaVersion).toBe(2);
        expect(Object.keys(reviewMetadata.locales)).toEqual([
            "en", "nb", "nn", "zh-Hans", "ar", "es", "es-419", "fr", "pl", "uk", "it", "vi", "de", "sv", "da", "is",
            "hi", "bn", "pt", "pt-BR", "ja", "ko", "el", "tr", "id", "fi",
        ]);
        expect(reviewMetadata.locales.en.state).toBe("source");

        const expectedKeys = Object.keys(bokmaalReview.entries).sort();
        expect(expectedKeys.length).toBeGreaterThan(1_000);
        for (const [locale, review] of Object.entries(targetReviews)) {
            expect(review.locale).toBe(locale);
            expect(Object.keys(review.entries).sort()).toEqual(expectedKeys);
            for (const entry of Object.values(review.entries)) {
                expect(entry.sourceSignature).toMatch(/^[a-f0-9]{64}$/);
                expect(entry.translationSignature).toMatch(/^[a-f0-9]{64}$/);
                expect(["machine", "needs-review", "reviewed", "approved"]).toContain(entry.state);
                if (entry.state === "reviewed") {
                    expect(entry.provenance.kind).toBe("human");
                    expect("reviewer" in entry ? entry.reviewer : undefined).toBeTruthy();
                    expect("reviewedAt" in entry ? entry.reviewedAt : undefined)
                        .toMatch(/^\d{4}-\d{2}-\d{2}$/);
                } else if (entry.state === "approved") {
                    expect("reviewer" in entry ? entry.reviewer : undefined).toBeTruthy();
                    expect("reviewedAt" in entry ? entry.reviewedAt : undefined)
                        .toMatch(/^\d{4}-\d{2}-\d{2}$/);
                } else {
                    expect(entry.provenance.kind).toBe("machine");
                }
            }
        }
    });

    it("preserves the maintainer-reviewed Bokmål battery eyebrow after its English source expands", () => {
        expect(bokmaalReview.entries["calculators.batt.eyebrow"]).toMatchObject({
            state: "reviewed",
            provenance: { kind: "human" },
            reviewer: "LarsSimonsen",
            reviewedAt: "2026-08-07",
        });
    });

    it("reviews shared battery translations by semantic text ID", () => {
        const keys = Object.keys(bokmaalReview.entries);
        expect(keys.filter((key) => key.startsWith("catalogText.battery."))).toHaveLength(26);
        expect(keys.some((key) => key.startsWith("catalog.batteries."))).toBe(false);
        expect(bokmaalReview.entries["catalogText.battery.summary.removable"]).toMatchObject({
            state: "reviewed",
            provenance: { kind: "human" },
        });
    });

    it("reviews shared mod translations by semantic text ID", () => {
        const keys = Object.keys(bokmaalReview.entries);
        expect(keys.filter((key) => key.startsWith("catalogText.mod."))).toHaveLength(9);
        expect(keys.some((key) => key.startsWith("catalog.mods."))).toBe(false);
    });

    it("reviews shared material translations by semantic text ID", () => {
        const keys = Object.keys(bokmaalReview.entries);
        expect(keys.filter((key) => key.startsWith("catalogText.material."))).toHaveLength(2);
        expect(keys.some((key) => key.startsWith("catalog.materials."))).toBe(false);
    });

    it("exposes locale-wide review status without bundling per-entry data", () => {
        expect(translationReviewStateFor("en")).toBe("source");
        expect(localeNeedsTranslationReview("en")).toBe(false);
        expect(translationReviewStateFor("nb")).toBe("machine");
        expect(localeNeedsTranslationReview("nb")).toBe(true);
        expect(translationReviewStateFor("nn")).toBe("machine");
        expect(localeNeedsTranslationReview("nn")).toBe(true);
        expect(translationReviewStateFor("zh-Hans")).toBe("needs-review");
        expect(localeNeedsTranslationReview("zh-Hans")).toBe(true);
        expect(translationReviewStateFor("ar")).toBe("needs-review");
        expect(localeNeedsTranslationReview("ar")).toBe(true);
        expect(translationReviewStateFor("es")).toBe("machine");
        expect(localeNeedsTranslationReview("es")).toBe(true);
        expect(translationReviewStateFor("fr")).toBe("needs-review");
        expect(localeNeedsTranslationReview("fr")).toBe(true);
        expect(translationReviewStateFor("pl")).toBe("needs-review");
        expect(localeNeedsTranslationReview("pl")).toBe(true);
        expect(translationReviewStateFor("uk")).toBe("needs-review");
        expect(localeNeedsTranslationReview("uk")).toBe(true);
        expect(translationReviewStateFor("it")).toBe("needs-review");
        expect(localeNeedsTranslationReview("it")).toBe(true);
        expect(translationReviewStateFor("vi")).toBe("needs-review");
        expect(localeNeedsTranslationReview("vi")).toBe(true);
        expect(translationReviewStateFor("de")).toBe("needs-review");
        expect(localeNeedsTranslationReview("de")).toBe(true);
        expect(translationReviewStateFor("sv")).toBe("machine");
        expect(localeNeedsTranslationReview("sv")).toBe(true);
        expect(translationReviewStateFor("da")).toBe("needs-review");
        expect(localeNeedsTranslationReview("da")).toBe(true);
        expect(translationReviewStateFor("is")).toBe("needs-review");
        expect(localeNeedsTranslationReview("is")).toBe(true);
        expect(translationReviewStateFor("hi")).toBe("needs-review");
        expect(localeNeedsTranslationReview("hi")).toBe(true);
        expect(translationReviewStateFor("bn")).toBe("needs-review");
        expect(localeNeedsTranslationReview("bn")).toBe(true);
        expect(translationReviewStateFor("pt")).toBe("machine");
        expect(localeNeedsTranslationReview("pt")).toBe(true);
        expect(translationReviewStateFor("pt-BR")).toBe("machine");
        expect(localeNeedsTranslationReview("pt-BR")).toBe(true);
        expect(translationReviewStateFor("ja")).toBe("needs-review");
        expect(localeNeedsTranslationReview("ja")).toBe(true);
        expect(translationReviewStateFor("ko")).toBe("needs-review");
        expect(localeNeedsTranslationReview("ko")).toBe(true);
        expect(translationReviewStateFor("el")).toBe("needs-review");
        expect(localeNeedsTranslationReview("el")).toBe(true);
        expect(translationReviewStateFor("tr")).toBe("machine");
        expect(localeNeedsTranslationReview("tr")).toBe(true);
        expect(translationReviewStateFor("id")).toBe("machine");
        expect(localeNeedsTranslationReview("id")).toBe(true);
    });

    it("keeps Nynorsk as explicit source data rather than a runtime transformation", () => {
        expect(nynorskMessages.navigation.language).toBe("Språk");
        expect(nynorskCalculatorMessages.batt.currentLabel).toBe("Straum");
        expect(nynorskCatalogPresentations.concepts["concept-ohms-law"].description)
            .toContain("straum");
    });
});
