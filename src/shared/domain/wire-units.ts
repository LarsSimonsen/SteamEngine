const millimetresPerInch = 25.4;
const awgReferenceInches = 0.005;

export const inchesToMm = (value: number): number => value * millimetresPerInch;

export const mmToInches = (value: number): number => value / millimetresPerInch;

export const awgToInches = (awg: number): number =>
    awgReferenceInches * 92 ** ((36 - awg) / 39);

export const inchesToAwg = (inches: number): number =>
    -39 * Math.log(inches / awgReferenceInches) / Math.log(92) + 36;

export const awgToMm = (awg: number): number => inchesToMm(awgToInches(awg));

export const mmToAwg = (mm: number): number => inchesToAwg(mmToInches(mm));
