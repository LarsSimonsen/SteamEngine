import type { Material } from "../../catalogs/materials/catalog";
import type { TcrCalculation, TcrSettings } from "./domain";
import { requestJson } from "../../shared/backend-request";

const apiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v1/tcr";

export const calculateTcrFromApi = async (
    settings: TcrSettings,
    materials: readonly Material[],
): Promise<TcrCalculation> => {
    const selected = settings.selectedMaterials.map((item) => {
        const material = materials.find((candidate) => candidate.id === item.materialId);
        return {
            i: item.id,
            n: material?.name ?? "",
            r: item.resistance,
            c: material?.tcr ?? null,
            f: material?.tfr ?? null,
        };
    });
    const query = new URLSearchParams({
        t: JSON.stringify(settings.temperaturesCelsius),
        m: JSON.stringify(selected),
    });
    return requestJson<TcrCalculation>(`${apiUrl}?${query.toString()}`, undefined, "The TCR API");
};
