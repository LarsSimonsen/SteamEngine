import type { Material, TemperaturePoint } from "./catalog";

export type TfrNormalizationMethod = "existing" | "interpolated" | "extrapolated";

export type TfrNormalizationResult =
    | {
            readonly kind: "valid";
            readonly points: readonly TemperaturePoint[];
            readonly method: TfrNormalizationMethod;
        }
    | { readonly kind: "invalid"; readonly message: string };

const factorBetween = (
    left: TemperaturePoint,
    right: TemperaturePoint,
    temperatureCelsius: number,
): number => left[1] + ((temperatureCelsius - left[0]) * (right[1] - left[1])) / (right[0] - left[0]);

export type TemperatureFactorResult =
    | {
            readonly kind: "available";
            readonly factor: number;
            readonly extrapolated: boolean;
        }
    | { readonly kind: "unavailable" };

export const hasTemperatureData = (material: Material): boolean =>
    material.tfr !== undefined || material.tcr !== undefined;

export const interpolateTemperatureCurve = (
    points: readonly TemperaturePoint[],
    temperatureCelsius: number,
): TemperatureFactorResult => {
    if (points.length < 2) return { kind: "unavailable" };
    const rightIndex = points.findIndex((point) => point[0] >= temperatureCelsius);
    const pair = rightIndex === -1
        ? [points[points.length - 2], points[points.length - 1]] as const
        : rightIndex === 0
            ? [points[0], points[1]] as const
            : [points[rightIndex - 1], points[rightIndex]] as const;
    return {
        kind: "available",
        factor: factorBetween(pair[0], pair[1], temperatureCelsius),
        extrapolated: temperatureCelsius < points[0][0]
            || temperatureCelsius > points[points.length - 1][0],
    };
};

export const resistanceFactorAtTemperature = (
    material: Material,
    temperatureCelsius: number,
): TemperatureFactorResult => {
    if (material.tfr) return interpolateTemperatureCurve(material.tfr, temperatureCelsius);
    if (material.tcr !== undefined) {
        return {
            kind: "available",
            factor: 1 + material.tcr * (temperatureCelsius - 20),
            extrapolated: false,
        };
    }
    return { kind: "unavailable" };
};

export const normalizeTfr = (value: unknown): TfrNormalizationResult => {
    if (!Array.isArray(value) || value.length < 2) {
        return { kind: "invalid", message: "TFR needs at least two temperature points." };
    }
    const points: TemperaturePoint[] = [];
    for (const candidate of value) {
        if (!Array.isArray(candidate) || candidate.length !== 2) {
            return { kind: "invalid", message: "Every TFR row needs a temperature and resistance factor." };
        }
        const [temperatureCelsius, resistanceFactor] = candidate as readonly unknown[];
        if (typeof temperatureCelsius !== "number" || !Number.isFinite(temperatureCelsius)) {
            return { kind: "invalid", message: "Every TFR temperature must be a finite number." };
        }
        if (typeof resistanceFactor !== "number" || !Number.isFinite(resistanceFactor) || resistanceFactor <= 0) {
            return { kind: "invalid", message: "Every TFR resistance factor must be greater than zero." };
        }
        points.push([temperatureCelsius, resistanceFactor]);
    }
    points.sort((left, right) => left[0] - right[0]);
    if (points.some((point, index) => index > 0 && point[0] === points[index - 1][0])) {
        return { kind: "invalid", message: "TFR temperatures must be unique." };
    }

    const referencePoint = points.find((point) => point[0] === 20);
    let referenceFactor: number;
    let method: TfrNormalizationMethod;
    if (referencePoint) {
        referenceFactor = referencePoint[1];
        method = "existing";
    } else {
        const rightIndex = points.findIndex((point) => point[0] > 20);
        const pair = rightIndex === 0
            ? [points[0], points[1]] as const
            : rightIndex === -1
                ? [points[points.length - 2], points[points.length - 1]] as const
                : [points[rightIndex - 1], points[rightIndex]] as const;
        referenceFactor = factorBetween(pair[0], pair[1], 20);
        method = rightIndex > 0 && rightIndex < points.length ? "interpolated" : "extrapolated";
    }
    if (!Number.isFinite(referenceFactor) || referenceFactor <= 0) {
        return { kind: "invalid", message: "The TFR curve does not produce a positive resistance factor at 20 °C." };
    }

    const normalized: TemperaturePoint[] = points.map(([temperature, factor]) => [
        temperature,
        temperature === 20 ? 1 : factor / referenceFactor,
    ]);
    if (!referencePoint) normalized.push([20, 1]);
    normalized.sort((left, right) => left[0] - right[0]);
    return { kind: "valid", points: normalized, method };
};
