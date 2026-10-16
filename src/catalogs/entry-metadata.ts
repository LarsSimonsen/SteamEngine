export type IntroductionEvent = "market-availability" | "official-announcement";

export type IntroductionBoundRelation = "no-earlier-than" | "no-later-than";

export type CatalogIntroductionBound = Readonly<{
    /** Reduced-precision ISO 8601 date: YYYY, YYYY-MM, or YYYY-MM-DD. */
    date: string;
    event: IntroductionEvent;
    /** Whether this bound limits the earliest or latest possible event date. */
    relation: IntroductionBoundRelation;
}>;

export type CatalogIntroduction = Readonly<{
    /** A lower bound for the actual first market-introduction event. */
    earliest?: CatalogIntroductionBound;
    /** An upper bound for the actual first market-introduction event. */
    latest?: CatalogIntroductionBound;
}>;

/** Public metadata that generated default catalog entries may carry besides their properties. */
export type CatalogEntryMetadata = Readonly<{
    introduction?: CatalogIntroduction | null;
    /** Whether the entry starts visible in calculator lists before the user customizes them. */
    initiallyVisible?: boolean;
}>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

export const isReducedPrecisionIsoDate = (value: string): boolean => {
    const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(value);
    if (match === null) {
        return false;
    }

    const year = Number(match[1]);
    const month = match[2] === undefined ? undefined : Number(match[2]);
    const day = match[3] === undefined ? undefined : Number(match[3]);
    if (year === 0 || (month !== undefined && (month < 1 || month > 12))) {
        return false;
    }
    if (day === undefined) {
        return true;
    }

    const parsed = new Date(Date.UTC(year, month! - 1, day));
    return parsed.getUTCFullYear() === year
        && parsed.getUTCMonth() === month! - 1
        && parsed.getUTCDate() === day;
};

const reducedDateBounds = (value: string): readonly [number, number] => {
    const [year, month, day] = value.split("-").map(Number);
    const start = Date.UTC(year, (month ?? 1) - 1, day ?? 1);
    const end = day !== undefined
        ? start
        : month !== undefined
            ? Date.UTC(year, month, 0)
            : Date.UTC(year, 11, 31);
    return [start, end];
};

export const isCatalogIntroduction = (value: unknown): value is CatalogIntroduction => {
    if (!isRecord(value)
        || Object.keys(value).some((key) => key !== "earliest" && key !== "latest")
        || (value.earliest === undefined && value.latest === undefined)) {
        return false;
    }

    const isBound = (bound: unknown, relation: IntroductionBoundRelation): bound is CatalogIntroductionBound => {
        return isRecord(bound)
            && Object.keys(bound).length === 3
            && typeof bound.date === "string"
            && isReducedPrecisionIsoDate(bound.date)
            && (bound.event === "market-availability" || bound.event === "official-announcement")
            && bound.relation === relation;
    };

    if (value.earliest !== undefined && !isBound(value.earliest, "no-earlier-than")) return false;
    if (value.latest !== undefined && !isBound(value.latest, "no-later-than")) return false;
    if (value.earliest === undefined || value.latest === undefined) return true;

    return reducedDateBounds(value.earliest.date)[0] <= reducedDateBounds(value.latest.date)[1];
};
