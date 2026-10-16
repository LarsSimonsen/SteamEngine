import type { BatteryProperties } from "../../catalogs/batteries/catalog";
import type { ModFeatureSupport, ModProperties } from "../../catalogs/mods/catalog";
import { currentFromVoltageAndResistance, powerFromVoltageAndCurrent } from "../../shared/domain/electrical";

export type DeviceMode = "power-regulated" | "voltage-regulated" | "current-regulated" | "unregulated";

export type DeviceSettings = {
    readonly mode: DeviceMode;
    readonly atomizerResistance: number;
    readonly outputVoltage: number;
    readonly outputPower: number;
    readonly outputCurrent: number;
    readonly efficiency: number;
};

export type BatterySettings = {
    readonly voltage: number;
    readonly capacityMah: number;
    readonly maximumCurrent: number;
    readonly cRating: number;
    readonly nominalVoltage: number;
    readonly presetId: string;
    readonly seriesCells: number;
    readonly parallelStrings: number;
};

export type BatteryDrainState = {
    readonly device: DeviceSettings;
    readonly battery: BatterySettings;
};

export type BatteryPreset = BatteryProperties;
export type BatteryRatingMethod = "amps" | "c-rating";

export type ModBatteryOption = Readonly<{
    readonly id: string;
    readonly format?: string;
    readonly seriesCells: number;
    readonly parallelStrings?: number;
    readonly source: "device" | "board";
}>;

export type ModLimitViolation = Readonly<{
    readonly field: "power" | "voltage" | "current" | "minimum-resistance" | "maximum-resistance";
    readonly actual: number;
    readonly limit: number;
}>;

export type BatteryField = keyof Omit<BatterySettings, "presetId" | "seriesCells" | "parallelStrings">;

export type CalculationValues = {
    readonly atomizer: { readonly voltage: number; readonly current: number; readonly power: number };
    readonly battery: { readonly voltage: number; readonly current: number; readonly power: number };
    readonly configuration: {
        readonly seriesCells: number;
        readonly parallelStrings: number;
        readonly totalCells: number;
    };
    readonly pack: {
        readonly voltage: number;
        readonly current: number;
        readonly power: number;
        readonly capacityMah: number;
    };
    readonly safety: {
        readonly currentPerCell: number;
        readonly effectiveLimit: number;
        readonly headroomPercent: number;
        readonly status: "safe" | "caution" | "danger";
    };
    readonly runtime: {
        readonly nominalEnergyWh: number;
        readonly continuousMinutes: number;
    };
    readonly warning?: string;
};

export type CalculationResult =
    | { readonly kind: "valid"; readonly values: CalculationValues }
    | { readonly kind: "invalid"; readonly message: string };

export const defaultState: BatteryDrainState = {
    device: {
        mode: "power-regulated",
        atomizerResistance: 0.8,
        outputVoltage: 3.7,
        outputPower: 20,
        outputCurrent: 5,
        efficiency: 0.9,
    },
    battery: {
        voltage: 3.2,
        capacityMah: 3000,
        maximumCurrent: 15,
        cRating: 5,
        nominalVoltage: 3.7,
        presetId: "",
        seriesCells: 1,
        parallelStrings: 1,
    },
};

export const recommendedBatteryVoltage = (mode: DeviceMode): number => mode === "unregulated" ? 4.2 : 3.2;

export const modDeviceModeStatus = (mod: ModProperties | undefined, mode: DeviceMode): ModFeatureSupport => {
    if (mod?.operatingFeatures === undefined) return "unknown";
    if (mode === "power-regulated") return mod.operatingFeatures.outputModes.power;
    if (mode === "voltage-regulated") return mod.operatingFeatures.outputModes.voltage;
    if (mode === "current-regulated") return mod.operatingFeatures.outputModes.current;
    return mod.operatingFeatures.capabilities.bypass;
};

export const preferredDeviceModeForMod = (mod: ModProperties, current: DeviceMode): DeviceMode => {
    if (modDeviceModeStatus(mod, current) === "supported") return current;
    const preference: readonly DeviceMode[] = [
        "power-regulated",
        "voltage-regulated",
        "current-regulated",
        "unregulated",
    ];
    const supported = preference.find((mode) => modDeviceModeStatus(mod, mode) === "supported");
    if (supported !== undefined) return supported;
    if (modDeviceModeStatus(mod, current) !== "unsupported") return current;
    return preference.find((mode) => modDeviceModeStatus(mod, mode) === "unknown") ?? current;
};

export const modBatteryOptions = (mod: ModProperties): readonly ModBatteryOption[] => [
    ...(mod.batteryConfigurations ?? [])
        .filter((configuration) => configuration.seriesCount !== null)
        .map((configuration) => ({
            id: `device:${configuration.id}`,
            format: configuration.format,
            seriesCells: configuration.seriesCount as number,
            ...(configuration.parallelCount === null ? {} : { parallelStrings: configuration.parallelCount }),
            source: "device" as const,
        })),
    ...(mod.supportedBatteryInputs ?? []).map((input) => ({
        id: `board:${input.id}`,
        seriesCells: input.seriesCount,
        source: "board" as const,
    })),
];

