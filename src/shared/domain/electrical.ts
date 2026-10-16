export type ParallelResistanceResult =
    | { readonly kind: "valid"; readonly resistance: number }
    | { readonly kind: "invalid"; readonly message: string };

export const parallelResistance = (
    resistances: readonly number[],
): ParallelResistanceResult => {
    if (resistances.length === 0) {
        return { kind: "invalid", message: "A parallel network needs at least one resistance." };
    }
    if (resistances.some((resistance) => !Number.isFinite(resistance) || resistance < 0)) {
        return { kind: "invalid", message: "Parallel resistances must be finite, non-negative numbers." };
    }
    if (resistances.some((resistance) => resistance === 0)) {
        return { kind: "valid", resistance: 0 };
    }
    return {
        kind: "valid",
        resistance: 1 / resistances.reduce((sum, resistance) => sum + 1 / resistance, 0),
    };
};

export const currentFromVoltageAndResistance = (voltage: number, resistance: number): number =>
    voltage / resistance;

export const currentFromPowerAndResistance = (power: number, resistance: number): number =>
    Math.sqrt(power / resistance);

export const currentFromPowerAndVoltage = (power: number, voltage: number): number =>
    power / voltage;

export const voltageFromCurrentAndResistance = (current: number, resistance: number): number =>
    current * resistance;

export const voltageFromPowerAndResistance = (power: number, resistance: number): number =>
    Math.sqrt(power * resistance);

export const voltageFromPowerAndCurrent = (power: number, current: number): number =>
    power / current;

export const powerFromVoltageAndCurrent = (voltage: number, current: number): number =>
    voltage * current;

export const powerFromCurrentAndResistance = (current: number, resistance: number): number =>
    current * current * resistance;

export const powerFromVoltageAndResistance = (voltage: number, resistance: number): number =>
    (voltage * voltage) / resistance;

export const resistanceFromVoltageAndCurrent = (voltage: number, current: number): number =>
    voltage / current;

export const resistanceFromVoltageAndPower = (voltage: number, power: number): number =>
    (voltage * voltage) / power;

export const resistanceFromPowerAndCurrent = (power: number, current: number): number =>
    power / (current * current);
