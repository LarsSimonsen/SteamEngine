import { useId, useState, type ReactElement, type ReactNode } from "react";
import { normalizeNumericInput } from "../domain/numeric";
import { NumericInput, numericInputErrorMessage } from "./numeric-input";

export type NumericFieldProps = {
    readonly label: ReactNode;
    readonly value: string | number;
    readonly onChange: (value: string) => void;
    readonly unit?: string;
    readonly unitTag?: "em" | "span";
    readonly min?: string | number;
    readonly max?: string | number;
    readonly step?: string | number;
    readonly id?: string;
    readonly ariaLabel?: string;
    readonly placeholder?: string;
    readonly required?: boolean;
    readonly integer?: boolean;
    readonly disabled?: boolean;
    readonly help?: ReactNode;
    readonly error?: ReactNode;
    readonly fieldClassName?: string;
    readonly inputWrapperClassName?: string;
    readonly inputClassName?: string;
    readonly helpClassName?: string;
    readonly errorClassName?: string;
    readonly adornment?: ReactNode;
    readonly onCommit?: (value: string) => void;
    readonly commitOnArrowKeys?: boolean;
};

export const NumericField = ({
    label,
    value,
    onChange,
    unit,
    unitTag = "em",
    min,
    max,
    step,
    id,
    ariaLabel,
    placeholder,
    required,
    integer,
    disabled,
    help,
    error,
    fieldClassName,
    inputWrapperClassName,
    inputClassName,
    helpClassName,
    errorClassName,
    adornment,
    onCommit,
    commitOnArrowKeys = false,
}: NumericFieldProps): ReactElement => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [inputInvalid, setInputInvalid] = useState(false);
    const shownError = error ?? (inputInvalid ? numericInputErrorMessage({ min, max, integer }) : undefined);
    const labelId = `${inputId}-label`;
    const unitId = `${inputId}-unit`;
    const helpId = help !== undefined ? `${inputId}-help` : undefined;
    const errorId = shownError !== undefined ? `${inputId}-error` : undefined;
    const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
    // An explicit name keeps the help and error text in the label out of the accessible name.
    const labelledBy = ariaLabel === undefined ? [labelId, unit === undefined ? undefined : unitId]
        .filter(Boolean).join(" ") : undefined;
    const input = <NumericInput id={inputId} className={inputClassName} aria-label={ariaLabel}
        aria-labelledby={labelledBy} aria-describedby={describedBy}
        aria-invalid={error === undefined ? undefined : true} showErrorMessage={false}
        onInvalidChange={setInputInvalid}
        min={min} max={max} step={step} value={normalizeNumericInput(String(value))}
        placeholder={placeholder} required={required} integer={integer}
        disabled={disabled} onChange={(event) => onChange(normalizeNumericInput(event.target.value))}
        onBlur={onCommit === undefined ? undefined : (event) => onCommit(event.currentTarget.value)}
        onKeyDown={onCommit === undefined ? undefined : (event) => {
            if (event.key === "Enter") onCommit(event.currentTarget.value);
        }}
        onKeyUp={!commitOnArrowKeys || onCommit === undefined ? undefined : (event) => {
            if (event.key === "ArrowUp" || event.key === "ArrowDown") onCommit(event.currentTarget.value);
        }} />;
    const unitElement = unit === undefined
        ? undefined
        : unitTag === "span" ? <span id={unitId}>{unit}</span> : <em id={unitId}>{unit}</em>;
    const control = inputWrapperClassName !== undefined || unit !== undefined || adornment !== undefined
        ? <span className={inputWrapperClassName}>{input}{adornment}{unitElement}</span>
        : input;
    return <label className={fieldClassName} htmlFor={inputId}>
        <span id={labelId}>{label}</span>
        {control}
        {help && <small id={helpId} className={helpClassName}>{help}</small>}
        {shownError && <small id={errorId} className={errorClassName ?? "se-input-error"} role="alert">
            {shownError}
        </small>}
    </label>;
};

export type SelectOption = {
    readonly value: string;
    readonly label: string;
    readonly disabled?: boolean;
};

export type SelectFieldProps = {
    readonly label: string;
    readonly value: string | number;
    readonly onChange: (value: string) => void;
    readonly options?: readonly SelectOption[];
    readonly children?: ReactNode;
    readonly id?: string;
    readonly ariaLabel?: string;
    readonly size?: number;
    readonly disabled?: boolean;
    readonly help?: ReactNode;
    readonly fieldClassName?: string;
    readonly selectClassName?: string;
    readonly helpClassName?: string;
};

export const SelectField = ({
    label,
    value,
    onChange,
    options,
    children,
    id,
    ariaLabel,
    size,
    disabled,
    help,
    fieldClassName,
    selectClassName,
    helpClassName,
}: SelectFieldProps): ReactElement => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helpId = help ? `${selectId}-help` : undefined;
    return <label className={fieldClassName} htmlFor={selectId}>
        <span id={`${selectId}-label`}>{label}</span>
        <select id={selectId} className={selectClassName} aria-label={ariaLabel}
            aria-labelledby={ariaLabel === undefined ? `${selectId}-label` : undefined} aria-describedby={helpId}
            value={value} size={size} disabled={disabled} onChange={(event) => onChange(event.target.value)}>
            {children ?? options?.map((option) => <option key={option.value} value={option.value}
                disabled={option.disabled}>{option.label}</option>)}
        </select>
        {help && <small id={helpId} className={helpClassName}>{help}</small>}
    </label>;
};
