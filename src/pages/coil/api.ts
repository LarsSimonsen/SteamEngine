import type { Material } from "../../catalogs/materials/catalog";
import { canonicalMaterialId } from "../../catalogs/materials/catalog";
import type { CoilCalculation, CoilResults, CoilSettings } from "./domain";
import { requestJson } from "../../shared/backend-request";

const coilApiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v2/coil";

const nullable = (value: number | null): string => value === null ? "null" : String(value);

const calculationRequest = (settings: CoilSettings, material: Material | undefined): URLSearchParams => {
    const materialId = canonicalMaterialId(settings.materialId);
    return new URLSearchParams({
        p: settings.profile,
        str: String(settings.strands),
        tp: String(settings.twistPitch),
        s: settings.setup,
        r: String(settings.targetResistance),
        rpl: String(settings.resistancePerLength),
        wl: String(settings.wireLength),
        wm: String(settings.wireLengthManual),
        dia: String(settings.diameter),
        w: String(settings.ribbonWidth),
        th: String(settings.ribbonThickness),
        id: String(settings.innerDiameter),
        ll: String(settings.legLength),
        ws: String(settings.wrapSpacing),
        hf: String(settings.heatFlux),
        mat: materialId,
        rho: String(material?.resistivity ?? "NaN"),
        den: nullable(material?.density ?? null),
        hc: nullable(material?.heatCapacity ?? null),
    });
};

export const calculateCoilFromApi = async (
    settings: CoilSettings,
    material: Material | undefined,
    cancel?: () => void,
    reset?: () => void,
): Promise<CoilCalculation> => {
    const values = await requestJson<CoilResults>(
        `${coilApiUrl}?${calculationRequest(settings, material).toString()}`, undefined, "The coil API", cancel, reset,
    );
    return { kind: "valid", values };
};
