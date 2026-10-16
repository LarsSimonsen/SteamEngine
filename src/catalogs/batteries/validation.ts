import type { CustomBattery, DefaultBattery } from "./catalog";
import {
    formFactorFromLegacySize,
    type BatteryAccess,
    type BatteryAppearance,
    type BatteryFormFactor,
    type BatteryMarking,
    type BatteryMarkingLocation,
    type BatteryMarkingMethod,
} from "./form-factor";

export type CustomBatteryValidation =
    | { readonly kind: "valid"; readonly battery: CustomBattery }
    | { readonly kind: "invalid"; readonly message: string };

export type CustomBatteryValidationOptions = {
    /** Allows loading an old saved battery whose form factor was never recorded. */
    readonly allowUnknownFormFactor?: boolean;
};

const positiveNumber = (value: unknown): value is number =>
    typeof value === "number" && Number.isFinite(value) && value > 0;

const optionalPositiveNumber = (value: unknown): value is number | undefined =>
    value === undefined || positiveNumber(value);

const optionalText = (value: unknown): value is string | undefined =>
    value === undefined || (typeof value === "string" && value.trim() !== "");

const trimmedOptional = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;

const markingLocations: readonly BatteryMarkingLocation[] = [
    "wrapper",
    "positive-terminal",
    "negative-terminal",
    "packaging",
];

const markingMethods: readonly BatteryMarkingMethod[] = [
    "printed",
    "laser-etched",
    "stamped",
    "barcode",
    "qr-code",
];

const isStringIn = <Value extends string>(value: unknown, values: readonly Value[]): value is Value =>
    typeof value === "string" && values.includes(value as Value);

const batteryAccesses: readonly BatteryAccess[] = ["integrated", "removable"];

const normalizedFormFactor = (value: unknown): BatteryFormFactor | null | undefined => {
    if (value === null || value === undefined) return value;
    if (!value || typeof value !== "object") return undefined;
    const candidate = value as Record<string, unknown>;
    if (candidate.kind === "cylindrical"
        && positiveNumber(candidate.nominalDiameterMm)
        && positiveNumber(candidate.nominalLengthMm)
        && (candidate.sizeCode === undefined
            || (typeof candidate.sizeCode === "string" && /^\d{5}$/.test(candidate.sizeCode.trim())))
        && (candidate.terminalStyle === undefined
            || candidate.terminalStyle === "flat-top"
            || candidate.terminalStyle === "button-top")) {
        return {
            kind: "cylindrical",
            nominalDiameterMm: candidate.nominalDiameterMm,
            nominalLengthMm: candidate.nominalLengthMm,
            ...(typeof candidate.sizeCode === "string" && candidate.sizeCode.trim() !== ""
                ? { sizeCode: candidate.sizeCode.trim() } : {}),
            ...(candidate.terminalStyle === undefined ? {} : {
                terminalStyle: candidate.terminalStyle as "flat-top" | "button-top",
            }),
        };
    }
    if (candidate.kind === "prismatic"
        && positiveNumber(candidate.lengthMm)
        && positiveNumber(candidate.widthMm)
        && positiveNumber(candidate.thicknessMm)) {
        return {
            kind: "prismatic",
            lengthMm: candidate.lengthMm,
            widthMm: candidate.widthMm,
            thicknessMm: candidate.thicknessMm,
        };
    }
    return undefined;
};

const normalizedAppearance = (value: unknown): BatteryAppearance | undefined => {
    if (value === undefined) return undefined;
    if (!value || typeof value !== "object") return undefined;
    const candidate = value as Record<string, unknown>;
    if (!optionalText(candidate.wrapperColor)) return undefined;
    if (candidate.markings !== undefined && !Array.isArray(candidate.markings)) return undefined;
    const markings: BatteryMarking[] = [];
    for (const marking of (candidate.markings ?? []) as unknown[]) {
        if (!marking || typeof marking !== "object") return undefined;
        const item = marking as Record<string, unknown>;
        if (!isStringIn(item.location, markingLocations) || !optionalText(item.text)
            || !isStringIn(item.method, markingMethods) && item.method !== undefined
            || !optionalText(item.notes)) {
            return undefined;
        }
        markings.push({
            location: item.location,
            text: (item.text as string).trim(),
            ...(item.method === undefined ? {} : { method: item.method }),
            ...(trimmedOptional(item.notes) === undefined ? {} : { notes: trimmedOptional(item.notes) }),
        });
    }
    const wrapperColor = trimmedOptional(candidate.wrapperColor);
    return wrapperColor === undefined && markings.length === 0
        ? undefined
        : {
            ...(wrapperColor === undefined ? {} : { wrapperColor }),
            ...(markings.length === 0 ? {} : { markings }),
        };
};

