import type { ModLimits, ModRangeGraphBounds, ModRangeResult, PowerPoint } from "./domain";
import { requestJson } from "../../shared/backend-request";

const apiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v1/modrange";

export type ModRangeGraphResponse = Readonly<{
    readonly limits: ModLimits;
    readonly calculation: { readonly minimumResistance: number; readonly maximumResistance: number;
        readonly medianResistance: number; readonly sweetSpotResistance: number };
    readonly adjusted: boolean;
    readonly bounds: ModRangeGraphBounds;
    readonly curves: Readonly<Record<"combined" | "current" | "voltage" | "power", readonly PowerPoint[]>>;
}>;

export type ModRangeApiResponse = Readonly<{
    readonly calculation: ModRangeResult;
    readonly graph: ModRangeGraphResponse | null;
}>;

const nullable = (value: number | undefined): string => value === undefined ? "null" : String(value);

export const calculateModRangeFromApi = async (limits: ModLimits): Promise<ModRangeApiResponse> => {
    const query = new URLSearchParams({
        p: String(limits.maxPower), v: String(limits.maxVoltage), c: String(limits.maxCurrent),
        mi: nullable(limits.minResistance), ma: nullable(limits.maxResistance),
    });
    return requestJson<ModRangeApiResponse>(`${apiUrl}?${query.toString()}`, undefined, "The mod range API");
};
