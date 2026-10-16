import { afterEach, describe, expect, it, vi } from "vitest";
import { calculateBatteryFromApi } from "./api";
import { defaultState } from "./domain";

describe("battery drain API adapter", () => {
    afterEach(() => vi.restoreAllMocks());

    it("projects current regulation to its equivalent voltage without changing the API contract", async () => {
        const values = {
            atomizer: { voltage: 4, current: 5, power: 20 },
            battery: { voltage: 3.2, current: 6.94, power: 22.22 },
            configuration: { seriesCells: 1, parallelStrings: 1, totalCells: 1 },
            pack: { voltage: 3.2, current: 6.94, power: 22.22, capacityMah: 3000 },
            safety: { currentPerCell: 6.94, effectiveLimit: 15, headroomPercent: 53.7, status: "safe" },
            runtime: { nominalEnergyWh: 11.1, continuousMinutes: 30 },
        } as const;
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => values });
        vi.stubGlobal("fetch", fetchMock);

        await calculateBatteryFromApi({
            ...defaultState,
            device: {
                ...defaultState.device,
                mode: "current-regulated",
                atomizerResistance: 0.8,
                outputCurrent: 5,
            },
        });

        const url = new URL(fetchMock.mock.calls[0][0] as string);
        expect(url.pathname).toBe("/api/v2/batt");
        expect(url.searchParams.get("m")).toBe("voltage");
        expect(url.searchParams.get("v")).toBe("4");
    });
});
