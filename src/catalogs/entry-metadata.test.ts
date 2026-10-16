import { describe, expect, it } from "vitest";
import { isCatalogIntroduction, isReducedPrecisionIsoDate } from "./entry-metadata";

describe("catalog introduction metadata", () => {
    it.each(["2015", "2015-06", "2015-06-19", "2000-02-29"])(
        "accepts reduced-precision ISO date %s",
        (value) => {
            expect(isReducedPrecisionIsoDate(value)).toBe(true);
        },
    );

    it.each(["", "15", "2015-00", "2015-13", "2015-02-29", "0000"])(
        "rejects invalid reduced-precision ISO date %s",
        (value) => {
            expect(isReducedPrecisionIsoDate(value)).toBe(false);
        },
    );

    it("validates introduction metadata without requiring false precision", () => {
        const exactIntroduction = {
            earliest: {
                date: "2015-06",
                event: "market-availability",
                relation: "no-earlier-than",
            },
            latest: {
                date: "2015-06",
                event: "market-availability",
                relation: "no-later-than",
            },
        };

        expect(isCatalogIntroduction(exactIntroduction)).toBe(true);
        expect(isCatalogIntroduction({
            latest: {
                date: "2012-09-14",
                event: "market-availability",
                relation: "no-later-than",
            },
        })).toBe(true);
        expect(isCatalogIntroduction({
            earliest: { date: "2020", event: "market-availability", relation: "no-earlier-than" },
            latest: { date: "2024-02", event: "market-availability", relation: "no-later-than" },
        })).toBe(true);
        expect(isCatalogIntroduction({
            earliest: { date: "2015-02-29", event: "market-availability", relation: "no-earlier-than" },
        })).toBe(false);
        expect(isCatalogIntroduction({
            earliest: { date: "2015-06", event: "manual-publication", relation: "no-earlier-than" },
        })).toBe(false);
        expect(isCatalogIntroduction({
            latest: { date: "2015-06", event: "market-availability", relation: "approximately" },
        })).toBe(false);
        expect(isCatalogIntroduction({
            earliest: { date: "2025", event: "market-availability", relation: "no-earlier-than" },
            latest: { date: "2024", event: "market-availability", relation: "no-later-than" },
        })).toBe(false);
    });
});
