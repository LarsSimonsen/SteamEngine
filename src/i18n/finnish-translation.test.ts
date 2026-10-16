import { describe, expect, it } from "vitest";
import { messagesFor } from "./messages";
import { calculatorMessagesFor } from "./calculator-messages";
import { localizedRoute, routeMetadataFor, supportedLocales } from "./locales";
import { localeNeedsTranslationReview } from "./translation-review";
import { catalogErrorFor } from "./catalog-errors";

describe("published Finnish", () => {
    it("keeps catalog arguments Finnish without translating user names", () => {
        const messages = messagesFor("fi");
        expect(messages.catalogManager.manage("Batteries")).toBe("Hallinta: akut");
        expect(messages.catalogEditor.properties("Material")).toContain("materiaali");
        expect(messages.catalogManager.customItemsDescription?.("Mods")).toContain("modit");
        expect(messages.catalogManager.deleted("My special coil")).toContain("My special coil");
    });

    it("publishes complete routes with the machine-review notice and optional help", () => {
        expect(supportedLocales).toContain("fi");
        expect(localizedRoute("fi", "/coil")).toBe("/fi/coil");
        expect(routeMetadataFor("fi", "/about")).toBeUndefined();
        expect(localeNeedsTranslationReview("fi")).toBe(true);
        expect(messagesFor("fi").ohm.joulesLawLinkLabel).toBe("Joulen laki");
        expect(calculatorMessagesFor("fi").wirewiz.sourceFactorSuffix).toBe("tässä lämpötilassa.");
    });

    it("localizes nested catalog diagnostics only at the presentation boundary", () => {
        expect(catalogErrorFor("fi", "Enter a model.")).toBe("Syötä malli.");
        expect(catalogErrorFor("fi", "Saved custom battery is invalid: Enter a model."))
            .toBe("Tallennetun oman kohteen tiedot ovat virheelliset: Syötä malli.");
        expect(catalogErrorFor("en", "Enter a model.")).toBe("Enter a model.");
    });
});
