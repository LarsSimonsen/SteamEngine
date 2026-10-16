import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
    defaultInputValue,
    defaultSettings,
    isDiscreteUnit,
    type ConversionResult,
    type ConverterSettings,
    type UnitId,
    unitOptions,
} from "./domain";
import { calculateConversionFromApi } from "./api";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import { birminghamWireGauge, fractionalInches, standardWireGauge } from "./data";
import { SelectField } from "../../shared/ui/form-fields";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";
import "./converter.css";

export const converterStorageKey = "steamengine.converter.settings.v1";
const debounceMs = 750;

export type ConverterPanelProps = {
    readonly persistenceKey?: string;
    readonly idPrefix?: string;
};

const pointsForUnit = (unit: UnitId) => {
    if (unit === "bwg") return birminghamWireGauge;
    if (unit === "swg") return standardWireGauge;
    return fractionalInches;
};

const loadSettings = (persistenceKey: string | undefined): ConverterSettings => {
    if (persistenceKey === undefined) return defaultSettings;
    try {
        const raw = localStorage.getItem(persistenceKey);
        if (!raw) return defaultSettings;
        const saved = JSON.parse(raw) as Partial<ConverterSettings>;
        const fromUnit = unitOptions.some((item) => item.id === saved.fromUnit)
            ? saved.fromUnit!
            : defaultSettings.fromUnit;
        const toUnit = unitOptions.some((item) => item.id === saved.toUnit)
            ? saved.toUnit!
            : defaultSettings.toUnit;
        const precision = Number.isInteger(saved.precision) && saved.precision! >= 0 && saved.precision! <= 10
            ? saved.precision!
            : defaultSettings.precision;
        return {
            fromUnit,
            fromValue: typeof saved.fromValue === "string" ? saved.fromValue : defaultInputValue(fromUnit),
            toUnit,
            precision,
        };
    } catch {
        return defaultSettings;
    }
};

const sameSettings = (left: ConverterSettings, right: ConverterSettings): boolean =>
    JSON.stringify(left) === JSON.stringify(right);

const displayUnit = (unit: UnitId): string => ({
    mm: "mm",
    inch: "in",
    awg: "AWG",
    bwg: "BWG",
    swg: "SWG",
    "fractional-inch": "in",
}[unit]);

const unitLabel = (unit: UnitId, messages: Readonly<Record<string, string>>): string => ({
    mm: messages.millimetres,
    inch: messages.inches,
    awg: messages.americanWireGauge,
    bwg: messages.needleGauge,
    swg: messages.standardWireGauge,
    "fractional-inch": messages.fractionalInches,
}[unit]);

