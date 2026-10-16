import { describe, expect, it, vi } from "vitest";
import { createDebouncedRequest, debouncedRequestSuperseded } from "./debounced-request";

describe("createDebouncedRequest", () => {
    it("runs only the latest request after the delay", async () => {
        vi.useFakeTimers();
        const request = createDebouncedRequest<number>(200);
        const calls: number[] = [];
        const first = request.schedule(async () => { calls.push(1); return 1; });
        const second = request.schedule(async () => { calls.push(2); return 2; });

        await expect(first).rejects.toBe(debouncedRequestSuperseded);
        await vi.advanceTimersByTimeAsync(199);
        expect(calls).toEqual([]);
        await vi.advanceTimersByTimeAsync(1);
        await expect(second).resolves.toBe(2);
        expect(calls).toEqual([2]);
        vi.useRealTimers();
    });

    it("cancels a pending request", async () => {
        vi.useFakeTimers();
        const request = createDebouncedRequest<void>(200);
        const pending = request.schedule(async () => undefined);
        request.cancel();

        await expect(pending).rejects.toBe(debouncedRequestSuperseded);
        await vi.advanceTimersByTimeAsync(200);
        vi.useRealTimers();
    });
});
