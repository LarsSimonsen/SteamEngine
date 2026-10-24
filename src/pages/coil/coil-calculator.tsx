import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightArrowLeft,
    faArrowDownUpAcrossLine,
    faCaretDown,
    faSliders,
    faFire,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
    awgToMm,
    cloneSettings,
    defaultSettings,
    fromLegacyQuery,
    inchesToMm,
    mmToAwg,
    mmToInches,
    setupOptions,
    setupResistanceFactor,
    setupWires,
    toLegacyQuery,
    type CoilProfile,
    type CoilCalculation,
    type CoilSettings,
} from "./domain";
import { calculateCoilFromApi } from "./api";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import type { CustomMaterial, DefaultMaterial } from "../../catalogs/materials/catalog";
import { MaterialManager } from "../../catalogs/materials/material-manager";
import { createMaterialRepository } from "../../catalogs/materials/repository";
import { heatFluxColor } from "./heat-flux";
import "../../shared/styles/foundation.css";
import { useRepository } from "../../shared/hooks/use-repository";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { CatalogSelectOptions } from "../../shared/ui/catalog-select-options";
import { EmbeddedConverter } from "../converter/embedded-converter";
import {
    NumericField,
    SelectField as SharedSelectField,
    type NumericFieldProps,
    type SelectFieldProps,
} from "../../shared/ui/form-fields";
import { NumericDraftReset } from "../../shared/ui/numeric-input";
import { SiteLayout } from "../../shared/ui/site-layout";
import { ResultAnnouncement, resultSummary } from "../../shared/ui/result-announcement";
import { TransientMessage, useTransientMessage } from "../../shared/ui/transient-message";
import { canonicalMaterialId } from "../../catalogs/materials/catalog";
import { formatDisplayNumber } from "../../shared/domain/numeric";
import { pageLocale } from "../../i18n/page-locale";
import { calculatorMessagesFor, type CalculatorRouteMessages } from "../../i18n/calculator-messages";
import "./coil.css";

const storageKey = "steamengine.coil.settings.v1";

type Drafts = Record<
    | "twistPitch"
    | "awg"
    | "diameter"
    | "strands"
    | "ribbonWidth"
    | "ribbonThickness"
    | "targetResistance"
    | "wireLength"
    | "innerDiameter"
    | "legLength"
    | "wrapSpacing"
    | "heatFlux",
    string
>;

const displayNumber = (value: number, decimals = 3): string =>
    formatDisplayNumber(value, decimals, pageLocale());

const draftValues = (settings: CoilSettings): Drafts => {
    const length = (value: number, decimals = 3): string => displayNumber(
        settings.showSi ? value : mmToInches(value), decimals);
    return {
        twistPitch: length(settings.twistPitch),
        awg: displayNumber(settings.awg, 2),
        diameter: length(settings.diameter, settings.showSi ? 3 : 5),
        strands: String(settings.strands),
        ribbonWidth: length(settings.ribbonWidth, 4),
        ribbonThickness: length(settings.ribbonThickness, 4),
        targetResistance: displayNumber(settings.targetResistance, 3),
        wireLength: length(settings.wireLength, settings.showSi ? 2 : 3),
        innerDiameter: length(settings.innerDiameter, settings.showSi ? 2 : 3),
        legLength: length(settings.legLength, settings.showSi ? 1 : 3),
        wrapSpacing: length(settings.wrapSpacing),
        heatFlux: displayNumber(settings.heatFlux, 0),
    };
};

const parseInput = (raw: string): number => Number.parseFloat(raw.replace(",", "."));

const migrateLegacyMaterial = (settings: CoilSettings): CoilSettings => {
    const materialId = canonicalMaterialId(
        settings.materialId === "custom" ? defaultSettings.materialId : settings.materialId,
    );
    if (materialId === settings.materialId) return settings;
    return { ...settings, materialId };
};

