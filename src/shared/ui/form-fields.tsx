import type { ReactElement, ReactNode } from "react";
import { normalizeNumericInput } from "../domain/numeric";
import { NumericInput } from "./numeric-input";

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
    const helpId = help !== undefined && id !== undefined ? `${id}-help` : undefined;
    const errorId = error !== undefined && id !== undefined ? `${id}-error` : undefined;
    const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
    const input = <NumericInput id={id} className={inputClassName} aria-label={ariaLabel}
        aria-describedby={describedBy} aria-invalid={error === undefined ? undefined : true}
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
        : unitTag === "span" ? <span>{unit}</span> : <em>{unit}</em>;
    const control = inputWrapperClassName !== undefined || unit !== undefined || adornment !== undefined
        ? <span className={inputWrapperClassName}>{input}{adornment}{unitElement}</span>
        : input;
    return <label className={fieldClassName} htmlFor={id}>
        <span>{label}</span>
        {control}
        {help && <small id={helpId} className={helpClassName}>{help}</small>}
        {error && <small id={errorId} className={errorClassName} role="alert">{error}</small>}
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
}: SelectFieldProps): ReactElement => <label className={fieldClassName} htmlFor={id}>
    <span>{label}</span>
    <select id={id} className={selectClassName} aria-label={ariaLabel} value={value} size={size}
        disabled={disabled} onChange={(event) => onChange(event.target.value)}>
        {children ?? options?.map((option) => <option key={option.value} value={option.value}
            disabled={option.disabled}>{option.label}</option>)}
    </select>
    {help && <small className={helpClassName}>{help}</small>}
</label>;
