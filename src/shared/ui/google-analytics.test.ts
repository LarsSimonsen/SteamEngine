import { describe, expect, it } from "vitest";
import { googleAnalyticsHeadMarkup, googleAnalyticsMeasurementId } from "./google-analytics";

describe("Google Analytics configuration", () => {
    it("uses the current GA4 property in the generated page head", () => {
        const markup = googleAnalyticsHeadMarkup();

        expect(googleAnalyticsMeasurementId).toBe("G-XWQ8E2PCST");
        expect(markup).toContain(`googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`);
        expect(markup).toContain(`gtag('config', '${googleAnalyticsMeasurementId}')`);
        expect(markup).not.toContain("UA-49119964-1");
    });
});
