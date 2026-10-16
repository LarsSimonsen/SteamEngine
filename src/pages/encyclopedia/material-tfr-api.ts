import { requestJson } from "../../shared/backend-request";
import type { DefaultMaterial, TemperaturePoint } from "../../catalogs/materials/catalog";

const apiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v1/materialtfr";

type MaterialTfrValidResponse = Readonly<{
    readonly kind: "valid";
    readonly points?: readonly { readonly temperatureCelsius: number; readonly resistanceFactor: number }[];
    readonly method?: "existing" | "interpolated" | "extrapolated";
    readonly graph?: Readonly<{
        readonly temperatures: readonly number[];
        readonly factors: readonly number[];
        readonly sourceMinimumTemperature: number;
        readonly sourceMaximumTemperature: number;
        readonly minimumTemperature: number;
        readonly maximumTemperature: number;
        readonly minimumFactor: number;
        readonly maximumFactor: number;
    }>;
    readonly message?: never;
}>;

type MaterialTfrInvalidResponse = Readonly<{
    readonly kind: "invalid";
    readonly message: string;
}>;

export type MaterialTfrApiResponse = MaterialTfrValidResponse | MaterialTfrInvalidResponse;

export const materialTfrPointsFor = (
    material: Pick<DefaultMaterial, "tfr" | "tcr">,
): readonly TemperaturePoint[] | undefined => {
    if (material.tfr) return material.tfr;
    if (material.tcr === undefined) return undefined;
    return [[20, 1], [200, 1 + material.tcr * 180]] as const;
};

export const calculateMaterialTfrFromApi = async (points: readonly TemperaturePoint[]):
    Promise<MaterialTfrApiResponse> => {
    const query = new URLSearchParams({ t: JSON.stringify(points) });
    return requestJson<MaterialTfrApiResponse>(`${apiUrl}?${query.toString()}`, undefined, "The material temperature curve API");
};
