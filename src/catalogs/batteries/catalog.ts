import type { CatalogEntryMetadata } from "../entry-metadata";
import type { BatteryAccess, BatteryAppearance, BatteryFormFactor } from "./form-factor";

export type BatteryProperties = {
    readonly id: string;
    readonly slug?: string;
    readonly aliases?: readonly string[];
    readonly description?: string;
    readonly manufacturer: string;
    readonly model: string;
    /** Null means the source is known not to have a recoverable cell form factor. */
    readonly formFactor?: BatteryFormFactor | null;
    /** Omitted means a removable cell; integrated means an internal mod battery pack. */
    readonly batteryAccess?: BatteryAccess;
    readonly protected?: boolean;
    readonly appearance?: BatteryAppearance;
    readonly displayName: string;
    /** Weight of the cell, including its wrapper, protection, and terminals; for packs, the whole pack. */
    readonly weightGrams?: number;
    readonly ratedCapacityMah: number;
    readonly continuousDischargeCurrentAmps?: number;
    readonly continuousDischargeCRating?: number;
    readonly nominalVoltageVolts?: number;
    readonly safetyWarning?: string;
    readonly dataNote?: string;
};

export type DefaultBattery = BatteryProperties & CatalogEntryMetadata;

export type CustomBattery = BatteryProperties & {
    readonly clonedFrom?: string;
};

export type Battery = DefaultBattery | CustomBattery;
