import { createContext, useContext, useEffect, useRef, useState,
    type InputHTMLAttributes, type ReactElement } from "react";
import { parseNumericInput } from "../domain/numeric";

export const NumericDraftReset = createContext<unknown>(undefined);

/** Calculation results must not replace the text of an edit in progress. */
export const useNumericDraft = (value: string | number, resetKey?: unknown) => {
    const [draft, setDraft] = useState(String(value));
    const editing = useRef(false);
    const previousReset = useRef(resetKey);
    useEffect(() => {
        if (!editing.current || previousReset.current !== resetKey) {
            setDraft(String(value));
        }
        previousReset.current = resetKey;
    }, [value, resetKey]);
    return {
        draft,
        begin: () => { editing.current = true; },
        change: (raw: string) => {
            setDraft(raw);
        },
        finish: () => { editing.current = false; },
    };
};

type NumericInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "type"> & {
    readonly value: string | number;
    readonly resetKey?: unknown;
    /** For numeric-only models: incomplete edits must not become zero or NaN. */
    readonly validChangesOnly?: boolean;
    readonly integer?: boolean;
};

export const NumericInput = ({
    value, resetKey, validChangesOnly = false, integer = false, onChange, onFocus, onBlur, onKeyDown,
    "aria-invalid": ariaInvalid, ...props
}: NumericInputProps): ReactElement => {
    const scopeReset = useContext(NumericDraftReset);
    const draft = useNumericDraft(value, resetKey ?? scopeReset);
    const [invalid, setInvalid] = useState(false);
    const required = props.required ?? validChangesOnly;
    useEffect(() => { setInvalid(false); }, [resetKey, scopeReset]);
    const valid = (input: HTMLInputElement): boolean => {
        const number = parseNumericInput(input.value);
        // Step controls arrow increments, not the precision users may enter.
        return number !== undefined && (!integer || Number.isInteger(number))
            && !input.validity.rangeUnderflow && !input.validity.rangeOverflow;
    };
    return <input {...props} required={required} type="number" value={draft.draft}
        aria-invalid={ariaInvalid ?? (invalid || undefined)}
        onFocus={(event) => { draft.begin(); onFocus?.(event); }}
        onChange={(event) => {
            draft.change(event.currentTarget.value);
            setInvalid(false);
            if (!validChangesOnly || valid(event.currentTarget)) onChange?.(event);
        }}
        onBlur={(event) => {
            draft.finish();
            setInvalid(event.currentTarget.value === "" && !required
                ? event.currentTarget.validity.badInput : !valid(event.currentTarget));
            onBlur?.(event);
        }}
        onKeyDown={(event) => {
            if (event.key === "Enter") {
                setInvalid(event.currentTarget.value === "" && !required
                    ? event.currentTarget.validity.badInput : !valid(event.currentTarget));
            }
            onKeyDown?.(event);
        }} />;
};
