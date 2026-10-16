import {
    formatModDisplayName,
    modAdditionalCapabilities,
    modOutputControlModes,
    type CustomMod,
    type DefaultMod,
    type ModOperatingFeatures,
} from "./catalog";

export type CustomModValidation =
    | { readonly kind: "valid"; readonly mod: CustomMod }
    | { readonly kind: "invalid"; readonly message: string };

const positiveNumber = (value: unknown): value is number =>
    typeof value === "number" && Number.isFinite(value) && value > 0;

const optionalPositiveNumber = (value: unknown): value is number | undefined =>
    value === undefined || positiveNumber(value);

const optionalText = (value: unknown): value is string | undefined =>
    value === undefined || (typeof value === "string" && value.trim() !== "");

const trimmedOptional = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;

const supportStatuses = new Set(["supported", "unsupported", "unknown"]);

const hasExactSupportKeys = (value: unknown, keys: readonly string[]): value is Record<string, unknown> => {
    if (!value || typeof value !== "object") return false;
    const candidateKeys = Object.keys(value).sort();
    return candidateKeys.length === keys.length
        && candidateKeys.every((key, index) => key === [...keys].sort()[index])
        && Object.values(value).every((status) => supportStatuses.has(status as string));
};

export const isModOperatingFeatures = (value: unknown): value is ModOperatingFeatures => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Record<string, unknown>;
    return Object.keys(candidate).sort().join(",") === "capabilities,outputModes"
        && hasExactSupportKeys(candidate.outputModes, modOutputControlModes)
        && hasExactSupportKeys(candidate.capabilities, modAdditionalCapabilities);
};

export const validateCustomMod = (
    value: unknown,
    defaultMods: readonly DefaultMod[],
): CustomModValidation => {
    if (!value || typeof value !== "object") {
        return { kind: "invalid", message: "The custom mod must be an object." };
    }
    const candidate = value as Record<string, unknown>;
    if (typeof candidate.id !== "string" || candidate.id.trim() === "") {
        return { kind: "invalid", message: "The custom mod needs an ID." };
    }
    if (defaultMods.some((mod) => mod.id === candidate.id)) {
        return { kind: "invalid", message: "A custom mod ID cannot replace a built-in mod." };
    }
    if (candidate.manufacturer !== null && (
        typeof candidate.manufacturer !== "string" || candidate.manufacturer.trim() === ""
    )) {
        return { kind: "invalid", message: "Manufacturer must be blank or contain text." };
    }
    if (typeof candidate.model !== "string" || candidate.model.trim() === "") {
        return { kind: "invalid", message: "Enter a model." };
    }
    if (!optionalText(candidate.variant)) {
        return { kind: "invalid", message: "Variant must be blank or contain text." };
    }
    for (const [property, label] of [
        ["maximumOutputVoltageVolts", "Maximum output voltage"],
        ["maximumOutputPowerWatts", "Maximum output power"],
        ["maximumOutputCurrentAmps", "Maximum output current"],
    ] as const) {
        if (!positiveNumber(candidate[property])) {
            return { kind: "invalid", message: `${label} must be greater than zero.` };
        }
    }
    if (!optionalPositiveNumber(candidate.weightGrams)) {
        return { kind: "invalid", message: "Weight must be blank or greater than zero." };
    }
    if (!optionalPositiveNumber(candidate.minimumAtomizerResistanceOhms)) {
        return { kind: "invalid", message: "Minimum atomizer resistance must be blank or greater than zero." };
    }
    if (!optionalPositiveNumber(candidate.maximumAtomizerResistanceOhms)) {
        return { kind: "invalid", message: "Maximum atomizer resistance must be blank or greater than zero." };
    }
    if (typeof candidate.minimumAtomizerResistanceOhms === "number"
        && typeof candidate.maximumAtomizerResistanceOhms === "number"
        && candidate.maximumAtomizerResistanceOhms < candidate.minimumAtomizerResistanceOhms) {
        return { kind: "invalid", message: "Maximum resistance must not be less than minimum resistance." };
    }
    if (candidate.basedOnPresetId !== undefined && (
        typeof candidate.basedOnPresetId !== "string"
        || !defaultMods.some((mod) => mod.id === candidate.basedOnPresetId)
    )) {
        return { kind: "invalid", message: "The based-on preset is unavailable." };
    }
    if (candidate.clonedFrom !== undefined && (
        typeof candidate.clonedFrom !== "string"
        || !defaultMods.some((mod) => mod.id === candidate.clonedFrom)
    )) {
        return { kind: "invalid", message: "The cloned-from mod is unavailable." };
    }
    if (candidate.operatingFeatures !== undefined && !isModOperatingFeatures(candidate.operatingFeatures)) {
        return { kind: "invalid", message: "Operating modes and capabilities are invalid." };
    }

    const manufacturer = candidate.manufacturer === null ? null : candidate.manufacturer.trim();
    const model = candidate.model.trim();
    const variant = trimmedOptional(candidate.variant);
    const identity = { manufacturer, model, ...(variant === undefined ? {} : { variant }) };
    return {
        kind: "valid",
        mod: {
            id: candidate.id.trim(),
            ...identity,
            displayName: formatModDisplayName(identity),
            ...(candidate.weightGrams === undefined ? {} : { weightGrams: candidate.weightGrams as number }),
            maximumOutputVoltageVolts: candidate.maximumOutputVoltageVolts as number,
            maximumOutputPowerWatts: candidate.maximumOutputPowerWatts as number,
            maximumOutputCurrentAmps: candidate.maximumOutputCurrentAmps as number,
            ...(candidate.minimumAtomizerResistanceOhms === undefined
                ? {} : { minimumAtomizerResistanceOhms: candidate.minimumAtomizerResistanceOhms as number }),
            ...(candidate.maximumAtomizerResistanceOhms === undefined
                ? {} : { maximumAtomizerResistanceOhms: candidate.maximumAtomizerResistanceOhms as number }),
            ...(candidate.basedOnPresetId === undefined
                ? {} : { basedOnPresetId: candidate.basedOnPresetId as string }),
            ...(candidate.clonedFrom === undefined ? {} : { clonedFrom: candidate.clonedFrom as string }),
            ...(candidate.operatingFeatures === undefined
                ? {} : { operatingFeatures: candidate.operatingFeatures as ModOperatingFeatures }),
        },
    };
};
