import { createContext, useContext, useEffect, useId, useRef, useState,
    type InputHTMLAttributes, type ReactElement } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";
import { formatDisplayNumber, parseNumericInput } from "../domain/numeric";

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

type NumericLimits = {
    readonly min?: string | number;
    readonly max?: string | number;
    readonly integer?: boolean;
};

const hasLimit = (limit: string | number | undefined): limit is string | number =>
    limit !== undefined && limit !== "" && Number.isFinite(Number(limit));

/** Describes the values an input accepts, in the page language. */
export const numericInputErrorMessage = ({ min, max, integer }: NumericLimits): string => {
    const locale = pageLocale();
    const messages = messagesFor(locale).numericInput;
    const format = (limit: string | number): string => formatDisplayNumber(Number(limit), 10, locale);
    const message = hasLimit(min) && hasLimit(max) ? messages.range(format(min), format(max))
        : hasLimit(min) ? messages.atLeast(format(min))
            : hasLimit(max) ? messages.atMost(format(max))
                : messages.enterNumber;
    return integer ? `${message} ${messages.wholeNumber}` : message;
};

type NumericInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "type"> & {
    readonly value: string | number;
    readonly resetKey?: unknown;
    /** For numeric-only models: incomplete edits must not become zero or NaN. */
    readonly validChangesOnly?: boolean;
    readonly integer?: boolean;
    /** Set to false when the surrounding field shows the error text itself. */
    readonly showErrorMessage?: boolean;
    readonly onInvalidChange?: (invalid: boolean) => void;
};

export const NumericInput = ({
    value, resetKey, validChangesOnly = false, integer = false, showErrorMessage = true, onInvalidChange,
    onChange, onFocus, onBlur, onKeyDown, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy,
    ...props
}: NumericInputProps): ReactElement => {
    const scopeReset = useContext(NumericDraftReset);
    const draft = useNumericDraft(value, resetKey ?? scopeReset);
    const [invalid, setInvalid] = useState(false);
    const errorId = useId();
    const required = props.required ?? validChangesOnly;
    useEffect(() => { setInvalid(false); }, [resetKey, scopeReset]);
    useEffect(() => { onInvalidChange?.(invalid); }, [invalid, onInvalidChange]);
    const showMessage = showErrorMessage && invalid && ariaInvalid === undefined;
    const describedBy = [ariaDescribedBy, showMessage ? errorId : undefined].filter(Boolean).join(" ") || undefined;
    const valid = (input: HTMLInputElement): boolean => {
        const number = parseNumericInput(input.value);
        // Step controls arrow increments, not the precision users may enter.
        return number !== undefined && (!integer || Number.isInteger(number))
            && !input.validity.rangeUnderflow && !input.validity.rangeOverflow;
    };
    const input = <input {...props} required={required} type="number" value={draft.draft}
        aria-invalid={ariaInvalid ?? (invalid || undefined)} aria-describedby={describedBy}
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
    if (!showMessage) return input;
    // The text reaches screen readers as the input's description. Hiding this copy keeps it out of the accessible
    // name when the input sits inside its <label>.
    return <>
        {input}
        <small className="se-input-error" id={errorId} aria-hidden="true">
            {numericInputErrorMessage({ min: props.min, max: props.max, integer })}
        </small>
    </>;
};
