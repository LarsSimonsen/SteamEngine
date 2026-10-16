import { beforeEach, describe, expect, it } from "vitest";
import { languageHref, localizedRootHref, localizedRouteHref } from "./page-locale";

describe("languageHref", () => {
    beforeEach(() => {
        window.history.replaceState({}, "", "/");
    });

    it("keeps the deployment subdirectory when linking from an English calculator", () => {
        window.history.replaceState({}, "", "/steamengine/public/ohm");

        expect(languageHref("nb")).toBe("nb/ohm");
    });

    it("links from a Bokmål calculator back to its English sibling", () => {
        window.history.replaceState({}, "", "/steamengine/public/nb/ohm");

        expect(languageHref("en")).toBe("../ohm");
    });
    it("preserves query-string page state when switching language", () => {
        window.history.replaceState({}, "", "/compare/batteries?a=first&b=second");

        expect(languageHref("nb")).toBe("../nb/compare/batteries?a=first&b=second");
    });

    it("keeps Nynorsk header links inside the localized route tree", () => {
        window.history.replaceState({}, "", "/steamengine/public/nn/ohm");

        expect(localizedRouteHref("nn", "catalog")).toBe("../nn/catalog");
        expect(localizedRouteHref("nn", "coil")).toBe("../nn/coil");
        expect(localizedRouteHref("en", "about")).toBe("../about");
    });

    it("builds localized links correctly from the Nynorsk home page", () => {
        window.history.replaceState({}, "", "/steamengine/public/nn");

        expect(localizedRouteHref("nn", "ohm")).toBe("nn/ohm");
    });
});

describe("localizedRootHref", () => {
    it("returns slashless localized roots", () => {
        expect(localizedRootHref("nb")).toBe("/nb");
        expect(localizedRootHref("pl")).toBe("/pl");
    });

    it("returns the site root for English", () => {
        expect(localizedRootHref("en")).toBe("/");
    });
});
