import { afterEach, describe, expect, it, vi } from "vitest";
import { materials } from "../../catalogs/materials/catalog";
import { defaultSettings } from "./domain";
import { calculateWireWizard } from "./api";

describe("Wire Wizard API adapter", () => {
    afterEach(() => vi.restoreAllMocks());

    it("does not send the frontend-only showAllComponents setting", async () => {
        const response = {
            ok: true,
            json: async () => ({ calculation: { kind: "invalid", message: "test" } }),
        };
        const fetchMock = vi.fn().mockResolvedValue(response);
        vi.stubGlobal("fetch", fetchMock);
        const { showAllComponents: _showAllComponents, ...calculationSettings } = defaultSettings();

        await calculateWireWizard(calculationSettings, [materials[0]], 210, "ni200");

        expect(fetchMock.mock.calls[0][0]).toBe(
            "https://steam-engine-api.lars-simonsen.workers.dev/api/v5/wirewiz",
        );
        const request = fetchMock.mock.calls[0][1] as RequestInit;
        const body = JSON.parse(request.body as string) as {
            s: Record<string, unknown>;
            m: Array<Record<string, unknown>>;
        };
        expect(request.method).toBe("POST");
        expect(body.s).not.toHaveProperty("showAllComponents");
        expect(body.m[0]).not.toHaveProperty("name");
    });
});