export const applyModBatteryOption = (
    battery: BatterySettings,
    option: ModBatteryOption,
): BatterySettings => ({
    ...battery,
    seriesCells: option.seriesCells,
    parallelStrings: option.parallelStrings ?? battery.parallelStrings,
});

export const batteryPresetFormat = (preset: BatteryPreset | undefined): string | undefined =>
    preset?.formFactor?.kind === "cylindrical" ? preset.formFactor.sizeCode : undefined;

export const modBatteryCompatibility = (
    preset: BatteryPreset | undefined,
    option: ModBatteryOption | undefined,
): "compatible" | "incompatible" | "unknown" => {
    const cellFormat = batteryPresetFormat(preset);
    const requiredFormat = option?.format;
    if (cellFormat === undefined || requiredFormat === undefined || !/^\d{5}$/.test(requiredFormat)) {
        return "unknown";
    }
    return cellFormat === requiredFormat ? "compatible" : "incompatible";
};

export const modLimitViolations = (
    device: DeviceSettings,
    mod: ModProperties | undefined,
): readonly ModLimitViolation[] => {
    if (mod === undefined || device.mode === "unregulated") return [];
    const violations: ModLimitViolation[] = [];
    if (device.mode === "power-regulated") {
        if (device.outputPower > mod.maximumOutputPowerWatts) {
            violations.push({ field: "power", actual: device.outputPower, limit: mod.maximumOutputPowerWatts });
        }
        return violations;
    }
    const current = device.mode === "current-regulated"
        ? device.outputCurrent
        : currentFromVoltageAndResistance(device.outputVoltage, device.atomizerResistance);
    const voltage = device.mode === "current-regulated"
        ? device.outputCurrent * device.atomizerResistance
        : device.outputVoltage;
    const power = powerFromVoltageAndCurrent(voltage, current);
    if (power > mod.maximumOutputPowerWatts) {
        violations.push({ field: "power", actual: power, limit: mod.maximumOutputPowerWatts });
    }
    if (voltage > mod.maximumOutputVoltageVolts) {
        violations.push({ field: "voltage", actual: voltage, limit: mod.maximumOutputVoltageVolts });
    }
    if (current > mod.maximumOutputCurrentAmps) {
        violations.push({ field: "current", actual: current, limit: mod.maximumOutputCurrentAmps });
    }
    if (mod.minimumAtomizerResistanceOhms !== undefined
        && device.atomizerResistance < mod.minimumAtomizerResistanceOhms) {
        violations.push({
            field: "minimum-resistance",
            actual: device.atomizerResistance,
            limit: mod.minimumAtomizerResistanceOhms,
        });
    }
    if (mod.maximumAtomizerResistanceOhms !== undefined
        && device.atomizerResistance > mod.maximumAtomizerResistanceOhms) {
        violations.push({
            field: "maximum-resistance",
            actual: device.atomizerResistance,
            limit: mod.maximumAtomizerResistanceOhms,
        });
    }
    return violations;
};

export const cRatingFromCurrent = (capacityMah: number, maximumCurrent: number): number =>
    capacityMah > 0 ? (maximumCurrent * 1000) / capacityMah : 0;

export const currentFromCRating = (capacityMah: number, cRating: number): number =>
    (capacityMah / 1000) * cRating;

export const updateBatteryField = (
    battery: BatterySettings,
    field: BatteryField,
    value: number,
    ratingMethod: BatteryRatingMethod = "amps",
): BatterySettings => {
    const next = { ...battery, [field]: value, presetId: "" };
    if (field === "cRating") next.maximumCurrent = currentFromCRating(next.capacityMah, value);
    if (field === "maximumCurrent") next.cRating = cRatingFromCurrent(next.capacityMah, value);
    if (field === "capacityMah" && ratingMethod === "amps") {
        next.cRating = cRatingFromCurrent(value, battery.maximumCurrent);
    }
    if (field === "capacityMah" && ratingMethod === "c-rating") {
        next.maximumCurrent = currentFromCRating(value, battery.cRating);
    }
    return next;
};

export const applyPreset = (battery: BatterySettings, preset: BatteryPreset): BatterySettings => {
    const maximumCurrent = preset.continuousDischargeCurrentAmps
        ?? currentFromCRating(preset.ratedCapacityMah, preset.continuousDischargeCRating ?? 0);
    const cRating = preset.continuousDischargeCRating
        ?? cRatingFromCurrent(preset.ratedCapacityMah, maximumCurrent);
    return {
        ...battery,
        capacityMah: preset.ratedCapacityMah,
        maximumCurrent,
        cRating,
        nominalVoltage: preset.nominalVoltageVolts ?? battery.nominalVoltage,
        presetId: preset.id,
    };
};

export const deviceDefaults = defaultState.device;
export const batteryDefaults = defaultState.battery;
