import { describe, expect, it } from "vitest";
import { parseBuildScope } from "./build-scope";

describe("build scopes", () => {
    it("retains the complete locale and route matrix by default", () => {
        const scope = parseBuildScope({});

        expect(scope.kind).toBe("full");
        expect(scope.locales).toHaveLength(26);
        expect(scope.routes).toEqual([
            "catalog", "batt", "coil", "converter", "juice", "modrange", "ohm", "tcr", "wirewiz",
            "compare/batteries", "compare/materials", "compare/mods",
        ]);
    });

    it("selects one complete locale", () => {
        const scope = parseBuildScope({ STEAM_ENGINE_BUILD_LOCALE: "nb" });

        expect(scope).toMatchObject({ kind: "locale", locale: "nb", locales: ["nb"] });
        expect(scope.routes).toContain("catalog");
    });

    it("selects one route across every locale", () => {
        const scope = parseBuildScope({
            STEAM_ENGINE_BUILD_ROUTE: "coil",
            STEAM_ENGINE_BUILD_ALL_LOCALES: "1",
        });

        expect(scope).toMatchObject({ kind: "route", route: "coil", routes: ["coil"] });
        expect(scope.locales).toHaveLength(26);
    });

    it("selects one route in one locale", () => {
        const scope = parseBuildScope({
            STEAM_ENGINE_BUILD_LOCALE: "nb",
            STEAM_ENGINE_BUILD_ROUTE: "coil",
        });

        expect(scope).toMatchObject({ kind: "slice", locale: "nb", route: "coil" });
        expect(scope.locales).toEqual(["nb"]);
        expect(scope.routes).toEqual(["coil"]);
    });

    it("rejects ambiguous or invalid selections", () => {
        expect(() => parseBuildScope({
            STEAM_ENGINE_BUILD_LOCALE: "nb",
            STEAM_ENGINE_BUILD_ROUTE: "coil",
            STEAM_ENGINE_BUILD_ALL_LOCALES: "1",
        })).toThrow("cannot include all locales");
        expect(() => parseBuildScope({ STEAM_ENGINE_BUILD_LOCALE: "zz" })).toThrow("Unknown build locale");
        expect(() => parseBuildScope({ STEAM_ENGINE_BUILD_ROUTE: "about" })).toThrow("Unknown build route");
    });
});
