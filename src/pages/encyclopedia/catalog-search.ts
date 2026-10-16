const normalizedSearchText = (value: string): string => value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

const editDistance = (left: string, right: string): number => {
    const rows = Array.from({ length: left.length + 1 }, (_, index) => {
        const row = new Array<number>(right.length + 1).fill(0);
        row[0] = index;
        return row;
    });
    for (let column = 0; column <= right.length; column += 1) rows[0]![column] = column;

    for (let row = 1; row <= left.length; row += 1) {
        for (let column = 1; column <= right.length; column += 1) {
            const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;
            rows[row]![column] = Math.min(
                rows[row - 1]![column]! + 1,
                rows[row]![column - 1]! + 1,
                rows[row - 1]![column - 1]! + substitutionCost,
            );
            if (
                row > 1
                && column > 1
                && left[row - 1] === right[column - 2]
                && left[row - 2] === right[column - 1]
            ) {
                rows[row]![column] = Math.min(rows[row]![column]!, rows[row - 2]![column - 2]! + 1);
            }
        }
    }
    return rows[left.length]![right.length]!;
};

const permittedEdits = (token: string): number => {
    if (token.length <= 2 || /\d/.test(token)) return 0;
    if (token.length <= 5) return 1;
    return 2;
};

const fuzzyTokenMatch = (queryToken: string, candidateToken: string): boolean => {
    if (candidateToken.includes(queryToken)) return true;
    const maximumEdits = permittedEdits(queryToken);
    return maximumEdits > 0
        && Math.abs(queryToken.length - candidateToken.length) <= maximumEdits
        && editDistance(queryToken, candidateToken) <= maximumEdits;
};

export const fuzzyCatalogMatch = (values: readonly string[], query: string): boolean => {
    const normalizedQuery = normalizedSearchText(query);
    if (normalizedQuery === "") return true;
    const normalizedValues = values.map(normalizedSearchText).filter(Boolean);
    if (normalizedValues.some((value) => value.includes(normalizedQuery))) return true;
    const candidateTokens = normalizedValues.flatMap((value) => value.split(" "));
    return normalizedQuery.split(" ").every((queryToken) =>
        candidateTokens.some((candidateToken) => fuzzyTokenMatch(queryToken, candidateToken)));
};
