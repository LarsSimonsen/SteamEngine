import { describe, expect, it } from "vitest";
import { fuzzyCatalogMatch } from "./catalog-search";

const dna40 = ["Evolv DNA-40", "dna40", "Evolv DNA-40 (std. wire)", "Evolv DNA-40 (Ni 200)"];

describe("catalog fuzzy search", () => {
    it("matches exact phrases after normalizing punctuation and diacritics", () => {
        expect(fuzzyCatalogMatch(["SvoëMesto Semovar"], "svoemesto")).toBe(true);
        expect(fuzzyCatalogMatch(dna40, "DNA 40 std wire")).toBe(true);
    });

    it("tolerates ordinary typos and adjacent transpositions", () => {
        expect(fuzzyCatalogMatch(["Kanthal A1 / APM"], "kanhtal")).toBe(true);
        expect(fuzzyCatalogMatch(dna40, "evlov dna40")).toBe(true);
    });

    it("requires every query token to match", () => {
        expect(fuzzyCatalogMatch(dna40, "evolv dna40 shark")).toBe(false);
    });

    it("keeps short identifiers and numbers strict", () => {
        expect(fuzzyCatalogMatch(dna40, "dna 41")).toBe(false);
        expect(fuzzyCatalogMatch(dna40, "dna60")).toBe(false);
        expect(fuzzyCatalogMatch(dna40, "ni 201")).toBe(false);
    });
});
