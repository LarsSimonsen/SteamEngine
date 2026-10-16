import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { requestJson } from "./backend-request";

const year = 365 * 24 * 60 * 60 * 1000;
const cacheKeys = (): string[] => Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
    .filter((key): key is string => key?.startsWith("steamengine.api-cache.v1.") === true);

describe("backend request cache", () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        fetchMock.mockReset();
        vi.stubGlobal("fetch", fetchMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("caches successful responses by the complete request and updates lastUsed on a hit", async () => {
        const now = vi.spyOn(Date, "now").mockReturnValue(1000);
        fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => ({ result: 42 }) });

        await expect(requestJson<{ result: number }>(
            "https://example.test/api/v1/ohm?a=1", undefined, "The test API",
        )).resolves.toEqual({ result: 42 });

        now.mockReturnValue(2000);
        await expect(requestJson<{ result: number }>(
            "https://example.test/api/v1/ohm?a=1", undefined, "The test API",
        )).resolves.toEqual({ result: 42 });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const cache = JSON.parse(localStorage.getItem(cacheKeys()[0]) ?? "{}") as {
            readonly entries: Readonly<Record<string, { readonly key: string; readonly value: unknown; lastUsed: number }>>;
        };
        const entry = Object.values(cache.entries)[0];
        expect(entry.key).toContain("https://example.test/api/v1/ohm?a=1");
        expect(entry.value).toEqual({ result: 42 });
        expect(entry.lastUsed).toBe(2000);
    });

    it("keeps endpoint versions separate and includes query parameters and bodies in the key", async () => {
        fetchMock.mockImplementation(async () => ({
            ok: true,
            status: 200,
            json: async () => ({ result: fetchMock.mock.calls.length }),
        }));

        await requestJson("https://example.test/api/v1/coil?a=1", undefined, "The test API");
        await requestJson("https://example.test/api/v1/coil?a=2", undefined, "The test API");
        await requestJson("https://example.test/api/v2/coil?a=1", undefined, "The test API");
        await requestJson("https://example.test/api/v1/wirewiz", {
            method: "POST", body: JSON.stringify({ resistance: 1 }),
        }, "The test API");
        await requestJson("https://example.test/api/v1/wirewiz", {
            method: "POST", body: JSON.stringify({ resistance: 2 }),
        }, "The test API");

        expect(fetchMock).toHaveBeenCalledTimes(5);
        expect(cacheKeys()).toHaveLength(3);
    });

    it("uses sliding expiration based on lastUsed", async () => {
        let currentTime = 0;
        vi.spyOn(Date, "now").mockImplementation(() => currentTime);
        fetchMock
            .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ result: 1 }) })
            .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ result: 2 }) });
        const url = "https://example.test/api/v1/tcr?a=1";

        await requestJson(url, undefined, "The test API");
        currentTime = year - 1;
        await requestJson(url, undefined, "The test API");
        currentTime = (2 * year) - 1;
        await requestJson(url, undefined, "The test API");
        expect(fetchMock).toHaveBeenCalledTimes(1);

        currentTime = (3 * year) + 1;
        await requestJson(url, undefined, "The test API");
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("does not cache failed responses", async () => {
        fetchMock
            .mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({ error: "Unavailable" }) })
            .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ result: 7 }) });
        const url = "https://example.test/api/v1/batt?a=1";

        await expect(requestJson(url, undefined, "The test API")).rejects.toThrow("Unavailable");
        await expect(requestJson(url, undefined, "The test API")).resolves.toEqual({ result: 7 });
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("reduces the combined cache from 2 MB to 1 MB by removing the oldest entries", async () => {
        let currentTime = 0;
        vi.spyOn(Date, "now").mockImplementation(() => currentTime += 1);
        const largeResponse = { payload: "x".repeat(800_000) };
        fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => largeResponse });

        await requestJson("https://example.test/api/v1/one", undefined, "The test API");
        await requestJson("https://example.test/api/v1/two", undefined, "The test API");
        await requestJson("https://example.test/api/v1/three", undefined, "The test API");

        expect(cacheKeys()).toHaveLength(1);
        const cache = JSON.parse(localStorage.getItem(cacheKeys()[0]) ?? "{}") as {
            readonly entries: Readonly<Record<string, unknown>>;
        };
        expect(Object.keys(cache.entries)).toHaveLength(1);
        expect(cacheKeys()[0]).toContain(encodeURIComponent("https://example.test/api/v1/three"));
    });
});
