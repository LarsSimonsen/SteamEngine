import { type ModProperties } from "../../catalogs/mods/catalog";

export type ModLimits = {
    readonly maxPower: number;
    readonly maxVoltage: number;
    readonly maxCurrent: number;
    readonly minResistance?: number;
    readonly maxResistance?: number;
};

export type ModPreset = ModProperties;

export type ModRangeDrafts = Readonly<{
    readonly maxPower: string;
    readonly maxVoltage: string;
    readonly maxCurrent: string;
    readonly minResistance: string;
    readonly maxResistance: string;
}>;

export type ModRangeValues = Readonly<{
    readonly minimumResistance: number;
    readonly maximumResistance: number;
    readonly theoreticalMedianResistance: number;
    readonly medianResistance: number;
    readonly sweetSpotResistance: number;
    readonly currentLimitRequiredVoltage: number;
    readonly currentLimitResistance: number;
    readonly voltageLimitRequiredCurrent: number;
    readonly voltageLimitResistance: number;
}>;

export type PowerPoint = Readonly<{
    readonly resistance: number;
    readonly power: number;
}>;

export type ModRangeGraphBounds = Readonly<{
    readonly minimumResistance: number;
    readonly maximumResistance: number;
    readonly globalMaximumPower: number;
    readonly rightThresholdPower: number;
}>;

export type ModRangeResult =
    | Readonly<{ kind: 'valid'; values: ModRangeValues }>
    | Readonly<{ kind: 'invalid'; message: string }>;

export type DraftParseResult =
    | Readonly<{ kind: 'valid'; limits: ModLimits }>
    | Readonly<{ kind: 'invalid'; message: string }>;

export type ModRangeFieldErrors = Partial<Readonly<Record<keyof ModRangeDrafts, string>>>;

export const defaultModLimits = {
    maxPower: 15,
    maxVoltage: 6,
    maxCurrent: 3.5,
    minResistance: 1.2
} as const satisfies ModLimits;

const parsePositive = (raw: string, label: string, allowBlank: boolean): number | undefined | string => {
    if (raw.trim() === '') return allowBlank ? undefined : `Enter a value for ${label}.`;
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? value : `Enter a positive value for ${label}.`;
};

export const modRangeFieldErrors = (drafts: ModRangeDrafts): ModRangeFieldErrors => {
    const definitions = [
        ['maxPower', 'maximum power', false],
        ['maxVoltage', 'maximum voltage', false],
        ['maxCurrent', 'maximum current', false],
        ['minResistance', 'minimum resistance', true],
        ['maxResistance', 'maximum resistance', true],
    ] as const satisfies ReadonlyArray<readonly [keyof ModRangeDrafts, string, boolean]>;
    const errors: Partial<Record<keyof ModRangeDrafts, string>> = {};
    definitions.forEach(([field, label, allowBlank]) => {
        const parsed = parsePositive(drafts[field], label, allowBlank);
        if (typeof parsed === 'string') errors[field] = parsed;
    });
    const minimum = Number(drafts.minResistance);
    const maximum = Number(drafts.maxResistance);
    if (drafts.minResistance.trim() !== '' && drafts.maxResistance.trim() !== ''
        && Number.isFinite(minimum) && Number.isFinite(maximum) && maximum < minimum) {
        errors.maxResistance = 'The maximum resistance must be greater than the minimum resistance.';
    }
    return errors;
};

export const parseModRangeDrafts = (drafts: ModRangeDrafts): DraftParseResult => {
    const fieldErrors = modRangeFieldErrors(drafts);
    const firstFieldError = Object.values(fieldErrors)[0];
    if (firstFieldError !== undefined) return { kind: 'invalid', message: firstFieldError };
    const maxPower = parsePositive(drafts.maxPower, 'maximum power', false);
    const maxVoltage = parsePositive(drafts.maxVoltage, 'maximum voltage', false);
    const maxCurrent = parsePositive(drafts.maxCurrent, 'maximum current', false);
    const minResistance = parsePositive(drafts.minResistance, 'minimum resistance', true);
    const maxResistance = parsePositive(drafts.maxResistance, 'maximum resistance', true);
    const values = [maxPower, maxVoltage, maxCurrent, minResistance, maxResistance];
    const error = values.find((value): value is string => typeof value === 'string');
    if (error) return { kind: 'invalid', message: error };
    if (maxPower === undefined || maxVoltage === undefined || maxCurrent === undefined) {
        return { kind: 'invalid', message: 'Maximum power, voltage, and current are required.' };
    }
    return {
        kind: 'valid',
        limits: {
            maxPower: maxPower as number,
            maxVoltage: maxVoltage as number,
            maxCurrent: maxCurrent as number,
            minResistance: minResistance as number | undefined,
            maxResistance: maxResistance as number | undefined
        }
    };
};

export const limitsFromPreset = (preset: ModPreset): ModLimits => ({
    maxPower: preset.maximumOutputPowerWatts,
    maxVoltage: preset.maximumOutputVoltageVolts,
    maxCurrent: preset.maximumOutputCurrentAmps,
    ...(preset.minimumAtomizerResistanceOhms === undefined
        ? {}
        : { minResistance: preset.minimumAtomizerResistanceOhms }),
    ...(preset.maximumAtomizerResistanceOhms === undefined
        ? {}
        : { maxResistance: preset.maximumAtomizerResistanceOhms })
});
