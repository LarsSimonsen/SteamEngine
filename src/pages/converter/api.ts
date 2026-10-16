import type { ConversionResult, ConverterSettings } from "./domain";
import { requestJson } from "../../shared/backend-request";

const apiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v2/converter";

export const calculateConversionFromApi = async (settings: ConverterSettings): Promise<ConversionResult> => {
    const query = new URLSearchParams({
        f: settings.fromUnit, v: settings.fromValue, t: settings.toUnit, q: String(settings.precision),
    });
    return requestJson<ConversionResult>(`${apiUrl}?${query.toString()}`, undefined, "The converter API");
};
