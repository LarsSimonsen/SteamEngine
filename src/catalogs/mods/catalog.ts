import type { CatalogEntryMetadata } from "../entry-metadata";

export type ModIdentity = Readonly<{
    readonly id: string;
    readonly slug?: string;
    readonly aliases?: readonly string[];
    readonly description?: string;
    readonly manufacturer: string | null;
    readonly model: string;
    readonly variant?: string;
}>;

export type ModBatteryConfiguration = Readonly<{
    readonly id: string;
    readonly profileIds: readonly string[];
    readonly format: string;
    readonly seriesCount: number | null;
    readonly parallelCount: number | null;
    readonly support: "native" | "adapted" | "alternative";
    readonly manufacturerClaimedCapacityMah?: number;
    readonly nominalPackVoltageVolts?: number;
}>;

export type ModBatteryInput = Readonly<{
    readonly id: string;
    readonly seriesCount: number;
    readonly parallelCountConstraint: "not-board-constrained";
    readonly minimumInputVoltageVolts: number | null;
    readonly typicalInputVoltageVolts: number | null;
    readonly maximumInputVoltageVolts: number | null;
    readonly profileIds: readonly string[];
}>;

export const modOutputControlModes = ["voltage", "power", "current"] as const;

export type ModOutputControlMode = typeof modOutputControlModes[number];

export const modAdditionalCapabilities = [
    "temperatureControl",
    "bypass",
    "powerCurve",
    "temperatureCurve",
    "configurableTcr",
    "preheat",
    "replay",
    "smartMode",
] as const;

export type ModAdditionalCapability = typeof modAdditionalCapabilities[number];

export type ModFeatureSupport = "supported" | "unsupported" | "unknown";

export type ModOperatingFeatures = Readonly<{
    readonly outputModes: Readonly<Record<ModOutputControlMode, ModFeatureSupport>>;
    readonly capabilities: Readonly<Record<ModAdditionalCapability, ModFeatureSupport>>;
}>;

export type ModProperties = ModIdentity & Readonly<{
    readonly displayName: string;
    readonly basedOnPresetId?: string;
    readonly batteryType?: "removable" | "non-removable";
    readonly batteryConfigurations?: readonly ModBatteryConfiguration[];
    readonly supportedBatteryInputs?: readonly ModBatteryInput[];
    readonly operatingFeatures?: ModOperatingFeatures;
    /** Weight of the device or standalone board represented by this profile. */
    readonly weightGrams?: number;
    readonly maximumOutputVoltageVolts: number;
    readonly maximumOutputPowerWatts: number;
    readonly maximumOutputCurrentAmps: number;
    readonly minimumAtomizerResistanceOhms?: number;
    readonly maximumAtomizerResistanceOhms?: number;
}>;

export type DefaultMod = ModProperties & CatalogEntryMetadata;

export type CustomMod = ModProperties & {
    readonly clonedFrom?: string;
};

export type Mod = DefaultMod | CustomMod;

export const formatModDisplayName = (mod: Pick<ModIdentity, "manufacturer" | "model" | "variant">): string => {
    const identity = [mod.manufacturer, mod.model].filter(Boolean).join(" ");
    return mod.variant === undefined ? identity : `${identity} (${mod.variant})`;
};
