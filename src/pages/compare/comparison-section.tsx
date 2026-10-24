import { useId, type ReactElement, type ReactNode } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type ComparisonRow = Readonly<{
    label: string;
    first: ReactNode;
    second: ReactNode;
    different?: boolean;
}>;

const unknownValueClass = (value: ReactNode, unknownLabel: string): string | undefined =>
    value === unknownLabel || value === "—" ? "comparison-value--unknown" : undefined;

/**
 * One comparison section as a table: each value has its row header and, through a visually hidden header row,
 * the name of its entry. The rows are laid out as CSS grids, which makes some browsers drop native table
 * semantics, so the elements also carry their table roles explicitly.
 */
export const ComparisonSection = ({ title, columns, rows, unknownLabel, extraRows }: Readonly<{
    title: string;
    columns: readonly [string, string];
    rows: readonly ComparisonRow[];
    unknownLabel: string;
    extraRows?: ReactNode;
}>): ReactElement => {
    const titleId = useId();
    const differs = messagesFor(pageLocale()).comparison.differs;
    return <section className="battery-comparison__section">
        <h2 id={titleId}>{title}</h2>
        <table className="battery-comparison__table" role="table" aria-labelledby={titleId}>
            <thead className="sr-only" role="rowgroup">
                <tr role="row">
                    <td role="cell" />
                    <th role="columnheader" scope="col">{columns[0]}</th>
                    <th role="columnheader" scope="col">{columns[1]}</th>
                </tr>
            </thead>
            <tbody role="rowgroup">
                {rows.map((row) => <tr role="row" className={row.different ? "is-different" : undefined}
                    key={row.label}>
                    <th role="rowheader" scope="row">
                        {row.label}
                        {row.different && <span className="sr-only"> ({differs})</span>}
                    </th>
                    <td role="cell" className={unknownValueClass(row.first, unknownLabel)}>{row.first}</td>
                    <td role="cell" className={unknownValueClass(row.second, unknownLabel)}>{row.second}</td>
                </tr>)}
                {extraRows}
            </tbody>
        </table>
    </section>;
};