export const ConverterPanel = ({
    persistenceKey,
    idPrefix = "converter",
}: ConverterPanelProps): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).converter;
    const [settings, setSettings] = useState<ConverterSettings>(() => loadSettings(persistenceKey));
    const [draftValue, setDraftValue] = useState(() => settings.fromValue);
    const timer = useRef<number | undefined>(undefined);
    const requestGeneration = useRef(0);
    const [result, setResult] = useState<ConversionResult | undefined>(undefined);
    const [pending, setPending] = useState(true);
    const debouncedCalculation = useMemo(() => createDebouncedRequest<ConversionResult>(200), []);
    useEffect(() => {
        const generation = ++requestGeneration.current;
        setPending(true);
        setResult(undefined);
        void debouncedCalculation.schedule(() => calculateConversionFromApi({ ...settings, fromValue: draftValue }))
            .then((nextResult) => {
                if (requestGeneration.current !== generation) return;
                setResult(nextResult);
                setPending(false);
            }).catch((error: unknown) => {
                if (error === debouncedRequestSuperseded) return;
                if (requestGeneration.current === generation) setPending(false);
            });
        return () => {
            if (requestGeneration.current === generation) requestGeneration.current += 1;
            debouncedCalculation.cancel();
        };
    }, [debouncedCalculation, draftValue, settings]);

    useEffect(() => {
        if (persistenceKey === undefined) return;
        try {
            localStorage.setItem(persistenceKey, JSON.stringify(settings));
        } catch {
            // Storage restrictions should not break conversion.
        }
    }, [persistenceKey, settings]);
    useEffect(() => () => {
        if (timer.current !== undefined) window.clearTimeout(timer.current);
    }, []);

    const commitValue = (value: string): void => {
        setSettings((current) => ({ ...current, fromValue: value }));
    };
    const updateValue = (value: string, immediate = false): void => {
        setDraftValue(value);
        if (timer.current !== undefined) window.clearTimeout(timer.current);
        if (immediate) {
            commitValue(value);
            return;
        }
        if (value.trim() === "") return;
        timer.current = window.setTimeout(() => commitValue(value), debounceMs);
    };
    const changeFromUnit = (unit: UnitId): void => {
        const nextValue = isDiscreteUnit(unit) ? pointsForUnit(unit)[0].name : draftValue;
        setDraftValue(nextValue);
        setSettings((current) => ({ ...current, fromUnit: unit, fromValue: nextValue }));
    };
    const reset = (): void => {
        setDraftValue(defaultSettings.fromValue);
        setSettings(defaultSettings);
    };
    const canSwap = !pending && result?.kind === "exact";
    const swap = (): void => {
        if (!canSwap || result?.kind !== "exact") return;
        const outputValue = result.outputValue;
        setDraftValue(outputValue);
        setSettings((current) => ({
            ...current,
            fromUnit: current.toUnit,
            fromValue: outputValue,
            toUnit: current.fromUnit,
        }));
    };
    const discretePoints = isDiscreteUnit(settings.fromUnit) ? pointsForUnit(settings.fromUnit) : undefined;
    const hasDiscreteOutput = isDiscreteUnit(settings.toUnit);
    const inputTitleId = `${idPrefix}-input-title`;
    const settingsTitleId = `${idPrefix}-settings-title`;
    const resultTitleId = `${idPrefix}-result-title`;

    return <div className="converter-layout">
        <section className="se-card converter-card converter-input-panel" aria-labelledby={inputTitleId}>
            <h2 id={inputTitleId}>{messages.input}</h2>
            <label className="se-field converter-field"><span>{messages.value}</span>
                {discretePoints ? <select aria-label={messages.inputValue} value={draftValue}
                    onChange={(event) => updateValue(event.target.value, true)}>
                    {discretePoints.map((point) => <option key={point.name} value={point.name}>
                        {point.name}
                    </option>)}
                </select> : <input aria-label={messages.inputValue} type="number" step="any" value={draftValue}
                    onChange={(event) => updateValue(event.target.value)}
                    onBlur={(event) => updateValue(event.currentTarget.value, true)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") updateValue(event.currentTarget.value, true);
                    }} />}
            </label>
            <SelectField fieldClassName="se-field converter-field" label={messages.inputUnit}
                ariaLabel={messages.inputUnit}
                value={settings.fromUnit} onChange={(value) => changeFromUnit(value as UnitId)}
                options={unitOptions.map((unit) => ({ value: unit.id, label: unitLabel(unit.id, messages) }))} />
        </section>
        <section className="se-card converter-card converter-settings-panel" aria-labelledby={settingsTitleId}>
            <h2 id={settingsTitleId}>{messages.outputSettings}</h2>
            <SelectField fieldClassName="se-field converter-field" label={messages.outputUnit}
                ariaLabel={messages.outputUnit}
                value={settings.toUnit} onChange={(value) => setSettings((current) => ({
                    ...current,
                    toUnit: value as UnitId,
                }))} options={unitOptions.map((unit) => ({ value: unit.id, label: unitLabel(unit.id, messages) }))} />
            <SelectField fieldClassName="se-field converter-field" label={messages.decimalPlaces}
                ariaLabel={messages.decimalPlaces} value={settings.precision}
                disabled={hasDiscreteOutput}
                onChange={(value) => setSettings((current) => ({ ...current, precision: Number(value) }))}
                options={Array.from({ length: 11 }, (_, precision) => ({
                    value: String(precision),
                    label: String(precision),
                }))} />
            <p className="se-muted-copy converter-help">{messages.precisionHelp}</p>
        </section>
        <section className="se-card converter-card converter-result-panel" aria-live="polite" aria-busy={pending}
            aria-labelledby={resultTitleId}>
            <div className="se-split-heading converter-heading"><h2 id={resultTitleId}>{messages.result}</h2>
                {!sameSettings(settings, defaultSettings) && <button
                    className="se-button se-button--quiet converter-reset" type="button" onClick={reset}>
                    <FontAwesomeIcon icon={faRotateLeft} /> {messages.reset}
                </button>}
            </div>
            <p className="converter-equation">{draftValue} {displayUnit(settings.fromUnit)}
                <span aria-hidden="true"> = </span></p>
            {pending && <p className="se-muted-copy converter-pending" role="status">{messages.calculating}</p>}
            {!pending && result?.kind === "exact" && <p className="converter-result-value">
                <strong>{result.outputValue}</strong>
                {` ${displayUnit(settings.toUnit)}`}</p>}
            {!pending && result?.kind === "approximate" && <div className="converter-approximation">
                <p><em>{messages.betweenStandardValues}</em></p>
                <p><strong>{result.approximation.larger.name}</strong>
                    ({result.approximation.largerErrorPercent.toFixed(2)}% {messages.larger})</p>
                <p><strong>{result.approximation.smaller.name}</strong>
                    ({result.approximation.smallerErrorPercent.toFixed(2)}% {messages.smaller})</p>
            </div>}
            {!pending && (result?.kind === "invalid" || result?.kind === "out-of-range") &&
                <p className="se-alert se-alert--warning converter-validation" role="alert">{result.message}</p>}
            {(pending || result?.kind === "exact") &&
                <button className="se-button converter-swap" type="button" onClick={swap} disabled={!canSwap}>
                    <FontAwesomeIcon icon={faRightLeft} /> {messages.swap}
                </button>}
        </section>
    </div>;
};
