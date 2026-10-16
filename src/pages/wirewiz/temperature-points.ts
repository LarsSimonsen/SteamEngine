export const temperaturePointLimits = {
    minimumCount: 2,
    maximumCount: 20,
    absoluteZeroCelsius: -273.15,
} as const;

export type TemperaturePointIssue =
    | "empty"
    | "number"
    | "minimum"
    | "maximum"
    | "absolute-zero"
    | "duplicate"
    | "ascending";

export type TemperaturePointValidation =
    | { readonly kind: "valid"; readonly values: readonly number[] }
    | { readonly kind: "invalid"; readonly issue: TemperaturePointIssue };

const decimalNumberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;

export const validateTemperaturePoints = (
    values: readonly number[],
): TemperaturePointValidation => {
    if (values.length < temperaturePointLimits.minimumCount) {
        return { kind: "invalid", issue: "minimum" };
    }
    if (values.length > temperaturePointLimits.maximumCount) {
        return { kind: "invalid", issue: "maximum" };
    }
    if (values.some((value) => !Number.isFinite(value))) {
        return { kind: "invalid", issue: "number" };
    }
    if (values.some((value) => value < temperaturePointLimits.absoluteZeroCelsius)) {
        return { kind: "invalid", issue: "absolute-zero" };
    }
    if (new Set(values).size !== values.length) {
        return { kind: "invalid", issue: "duplicate" };
    }
    if (values.some((value, index) => index > 0 && value <= values[index - 1])) {
        return { kind: "invalid", issue: "ascending" };
    }
    return { kind: "valid", values: [...values] };
};

export const parseTemperaturePointDraft = (draft: string): TemperaturePointValidation => {
    if (draft.trim() === "") return { kind: "invalid", issue: "minimum" };
    const tokens = draft.split(",").map((token) => token.trim());
    if (tokens.some((token) => token === "")) return { kind: "invalid", issue: "empty" };
    if (tokens.some((token) => !decimalNumberPattern.test(token))) {
        return { kind: "invalid", issue: "number" };
    }
    return validateTemperaturePoints(tokens.map(Number));
};

export const dna200TemperaturePoints = (temperatures: readonly number[]): readonly number[] => {
    if (temperatures.includes(20)) return [...temperatures];
    const insertionIndex = temperatures.findIndex((temperature) => temperature > 20);
    if (insertionIndex === -1) return [...temperatures, 20];
    return [
        ...temperatures.slice(0, insertionIndex),
        20,
        ...temperatures.slice(insertionIndex),
    ];
};

export const sameTemperaturePoints = (
    left: readonly number[],
    right: readonly number[],
): boolean => left.length === right.length && left.every((value, index) => value === right[index]);
