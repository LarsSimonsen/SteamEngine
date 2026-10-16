export type OhmField = 'resistance' | 'voltage' | 'current' | 'power';
export type OhmFieldCode = 'r' | 'u' | 'i' | 'p';

export type OhmValues = Readonly<Record<OhmField, number>>;

export type LockSettings = {
    readonly resistanceTarget: Exclude<OhmField, 'resistance'>;
    readonly voltageTarget: Exclude<OhmField, 'voltage'>;
    readonly currentTarget: Exclude<OhmField, 'current'>;
    readonly powerTarget: Exclude<OhmField, 'power'>;
    readonly advancedMode: boolean;
    readonly primaryField?: OhmField;
    readonly secondaryField?: OhmField;
};

export type OhmState = {
    readonly values: OhmValues;
    readonly lockSettings: LockSettings;
};

export type LockRule = Readonly<{
    readonly adjustedField: OhmField;
    readonly lockedField: OhmField;
}>;

export const fieldCodeByField = {
    resistance: 'r',
    voltage: 'u',
    current: 'i',
    power: 'p'
} as const satisfies Readonly<Record<OhmField, OhmFieldCode>>;

const fieldByCode = {
    r: 'resistance',
    u: 'voltage',
    i: 'current',
    p: 'power'
} as const satisfies Readonly<Record<OhmFieldCode, OhmField>>;

export const defaultValues = {
    resistance: 2.5,
    voltage: 3.5,
    current: 1.4,
    power: 4.9
} as const satisfies OhmValues;

export const defaultLockSettings = {
    resistanceTarget: 'voltage',
    voltageTarget: 'resistance',
    currentTarget: 'resistance',
    powerTarget: 'resistance',
    advancedMode: false,
    primaryField: 'resistance',
    secondaryField: 'voltage'
} as const satisfies LockSettings;

export const isDefaultLockSettings = (settings: LockSettings): boolean =>
    settings.resistanceTarget === defaultLockSettings.resistanceTarget
    && settings.voltageTarget === defaultLockSettings.voltageTarget
    && settings.currentTarget === defaultLockSettings.currentTarget
    && settings.powerTarget === defaultLockSettings.powerTarget
    && settings.advancedMode === defaultLockSettings.advancedMode
    && settings.primaryField === defaultLockSettings.primaryField
    && settings.secondaryField === defaultLockSettings.secondaryField;

export const isDefaultOhmValues = (values: OhmValues): boolean =>
    values.resistance === defaultValues.resistance
    && values.voltage === defaultValues.voltage
    && values.current === defaultValues.current
    && values.power === defaultValues.power;

const lockTargetPropertyByField = {
    resistance: 'resistanceTarget',
    voltage: 'voltageTarget',
    current: 'currentTarget',
    power: 'powerTarget'
} as const satisfies Readonly<Record<OhmField, keyof LockSettings>>;

const ohmFields = ['resistance', 'voltage', 'current', 'power'] as const;
const ohmFieldCodes = ['r', 'u', 'i', 'p'] as const;

export const getLockTargetForField = (settings: LockSettings, field: OhmField): OhmField =>
    settings[lockTargetPropertyByField[field]];

export const getLockRules = (settings: LockSettings): readonly LockRule[] =>
    ohmFields.map((adjustedField) => ({
        adjustedField,
        lockedField: getLockTargetForField(settings, adjustedField)
    }));

export const createDefaultState = (): OhmState => ({
    values: { ...defaultValues },
    lockSettings: { ...defaultLockSettings }
});

export const resetOhmValues = (state: OhmState): OhmState => ({
    ...state,
    values: { ...defaultValues },
});

export const resetOhmLockSettings = (state: OhmState): OhmState => ({
    ...state,
    lockSettings: { ...defaultLockSettings },
});

export const selectSimpleLock = (settings: LockSettings, field: OhmField): LockSettings => {
    const secondaryField = field === settings.primaryField
        ? settings.secondaryField
        : settings.primaryField ?? settings.secondaryField;
    const fallbackField = secondaryField && secondaryField !== field
        ? secondaryField
        : ohmFields.find((candidate) => candidate !== field)!;
    return setSimpleLockPair(settings, field, fallbackField);
};

export const setSimpleLockPair = (
    settings: LockSettings,
    primaryField: OhmField,
    secondaryField: OhmField,
): LockSettings => {
    if (primaryField === secondaryField) return settings;
    const next = { ...settings, primaryField, secondaryField };
    if (primaryField !== 'resistance') next.resistanceTarget = primaryField;
    else if (secondaryField !== 'resistance') next.resistanceTarget = secondaryField;
    if (primaryField !== 'voltage') next.voltageTarget = primaryField;
    else if (secondaryField !== 'voltage') next.voltageTarget = secondaryField;
    if (primaryField !== 'current') next.currentTarget = primaryField;
    else if (secondaryField !== 'current') next.currentTarget = secondaryField;
    if (primaryField !== 'power') next.powerTarget = primaryField;
    else if (secondaryField !== 'power') next.powerTarget = secondaryField;
    return next;
};

export const setCustomLock = (settings: LockSettings, field: OhmField, lock: OhmField): LockSettings => {
    const next = { ...settings, primaryField: undefined, secondaryField: undefined };
    if (field === 'resistance' && lock !== 'resistance') { next.resistanceTarget = lock; }
    if (field === 'voltage' && lock !== 'voltage') { next.voltageTarget = lock; }
    if (field === 'current' && lock !== 'current') { next.currentTarget = lock; }
    if (field === 'power' && lock !== 'power') { next.powerTarget = lock; }
    return next;
};

const isField = (value: unknown): value is OhmField =>
    ohmFields.includes(value as OhmField);

const isFieldCode = (value: unknown): value is OhmFieldCode =>
    ohmFieldCodes.includes(value as OhmFieldCode);

const readField = (value: unknown): OhmField | undefined => {
    if (isField(value)) return value;
    return isFieldCode(value) ? fieldByCode[value] : undefined;
};

const asRecord = (input: unknown): Readonly<Record<string, unknown>> =>
    typeof input === 'object' && input !== null ? input as Readonly<Record<string, unknown>> : {};

export const normalizeLockSettings = (input: unknown): LockSettings => {
    const candidate = asRecord(input);
    const resistance = readField(candidate.resistanceTarget ?? candidate.rlock);
    const voltage = readField(candidate.voltageTarget ?? candidate.ulock);
    const current = readField(candidate.currentTarget ?? candidate.ilock);
    const power = readField(candidate.powerTarget ?? candidate.plock);
    const primary = readField(candidate.primaryField ?? candidate.lockbtn1);
    const secondary = readField(candidate.secondaryField ?? candidate.lockbtn2);
    return {
        resistanceTarget: resistance && resistance !== 'resistance' ? resistance : defaultLockSettings.resistanceTarget,
        voltageTarget: voltage && voltage !== 'voltage' ? voltage : defaultLockSettings.voltageTarget,
        currentTarget: current && current !== 'current' ? current : defaultLockSettings.currentTarget,
        powerTarget: power && power !== 'power' ? power : defaultLockSettings.powerTarget,
        advancedMode: candidate.advancedMode === true || candidate.lockadvanced === true,
        primaryField: primary,
        secondaryField: secondary
    };
};