const readStoredSettings = (): CoilSettings => {
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length > 0) {
        return migrateLegacyMaterial(fromLegacyQuery(Object.fromEntries(params.entries())));
    }
    try {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return cloneSettings(defaultSettings);
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && "version" in parsed && parsed.version === 1
            && "settings" in parsed) {
            return migrateLegacyMaterial({
                ...defaultSettings,
                ...(parsed.settings as Partial<CoilSettings>),
            });
        }
    } catch {
        // Fall back to defaults when storage is unavailable or malformed.
    }
    return cloneSettings(defaultSettings);
};

const unitLabel = (showSi: boolean): string => showSi ? "mm" : "in";

type CoilNumericFieldProps = Omit<NumericFieldProps, "label" | "fieldClassName" | "inputWrapperClassName"> & {
    readonly label: string;
};

const Field = (props: CoilNumericFieldProps): ReactElement => <NumericField {...props}
    fieldClassName="coil-field" inputWrapperClassName="coil-input" />;

type CoilSelectFieldProps = Omit<SelectFieldProps, "fieldClassName" | "ariaLabel">;

const SelectField = (props: CoilSelectFieldProps): ReactElement => <SharedSelectField {...props}
    fieldClassName="coil-field" ariaLabel={props.label} />;

const MaterialSelect = ({
    value,
    defaultMaterials,
    visibleDefaultMaterialIds,
    customMaterials,
    onChange,
    messages,
}: {
    readonly value: string;
    readonly defaultMaterials: readonly DefaultMaterial[];
    readonly visibleDefaultMaterialIds: ReadonlySet<string>;
    readonly customMaterials: readonly CustomMaterial[];
    readonly onChange: (value: string) => void;
    readonly messages: CalculatorRouteMessages;
}): ReactElement => {
    const selectableDefaults = defaultMaterials.filter(
        (material) => visibleDefaultMaterialIds.has(material.id) || material.id === value,
    );
    const available = defaultMaterials.some((material) => material.id === value)
        || customMaterials.some((material) => material.id === value);
    return <label className="coil-field">
        <span>{messages.material}</span>
        <select aria-label={messages.material} value={value} onChange={(event) => onChange(event.target.value)}>
            <CatalogSelectOptions defaultItems={selectableDefaults} customItems={customMaterials}
                defaultGroupLabel={messages.builtInMaterials} customGroupLabel={messages.customMaterials}
                optionLabel={(material) => material.name} />
            {!available && <option value={value}>{messages.unavailableMaterial} ({value})</option>}
        </select>
    </label>;
};

type ResultGaugeProps = {
    readonly label: string;
    readonly value: number;
    readonly min: number;
    readonly optimum: number;
    readonly low: number;
    readonly high: number;
    readonly max: number;
    readonly highlightedRange: string;
};

const ResultGauge = ({
    label,
    value,
    min,
    optimum,
    low,
    high,
    max,
    highlightedRange,
}: ResultGaugeProps): ReactElement => <span className="coil-result-gauge-wrap">
    <meter className="coil-result-gauge" aria-label={label} min={min} optimum={optimum}
        low={low} high={high} max={max} value={value} />
    <small>{highlightedRange}</small>
</span>;

const ResultRow = ({ label, value, unit, warning, gauge }: {
    readonly label: string;
    readonly value: string;
    readonly unit?: string;
    readonly warning?: boolean;
    readonly gauge?: ResultGaugeProps;
}): ReactElement => <div className={warning ? "coil-result-row coil-result-row--warning" : "coil-result-row"}>
    <dt>{label}</dt><dd><span>{value}{unit && ` ${unit}`}</span>
        {gauge && <ResultGauge {...gauge} />}</dd>
</div>;

const optionalResult = (
    value: number | null,
    format: (availableValue: number) => string,
): string => value === null ? "Unavailable" : format(value);

const halfWrapCount = (numberOfWraps: number): number => Math.round(numberOfWraps + 1) - 0.5;

