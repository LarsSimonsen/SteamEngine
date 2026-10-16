import type { BatteryProperties } from "../../catalogs/batteries/catalog";
import type { ModProperties } from "../../catalogs/mods/catalog";
import {
    applyPreset,
    applyModBatteryOption,
    modBatteryOptions,
    preferredDeviceModeForMod,
    recommendedBatteryVoltage,
    type BatteryDrainState,
} from "./domain";

export type BatteryDrainHandoff = Readonly<{
    readonly state: BatteryDrainState;
    readonly selectedModId?: string;
    readonly selectedModConfigurationId?: string;
}>;

const positiveNumber = (value: string | null): number | undefined => {
    if (value === null || value.trim() === "") return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

export const batteryDrainHandoff = (
    search: string,
    mods: readonly ModProperties[],
    batteries: readonly BatteryProperties[],
    currentState: BatteryDrainState,
): BatteryDrainHandoff | undefined => {
    const parameters = new URLSearchParams(search);
    const modSelector = parameters.get("mod")?.trim();
    const batterySelector = parameters.get("battery")?.trim();
    const mod = modSelector ? mods.find(({ id, slug }) => id === modSelector || slug === modSelector) : undefined;
    const preset = batterySelector
        ? batteries.find(({ id, slug }) => id === batterySelector || slug === batterySelector)
        : undefined;
    if (mod === undefined && preset === undefined) return undefined;

    const mode = mod ? preferredDeviceModeForMod(mod, "power-regulated") : currentState.device.mode;
    const requestedPower = positiveNumber(parameters.get("power")) ?? mod?.maximumOutputPowerWatts;
    const voltage = currentState.device.mode === "unregulated" && mode !== "unregulated"
        ? recommendedBatteryVoltage(mode)
        : currentState.battery.voltage;
    const options = mod ? modBatteryOptions(mod) : [];
    const option = options.length === 1 ? options[0] : undefined;
    const configuredBattery = option === undefined
        ? { ...currentState.battery, voltage }
        : applyModBatteryOption({ ...currentState.battery, voltage }, option);
    const battery = preset ? applyPreset(configuredBattery, preset) : configuredBattery;

    return {
        state: {
            device: {
                ...currentState.device,
                mode,
                ...(mode === "power-regulated" && requestedPower !== undefined
                    ? { outputPower: requestedPower }
                    : {}),
            },
            battery,
        },
        ...(mod ? {
            selectedModId: mod.id,
            selectedModConfigurationId: option?.id ?? "",
        } : {}),
    };
};
