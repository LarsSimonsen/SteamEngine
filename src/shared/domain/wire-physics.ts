export const roundCrossSectionArea = (diameterMm: number): number =>
    Math.PI * (diameterMm / 2) ** 2;

export const rectangularCrossSectionArea = (widthMm: number, thicknessMm: number): number =>
    widthMm * thicknessMm;

export const resistancePerLength = (resistivityOhmMm2PerM: number, areaMm2: number): number =>
    resistivityOhmMm2PerM / (areaMm2 * 1000);

export const resistanceForLength = (
    resistivityOhmMm2PerM: number,
    lengthMm: number,
    areaMm2: number,
): number => resistancePerLength(resistivityOhmMm2PerM, areaMm2) * lengthMm;
