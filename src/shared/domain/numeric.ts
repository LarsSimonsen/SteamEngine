export const normalizeNumericInput = (raw: string): string => raw.replace(",", ".");

export const parseNumericInput = (raw: string): number | undefined => {
    const normalized = normalizeNumericInput(raw.trim());
    if (normalized === "" || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return undefined;
    const value = Number(normalized);
    return Number.isFinite(value) ? value : undefined;
};

export const formatDisplayNumber = (
    value: number,
    decimals = 2,
    locale: string = "en",
): string => Number.isFinite(value)
    ? new Intl.NumberFormat(locale === "en" ? "en-US" : locale, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: 0,
        useGrouping: false,
    }).format(value)
    : "";