export const validateCustomBattery = (
    value: unknown,
    defaultBatteries: readonly DefaultBattery[],
    options: CustomBatteryValidationOptions = {},
): CustomBatteryValidation => {
    if (!value || typeof value !== "object") {
        return { kind: "invalid", message: "The custom battery must be an object." };
    }
    const candidate = value as Record<string, unknown>;
    if (typeof candidate.id !== "string" || candidate.id.trim() === "") {
        return { kind: "invalid", message: "The custom battery needs an ID." };
    }
    if (defaultBatteries.some((battery) => battery.id === candidate.id)) {
        return { kind: "invalid", message: "A custom battery ID cannot replace a built-in battery." };
    }
    if (typeof candidate.manufacturer !== "string" || candidate.manufacturer.trim() === "") {
        return { kind: "invalid", message: "Enter a manufacturer." };
    }
    if (typeof candidate.model !== "string" || candidate.model.trim() === "") {
        return { kind: "invalid", message: "Enter a model." };
    }
    if (candidate.batteryAccess !== undefined && !isStringIn(candidate.batteryAccess, batteryAccesses)) {
        return { kind: "invalid", message: "Battery access must be integrated or removable." };
    }
    const batteryAccess = candidate.batteryAccess as BatteryAccess | undefined;
    const formFactor = candidate.formFactor === undefined && typeof candidate.size === "string"
        ? formFactorFromLegacySize(candidate.size)
        : normalizedFormFactor(candidate.formFactor);
    if (batteryAccess === "integrated" && formFactor !== undefined && formFactor !== null) {
        return { kind: "invalid", message: "Integrated batteries must not specify a standalone cell form factor." };
    }
    if (batteryAccess !== "integrated" && formFactor === undefined && !options.allowUnknownFormFactor) {
        return { kind: "invalid", message: "Select a cylindrical or prismatic form factor." };
    }
    if (candidate.formFactor !== undefined && normalizedFormFactor(candidate.formFactor) === undefined) {
        return { kind: "invalid", message: "Enter valid form-factor dimensions." };
    }
    if (candidate.size !== undefined && (typeof candidate.size !== "string" || candidate.size.trim() === "")) {
        return { kind: "invalid", message: "Legacy battery size must be blank or contain text." };
    }
    if (candidate.protected !== undefined && typeof candidate.protected !== "boolean") {
        return { kind: "invalid", message: "Protected status must be true, false, or blank." };
    }
    const appearance = normalizedAppearance(candidate.appearance);
    if (candidate.appearance !== undefined && appearance === undefined && candidate.appearance !== null) {
        return { kind: "invalid", message: "Enter valid appearance and marking details." };
    }
    if (!positiveNumber(candidate.ratedCapacityMah)) {
        return { kind: "invalid", message: "Rated capacity must be greater than zero." };
    }
    if (!optionalPositiveNumber(candidate.weightGrams)) {
        return { kind: "invalid", message: "Weight must be blank or greater than zero." };
    }
    if (!optionalPositiveNumber(candidate.continuousDischargeCurrentAmps)) {
        return { kind: "invalid", message: "Continuous discharge current must be blank or greater than zero." };
    }
    if (!optionalPositiveNumber(candidate.continuousDischargeCRating)) {
        return { kind: "invalid", message: "Continuous discharge C rating must be blank or greater than zero." };
    }
    if (candidate.continuousDischargeCurrentAmps === undefined
        && candidate.continuousDischargeCRating === undefined) {
        return { kind: "invalid", message: "Enter a continuous discharge current or C rating." };
    }
    if (!optionalPositiveNumber(candidate.nominalVoltageVolts)) {
        return { kind: "invalid", message: "Nominal voltage must be blank or greater than zero." };
    }
    if (!optionalText(candidate.safetyWarning) || !optionalText(candidate.dataNote)) {
        return { kind: "invalid", message: "Notes must be blank or contain text." };
    }
    if (candidate.clonedFrom !== undefined && (
        typeof candidate.clonedFrom !== "string"
        || !defaultBatteries.some((battery) => battery.id === candidate.clonedFrom)
    )) {
        return { kind: "invalid", message: "The cloned-from battery is unavailable." };
    }

    const manufacturer = candidate.manufacturer.trim();
    const model = candidate.model.trim();
    const safetyWarning = trimmedOptional(candidate.safetyWarning);
    const dataNote = trimmedOptional(candidate.dataNote);
    return {
        kind: "valid",
        battery: {
            id: candidate.id.trim(),
            manufacturer,
            model,
            displayName: `${manufacturer} ${model}`,
            ...(candidate.weightGrams === undefined ? {} : { weightGrams: candidate.weightGrams as number }),
            ratedCapacityMah: candidate.ratedCapacityMah,
            ...(batteryAccess === "integrated"
                ? { batteryAccess, formFactor: null }
                : formFactor === undefined ? {} : { formFactor }),
            ...(batteryAccess !== undefined && batteryAccess !== "integrated" ? { batteryAccess } : {}),
            ...(candidate.protected === undefined ? {} : { protected: candidate.protected as boolean }),
            ...(appearance === undefined ? {} : { appearance }),
            ...(candidate.continuousDischargeCurrentAmps === undefined
                ? {} : { continuousDischargeCurrentAmps: candidate.continuousDischargeCurrentAmps as number }),
            ...(candidate.continuousDischargeCRating === undefined
                ? {} : { continuousDischargeCRating: candidate.continuousDischargeCRating as number }),
            ...(candidate.nominalVoltageVolts === undefined
                ? {} : { nominalVoltageVolts: candidate.nominalVoltageVolts as number }),
            ...(safetyWarning === undefined ? {} : { safetyWarning }),
            ...(dataNote === undefined ? {} : { dataNote }),
            ...(candidate.clonedFrom === undefined ? {} : { clonedFrom: candidate.clonedFrom as string }),
        },
    };
};