export const CoilCalculator = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const messages = calculatorMessagesFor(pageLocale()).coil;
    const [materialRepository, materialSnapshot] = useRepository(createMaterialRepository);
    const [settings, setSettings] = useState<CoilSettings>(() => readStoredSettings());
    const [drafts, setDrafts] = useState<Drafts>(() => draftValues(readStoredSettings()));
    const lastValidSettings = useRef<CoilSettings>(settings.diameter > 0 ? settings : cloneSettings(defaultSettings));
    const targetResistanceEditing = useRef(false);
    const { message, showMessage, clearMessage } = useTransientMessage();
    const [showMaterialManager, setShowMaterialManager] = useState(false);
    const [showConverter, setShowConverter] = useState(false);
    const [nonstandardDiameter, setNonstandardDiameter] = useState(false);
    const [calculation, setCalculation] = useState<CoilCalculation>({
        kind: "invalid", message: messages.calculating
    });
    const debouncedCalculation = useMemo(() => createDebouncedRequest<CoilCalculation>(200), []);
    const selectedMaterial = materialSnapshot.allMaterials.find((material) =>
        canonicalMaterialId(material.id) === canonicalMaterialId(settings.materialId));

    const resetCalculator = (): void => {
        setInputReset((revision) => revision + 1);
        const next = cloneSettings(defaultSettings);
        targetResistanceEditing.current = false;
        lastValidSettings.current = next;
        setSettings(next);
        setDrafts(draftValues(next));
        setNonstandardDiameter(false);
        showMessage("Default settings have been restored.");
    };

    useEffect(() => {
        let current = true;
        const cancel = (): void => {
            targetResistanceEditing.current = false;
            const restored = lastValidSettings.current;
            setSettings(restored);
            setDrafts(draftValues(restored));
        };
        void debouncedCalculation.schedule(() => calculateCoilFromApi(
            settings, selectedMaterial, cancel, resetCalculator,
        )).then((next) => {
            if (!current) return;
            setCalculation(next);
            if (next.kind === "valid") {
                const nextSettings = { ...settings, wireLength: next.values.wireLength };
                lastValidSettings.current = nextSettings;
                setDrafts((currentDrafts) => ({
                    ...draftValues(nextSettings),
                    ...(targetResistanceEditing.current
                        ? { targetResistance: currentDrafts.targetResistance }
                        : {}),
                }));
            }
        }).catch((error: unknown) => {
            if (error === debouncedRequestSuperseded) return;
            if (current) return;
        });
        return () => {
            current = false;
            debouncedCalculation.cancel();
        };
    }, [debouncedCalculation, settings, selectedMaterial]);

    useEffect(
        () => materialRepository.registerReferences("coil-active-settings", {
            label: "Current Coil calculator settings",
            materialIds: () => [settings.materialId],
        }),
        [materialRepository, settings.materialId],
    );

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify({ version: 1, settings }));
        } catch {
            // Private browsing and storage quotas should not break the calculator.
        }
        const query = toLegacyQuery(settings);
        const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
        window.history.replaceState(null, "", url);
    }, [settings]);

    const apply = (next: CoilSettings, clearManual = true): void => {
        const withManual = clearManual ? { ...next, wireLengthManual: false } : next;
        setSettings(withManual);
        setDrafts(draftValues(withManual));
    };

    const updateDirect = (field: keyof CoilSettings, raw: string, convert = (value: number): number => value): void => {
        setDrafts((current) => ({ ...current, [field]: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        apply({ ...settings, [field]: convert(parsed) } as CoilSettings);
    };

    const updateLength = (field: keyof CoilSettings, raw: string): void => {
        updateDirect(field, raw, settings.showSi ? (value) => value : inchesToMm);
    };

    const updateNonNegativeLength = (field: keyof CoilSettings, raw: string): void => {
        updateDirect(field, raw, (value) => Math.max(0, settings.showSi ? value : inchesToMm(value)));
    };

    const updateLengthAtLeast = (
        field: keyof CoilSettings,
        raw: string,
        minimum: number,
        inclusive = true,
    ): void => {
        setDrafts((current) => ({ ...current, [field]: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        if (parsed < minimum || (!inclusive && parsed === minimum)) {
            setDrafts(draftValues(settings));
            return;
        }
        const value = settings.showSi ? parsed : inchesToMm(parsed);
        apply({ ...settings, [field]: value } as CoilSettings);
    };

    const changeTargetResistance = (raw: string): void => {
        targetResistanceEditing.current = true;
        setDrafts((current) => ({ ...current, targetResistance: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed) || parsed <= 0) return;
        setSettings((current) => ({
            ...current,
            targetResistance: parsed,
            wireLengthManual: false,
        }));
    };

    const commitTargetResistance = (raw: string): void => {
        targetResistanceEditing.current = false;
        const parsed = parseInput(raw);
        setDrafts((current) => ({
            ...current,
            targetResistance: Number.isFinite(parsed) && parsed > 0
                ? raw
                : displayNumber(settings.targetResistance, 3),
        }));
    };

    const changeUnits = (showSi: boolean): void => {
        setInputReset((revision) => revision + 1);
        const next = { ...settings, showSi };
        setSettings(next);
        setDrafts(draftValues(next));
    };

    const changeProfile = (profile: CoilProfile): void => {
        setInputReset((revision) => revision + 1);
        const next = profile === "round"
            ? { ...settings, profile, strands: 1, twistPitch: 0 }
            : profile === "ribbon"
                ? { ...settings, profile, strands: 1, twistPitch: 0 }
                : { ...settings, profile, strands: Math.max(2, settings.strands) };
        apply(next);
    };

    const changeMaterial = (materialId: string): void => {
        setInputReset((revision) => revision + 1);
        apply({ ...settings, materialId });
    };

    const changeAwg = (raw: string): void => {
        setDrafts((current) => ({ ...current, awg: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        const awg = Math.min(100, Math.max(-10, parsed));
        const next = { ...settings, awg, diameter: awgToMm(awg) };
        setNonstandardDiameter(false);
        apply(next);
    };

    const changeDiameter = (raw: string): void => {
        setDrafts((current) => ({ ...current, diameter: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        if (parsed <= 0) {
            setDrafts(draftValues(settings));
            return;
        }
        const diameter = settings.showSi ? parsed : inchesToMm(parsed);
        const next = { ...settings, diameter, awg: mmToAwg(diameter) };
        setNonstandardDiameter(true);
        apply(next);
    };

    const changeWireLength = (raw: string): void => {
        setDrafts((current) => ({ ...current, wireLength: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        if (parsed <= 0) {
            setDrafts(draftValues(settings));
            return;
        }
        const wireLength = settings.showSi ? parsed : inchesToMm(parsed);
        apply({ ...settings, wireLength, wireLengthManual: true }, false);
    };

    const changeHeatFlux = (raw: string): void => {
        setDrafts((current) => ({ ...current, heatFlux: raw }));
        const parsed = parseInput(raw);
        if (!Number.isFinite(parsed)) return;
        if (parsed <= 0) {
            setDrafts(draftValues(settings));
            return;
        }
        apply({ ...settings, heatFlux: parsed });
    };

    const swapRibbon = (): void => apply({
        ...settings,
        ribbonWidth: settings.ribbonThickness,
        ribbonThickness: settings.ribbonWidth,
    }, false);

    const unit = unitLabel(settings.showSi);
    const lengthValue = (value: number, siDecimals: number, imperialDecimals = 3): string =>
        displayNumber(settings.showSi ? value : mmToInches(value), settings.showSi ? siDecimals : imperialDecimals);
    const resistanceValue = (value: number): string => displayNumber(value, 3);
    const areaValue = (value: number): string => displayNumber(
        settings.showSi ? value : value / 645.16, settings.showSi ? 2 : 5);
    const volumeValue = (value: number): string =>
        displayNumber(settings.showSi ? value : value / 16387.064, settings.showSi ? 3 : 6);
    const massValue = (value: number): string =>
        displayNumber(settings.showSi ? value : value * 15.432358, settings.showSi ? 3 : 4);
    const massUnit = settings.showSi ? "mg" : "gr";
    const densityValue = (value: number): string => displayNumber(settings.showSi ? value : value * 0.578036672, 3);
    const densityUnit = settings.showSi ? "g/cm³" : "oz/in³";
    const result = calculation.kind === "valid" ? calculation.values : undefined;
    const setupFactor = setupResistanceFactor(settings.setup);
    const multiCoil = settings.setup !== "single";
    const actualResistanceLabel = (wraps: number): string =>
        `${displayNumber(wraps, 1)} ${messages.wraps.toLowerCase()} — ${messages.resistanceActual}`;
    const actualResistanceValue = (resistancePerCoil: number): ReactElement => multiCoil
        ? <span className="coil-resistance-values">
            <span>{resistanceValue(resistancePerCoil)} Ω <small>{messages.perCoil}</small></span>
            <span>{resistanceValue(resistancePerCoil * setupFactor)} Ω <small>{messages.total}</small></span>
        </span>
        : <>{resistanceValue(resistancePerCoil)} Ω</>;
    const visibleDefaultMaterialIds = useMemo(
        () => new Set(materialSnapshot.visibleDefaultMaterials.map((material) => material.id)),
        [materialSnapshot.visibleDefaultMaterials],
    );

    return <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" className="coil-app" currentRoute="coil" rootHref=".">
        <main id="main" className="page-content">
            <TransientMessage message={message} onDismiss={clearMessage} />
            <CalculatorPageHeader className="coil-page-header" copyClassName="coil-page-header__copy"
                eyebrow={messages.eyebrow} title={messages.title}
                description={messages.description}
                actionsClassName="se-page-header__action-buttons coil-page-header__actions" actions={<>
                    <button type="button" className={settings.advanced ? "active" : ""}
                        aria-expanded={settings.advanced}
                        aria-controls="coil-advanced-fields coil-advanced-results"
                        onClick={() => setSettings((current) => ({
                            ...current, advanced: !current.advanced,
                        }))}><FontAwesomeIcon className="coil-advanced-caret" icon={faCaretDown} aria-hidden="true" />
                        {messages.advanced}</button>
                    <button type="button" className={showMaterialManager ? "active" : ""}
                        aria-label={messages.manageMaterials}
                        aria-expanded={showMaterialManager}
                        aria-controls="coil-material-manager"
                        onClick={() => setShowMaterialManager((visible) => !visible)}>
                        <FontAwesomeIcon icon={faSliders} aria-hidden="true" />
                        <span className="coil-action-label">{messages.manageMaterials}</span>
                    </button>
                    <button type="button" aria-label={showConverter ? messages.hideConverter : messages.converter}
                        aria-expanded={showConverter} aria-controls="coil-converter"
                        onClick={() => setShowConverter((visible) => !visible)}>
                        <FontAwesomeIcon icon={faArrowDownUpAcrossLine} aria-hidden="true" />
                        <span className="coil-action-label">
                            {showConverter ? messages.hideConverter : messages.converter}
                        </span>
                    </button>
                    <button type="button" aria-label={messages.reset} onClick={resetCalculator}>
                        <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" />
                        <span className="coil-action-label">{messages.reset}</span>
                    </button>
                </>} />
            {showMaterialManager && <div id="coil-material-manager">
                <MaterialManager repository={materialRepository}
                    onClose={() => setShowMaterialManager(false)} />
            </div>}
            {showConverter && <EmbeddedConverter idPrefix="coil-converter" className="coil-converter" />}
            <aside className="coil-mobile-summary" aria-label={`${messages.results} summary`}>
                {result ? <dl>
                    <div><dt>{messages.wraps}</dt><dd>{displayNumber(result.numberOfWraps, 2)}</dd></div>
                    <div><dt>{messages.resistanceActual}</dt>
                        <dd>{resistanceValue(result.roundedWrapResistance * setupFactor)} Ω</dd></div>
                    <div><dt>{messages.heatFlux}</dt><dd>{displayNumber(result.recommendPower, 1)} W</dd></div>
                </dl> : <span>{calculation.kind === "invalid" ? calculation.message : messages.calculating}</span>}
                <a className="se-button se-button--bordered se-button--compact" href="#coil-results-title">
                    {messages.results} ↓
                </a>
            </aside>
            <div className="coil-layout">
                <section className="se-card se-card--soft-shadow coil-panel coil-input-panel"
                    aria-labelledby="coil-input-title">
                    <h2 id="coil-input-title">{messages.coilSpecifications}</h2>
                    <div className="coil-material-profile-fields">
                        <MaterialSelect value={settings.materialId}
                            defaultMaterials={materialSnapshot.defaultMaterials}
                            visibleDefaultMaterialIds={visibleDefaultMaterialIds}
                            customMaterials={materialSnapshot.customMaterials}
                            onChange={changeMaterial} messages={messages} />
                        <SelectField label={messages.wireProfile} value={settings.profile}
                            options={[{ value: "round", label: messages.roundWire },
                                { value: "roundmulti", label: messages.twistedParallelRound },
                                { value: "ribbon", label: messages.ribbonWire }]}
                            onChange={(value) => changeProfile(value as CoilProfile)} />
                    </div>
                    <fieldset className="coil-units"><legend>{messages.units}</legend>
                        <label><input type="radio" checked={settings.showSi} onChange={() => changeUnits(true)} />
                            {messages.metric}</label>
                        <label><input type="radio" checked={!settings.showSi} onChange={() => changeUnits(false)} />
                            {messages.imperial}</label>
                    </fieldset>
                    {settings.profile === "roundmulti" && <>
                        <Field label={messages.twistPitch} value={drafts.twistPitch} unit={unit} min="0" max="50" step="0.001"
                            onChange={(value) => updateLength("twistPitch", value)}
                            help={messages.twistHelp} />
                        <Field label={messages.strands} value={drafts.strands} min="2" max="4" step="1"
                            onChange={(value) => updateDirect("strands", value,
                                (number) => Math.min(4, Math.max(2, Math.round(number))))} />
                    </>}
                    {settings.profile !== "ribbon" ? <div className="coil-wire-diameter-fields">
                        <div className="coil-wire-diameter-inputs">
                            <Field label={messages.awg} value={drafts.awg} min="-10" max="100" step="1" onChange={changeAwg} />
                            <Field label={messages.wireDiameter} value={drafts.diameter} unit={unit} min="0.001" max="5"
                                step="0.001" onChange={changeDiameter} />
                        </div>
                        {nonstandardDiameter && <small className="coil-wire-diameter-help">
                            {messages.awgApproximation}
                        </small>}
                    </div> : <div className="coil-ribbon-fields">
                        <Field label={messages.ribbonWidth} value={drafts.ribbonWidth} unit={unit} min="0.001" max="1000"
                            step="0.01"
                            onChange={(value) => updateLength("ribbonWidth", value)} />
                        <Field label={messages.ribbonThickness} value={drafts.ribbonThickness} unit={unit} min="0.0001"
                            max="100"
                            step="0.001"
                            onChange={(value) => updateLength("ribbonThickness", value)} />
                        {settings.ribbonThickness > settings.ribbonWidth && <button type="button"
                            className="se-button se-button--link se-button--bordered coil-swap"
                            onClick={swapRibbon}>
                            <FontAwesomeIcon icon={faArrowRightArrowLeft} /> {messages.swapRibbon}</button>}
                    </div>}
                    <SelectField label={messages.setup} value={settings.setup}
                        options={setupOptions.map((item) => ({ value: item.id, label: {
                            "single": messages.setupSingle, "parallel-2": messages.setupParallel2,
                            "parallel-3": messages.setupParallel3, "parallel-4": messages.setupParallel4,
                            "parallel-5": messages.setupParallel5, "parallel-6": messages.setupParallel6,
                            "parallel-7": messages.setupParallel7, "parallel-8": messages.setupParallel8,
                            "series-2": messages.setupSeries2, "series-3": messages.setupSeries3,
                            "series-4": messages.setupSeries4, "series-parallel-4": messages.setupSeriesParallel4,
                        }[item.id] }))}
                        onChange={(value) => apply({ ...settings, setup: value as CoilSettings["setup"] })}
                        help={settings.setup === "single" ? messages.singleCoil
                            : `${setupWires(settings.setup)} × ${messages.resistancePerCoil}. `
                                + `${messages.targetResistance}: ${messages.total}.`} />
                    <Field
                        label={multiCoil ? `${messages.targetResistance} — ${messages.total}` : messages.targetResistance}
                        value={drafts.targetResistance} unit="Ω" min="0.01" max="10"
                        step="0.1"
                        onChange={changeTargetResistance} onCommit={commitTargetResistance} />
                </section>
                <section className="se-card se-card--soft-shadow coil-panel coil-details-panel"
                    aria-labelledby="coil-details-title">
                    <h2 id="coil-details-title">{messages.buildDetails}</h2>
                    <div id="coil-advanced-fields" hidden={!settings.advanced}>
                        <Field label={messages.resistanceWireLength} value={drafts.wireLength} unit={unit} min="0.01" max="500"
                            step="0.01" onChange={changeWireLength}
                            help={messages.manualLength} />
                        <Field label={messages.wrapSpacing} value={drafts.wrapSpacing} unit={unit} min="0" step="0.001"
                            onChange={(value) => updateNonNegativeLength("wrapSpacing", value)} />
                    </div>
                    <Field label={messages.innerDiameter} value={drafts.innerDiameter} unit={unit} min="0.01" max="10"
                        step="0.01"
                        onChange={(value) => updateLengthAtLeast("innerDiameter", value, 0, false)} />
                    <Field label={messages.legLength} value={drafts.legLength} unit={unit} min="0" max="100" step="0.1"
                        onChange={(value) => updateLengthAtLeast("legLength", value, 0)}
                        help={`${messages.total}${settings.setup === "single" ? "." : ` ${messages.perCoil}.`}`} />
                    {settings.profile === "roundmulti" && settings.strands > 4
                        && <p className="coil-warning">{messages.twistedLimit}</p>}
                </section>
                <section className="se-card se-card--soft-shadow coil-panel coil-results-panel"
                    aria-labelledby="coil-results-title">
                    <h2 id="coil-results-title">{messages.results}</h2>
                    <ResultAnnouncement summary={result && resultSummary(pageLocale(), [
                        `${messages.wraps} ${displayNumber(result.numberOfWraps, 2)}`,
                        `${messages.resistanceActual} `
                            + `${resistanceValue(result.roundedWrapResistance * setupFactor)} Ω`,
                        `${messages.heatFlux} ${displayNumber(result.recommendPower, 1)} W`
                            + ` ${displayNumber(result.recommendVoltage, 1)} V`,
                    ])} />
                        {calculation.kind === "invalid"
                            ? <p className="coil-error" role="alert">{calculation.message}</p>
                            : result && <>
                            <dl className="coil-result-list">
                                <ResultRow label={messages.resistanceWireLength}
                                    value={lengthValue(result.wireLength, 2)} unit={unit} />
                                <ResultRow label={messages.wraps} value={displayNumber(result.numberOfWraps, 2)}
                                    gauge={{ label: messages.wraps, value: result.numberOfWraps, min: 0,
                                        optimum: 8, low: 4, high: 14, max: 20, highlightedRange: "4–14" }} />
                                <div className="coil-result-row">
                                    <dt>{actualResistanceLabel(result.roundedWraps)}</dt>
                                    <dd>{actualResistanceValue(result.roundedWrapResistance)}</dd>
                                </div>
                                <div className="coil-result-row">
                                    <dt>{actualResistanceLabel(halfWrapCount(result.numberOfWraps))}</dt>
                                    <dd>{actualResistanceValue(result.halfWrapResistance)}</dd>
                                </div>
                                <ResultRow label={messages.heatCapacity}
                                    value={optionalResult(result.heatCapacity, (value) => displayNumber(value, 1))}
                                    unit={result.heatCapacity === null ? undefined : "mJ/K"}
                                    gauge={result.heatCapacity === null ? undefined : {
                                        label: messages.heatCapacity, value: result.heatCapacity, min: 0, optimum: 1,
                                        low: 20, high: 40, max: 100, highlightedRange: "≤20 mJ/K",
                                    }} />
                                <ResultRow label={messages.legPowerLoss} value={displayNumber(result.legLoss * 100, 1)}
                                    unit="%"
                                    warning={result.legLossStatus !== "normal"}
                                    gauge={{ label: messages.legPowerLoss, value: result.legLoss * 100, min: 0,
                                        optimum: 1, low: 20, high: 40, max: 100, highlightedRange: "≤20%" }} />
                            </dl>
                            {result.legLossMessage && <p
                                className={`coil-result-note coil-result-note--${result.legLossStatus}`}>
                                {result.legLossMessage}</p>}
                            {result.wireLengthWarning && <p className="coil-result-note coil-result-note--danger">
                                {messages.wireLengthWarning}</p>}
                            <div className="coil-heatflux"><h3><FontAwesomeIcon icon={faFire}
                                style={{ color: heatFluxColor(settings.heatFlux) }} />
                                {messages.heatFlux}</h3>
                                <Field label={messages.targetHeatFlux} value={drafts.heatFlux} unit="mW/mm²" min="10"
                                    max="500"
                                    step="10"
                                    onChange={changeHeatFlux} />
                                <output className="coil-heatflux-output" aria-live="off">
                                    <strong>{displayNumber(result.recommendPower, 1)} W</strong>
                                    <span aria-hidden="true">·</span>
                                    <strong>{displayNumber(result.recommendVoltage, 1)} V</strong>
                                </output>
                                <small className="coil-heatflux-formula">P ≈ q″ × A · V ≈ √(P × R)</small>
                            </div>
                            <div id="coil-advanced-results" className="coil-advanced-results"
                                hidden={!settings.advanced}><h3>{messages.coilDimensions}</h3>
                                <dl className="coil-result-list">
                                <ResultRow label={messages.wireLengthInCoil}
                                    value={lengthValue(result.wireLength - settings.legLength, 2)} unit={unit}
                                    warning={result.wireLengthWarning} />
                                <ResultRow label={messages.outerDiameter}
                                    value={lengthValue(result.outerDiameter, 2)} unit={unit} />
                                <ResultRow label={messages.neutralAxisDiameter}
                                    value={lengthValue(result.neutralAxisDiameter, 2)} unit={unit} />
                                <ResultRow label={messages.loopCircumference}
                                    value={lengthValue(result.loopCircumference, 2)} unit={unit} />
                                <ResultRow label={messages.helixAngle} value={displayNumber(result.helixAngle, 1)} unit="°" />
                                <ResultRow label={messages.loopLength} value={lengthValue(result.loopLength, 2)} unit={unit} />
                                <ResultRow label={messages.coilWidth} value={lengthValue(result.coilWidth, 2)} unit={unit} />
                                <ResultRow label={messages.surfaceArea} value={areaValue(result.surfaceArea)}
                                    unit={settings.showSi ? "mm²" : "in²"} />
                                <ResultRow label={messages.coilArea} value={areaValue(result.coilArea)}
                                    unit={settings.showSi ? "mm²" : "in²"} />
                                <ResultRow label={messages.crossSectionalArea} value={areaValue(result.crossSectionalArea)}
                                    unit={settings.showSi ? "mm²" : "in²"} />
                                <ResultRow label={messages.wireVolume} value={volumeValue(result.wireVolume)}
                                    unit={settings.showSi ? "mm³" : "in³"} />
                                <ResultRow label={messages.density}
                                    value={optionalResult(result.density, densityValue)}
                                    unit={result.density === null ? undefined : densityUnit} />
                                <ResultRow label={messages.wireMass}
                                    value={optionalResult(result.wireMass, massValue)}
                                    unit={result.wireMass === null ? undefined : massUnit} />
                            </dl></div>
                        </>}
                </section>
            </div>
            <CalculatorLegacyNote href="old/coil" />
        </main>
        </SiteLayout>
    </NumericDraftReset.Provider>;
};
