import { useId, useRef, useState, type ReactElement } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type ComparisonPickerOption = {
    readonly slug: string;
    readonly label: string;
    readonly details: string;
};

/**
 * Chooses one catalog entry for a side of a comparison: a disclosure with a filter field and a plain list of
 * buttons, the chosen one marked pressed. The visible label names the disclosure, the filter and the list.
 */
export const ComparisonPicker = <Option extends ComparisonPickerOption>({
    label,
    chooseLabel,
    options,
    selected,
    onSelect,
}: Readonly<{
    label: string;
    chooseLabel: string;
    options: readonly Option[];
    selected?: Option;
    onSelect: (slug: string | undefined) => void;
}>): ReactElement => {
    const id = useId();
    const labelId = `${id}-label`;
    const valueId = `${id}-value`;
    const details = useRef<HTMLDetailsElement>(null);
    const summary = useRef<HTMLElement>(null);
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matches = options.filter((option) => `${option.label} ${option.slug}`.toLocaleLowerCase()
        .includes(normalizedQuery));
    const select = (slug: string | undefined): void => {
        onSelect(slug);
        setQuery("");
        if (details.current) details.current.open = false;
        summary.current?.focus();
    };

    return <div className="battery-picker">
        <span className="battery-picker__label" id={labelId}>{label}</span>
        <details ref={details}>
            <summary ref={summary} aria-labelledby={`${labelId} ${valueId}`}>
                <span id={valueId}>{selected?.label ?? chooseLabel}</span>
            </summary>
            <div className="battery-picker__popover">
                <input type="search" value={query} aria-labelledby={labelId} placeholder={chooseLabel}
                    onChange={(event) => setQuery(event.target.value)} />
                <p className="sr-only" role="status">
                    {normalizedQuery === "" ? "" : messagesFor(pageLocale()).filter.matches(matches.length)}
                </p>
                {selected && <button type="button" className="battery-picker__clear"
                    onClick={() => select(undefined)}>{chooseLabel}</button>}
                <ul className="battery-picker__options" aria-labelledby={labelId}>
                    {matches.map((option) => <li key={option.slug}>
                        <button type="button" aria-pressed={option.slug === selected?.slug}
                            onClick={() => select(option.slug)}>
                            <strong>{option.label}</strong> <span>{option.details}</span>
                        </button>
                    </li>)}
                </ul>
            </div>
        </details>
    </div>;
};
