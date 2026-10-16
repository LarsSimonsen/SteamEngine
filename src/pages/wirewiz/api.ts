import type { Material } from "../../catalogs/materials/catalog";
import type { EquivalentTemperatureResult, WizardCalculation, WizardSettings } from "./domain";
import { requestJson } from "../../shared/backend-request";

const wireWizardApiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v5/wirewiz";

export type WireWizardApiResult = {
    readonly calculation: WizardCalculation;
    readonly csv?: string;
    readonly equivalent?: EquivalentTemperatureResult;
};

export const calculateWireWizard = async (
    settings: Omit<WizardSettings, "showAllComponents">,
    materials: readonly Material[],
    equivalenceTemperatureCelsius: number,
    equivalenceMaterialId: string,
): Promise<WireWizardApiResult> => {
    const body = {
        s: settings,
        m: materials.map(({ id, resistivity, density, heatCapacity, tcr, tfr }) => ({
            id, resistivity, density, heatCapacity, tcr, tfr,
        })),
        e: { temperature: equivalenceTemperatureCelsius, materialId: equivalenceMaterialId },
    };
    const result = await requestJson<Partial<WireWizardApiResult>>(wireWizardApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    }, "The Wire Wizard API");
    if (!result.calculation || (result.calculation.kind !== "valid" && result.calculation.kind !== "invalid")) {
        throw new Error("The Wire Wizard API returned an invalid result.");
    }
    return result as WireWizardApiResult;
};

export const emptyWireCalculation = (calculatingMessage: string): WizardCalculation => ({
    kind: "invalid",
    message: calculatingMessage,
});
