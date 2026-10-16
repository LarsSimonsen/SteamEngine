import type { BatteryDrainState, CalculationResult, CalculationValues } from "./domain";
import { requestJson } from "../../shared/backend-request";

const battApiUrl = "https://steam-engine-api.lars-simonsen.workers.dev/api/v2/batt";

export const calculateBatteryFromApi = async (state: BatteryDrainState): Promise<CalculationResult> => {
    const outputVoltage = state.device.mode === "current-regulated"
        ? state.device.outputCurrent * state.device.atomizerResistance
        : state.device.outputVoltage;
    const query = new URLSearchParams({
        m: state.device.mode === "power-regulated" ? "power"
            : state.device.mode === "unregulated" ? "unregulated" : "voltage",
        r: String(state.device.atomizerResistance),
        v: String(outputVoltage),
        p: String(state.device.outputPower),
        e: String(state.device.efficiency),
        bv: String(state.battery.voltage),
        cap: String(state.battery.capacityMah),
        mc: String(state.battery.maximumCurrent),
        cr: String(state.battery.cRating),
        nv: String(state.battery.nominalVoltage),
        sc: String(state.battery.seriesCells),
        pc: String(state.battery.parallelStrings),
    });
    const values = await requestJson<CalculationValues>(
        `${battApiUrl}?${query.toString()}`, undefined, "The battery API",
    );
    return { kind: "valid", values };
};
