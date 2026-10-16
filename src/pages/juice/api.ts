import type { JuiceCalculation, JuiceSettings } from "./domain";
import { requestJson } from "../../shared/backend-request";

const apiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v2/juice";

export const calculateJuiceFromApi = async (settings: JuiceSettings): Promise<JuiceCalculation> => {
    const query = new URLSearchParams({
        b: String(settings.batchSize), w: settings.mixByWeight ? "1" : "0",
        bs: String(settings.baseStrength), bp: String(settings.basePg),
        ts: String(settings.targetStrength), tp: String(settings.targetPg),
        f: JSON.stringify(settings.flavors.map((flavor) => ({ n: flavor.nm, p: flavor.perc, v: flavor.vg }))),
    });
    return requestJson<JuiceCalculation>(`${apiUrl}?${query.toString()}`, undefined, "The juice API");
};
