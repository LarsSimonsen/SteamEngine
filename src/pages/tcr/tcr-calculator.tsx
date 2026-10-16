import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import type { CustomMaterial, DefaultMaterial } from "../../catalogs/materials/catalog";
import { MaterialManager } from "../../catalogs/materials/material-manager";
import { createMaterialRepository } from "../../catalogs/materials/repository";
import "../../shared/styles/foundation.css";
import { useRepository } from "../../shared/hooks/use-repository";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { CatalogSelectOptions } from "../../shared/ui/catalog-select-options";
import { SiteLayout } from "../../shared/ui/site-layout";
import {
    addSelectedMaterial,
    celsiusToFahrenheit,
    defaultTcrSettings,
    formatTemperaturePoints,
    isDefaultTcrSettings,
    materialsWithTemperatureData,
    parseTemperaturePoints,
    removeSelectedMaterial,
    updateSelectedResistance,
    type TcrSettings,
    type TcrCalculation,
    type TemperatureScale,
} from "./domain";
import { calculateTcrFromApi } from "./api";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import { createTcrPersistence } from "./persistence";
import { calculatorMessagesFor, type CalculatorRouteMessages } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";
import "./tcr.css";

const formatResult = (value: number, decimals = 6): string => {
    if (!Number.isFinite(value)) return "—";
    return value.toFixed(decimals);
};

const sameTemperatures = (left: readonly number[], right: readonly number[]): boolean =>
    left.length === right.length
    && left.every((temperature, index) => Math.abs(temperature - right[index]) < 0.000001);

const scaleLabel = (scale: TemperatureScale): string => scale === "fahrenheit" ? "°F" : "°C";

const TcrMaterialSelect = ({
    value,
    defaultMaterials,
    visibleDefaultMaterialIds,
    customMaterials,
    messages,
    onChange,
}: {
    readonly value: string;
    readonly defaultMaterials: readonly DefaultMaterial[];
    readonly visibleDefaultMaterialIds: ReadonlySet<string>;
    readonly customMaterials: readonly CustomMaterial[];
    readonly messages: CalculatorRouteMessages;
    readonly onChange: (value: string) => void;
}): ReactElement => {
    const selectableDefaults = materialsWithTemperatureData(defaultMaterials).filter(
        (material) => visibleDefaultMaterialIds.has(material.id) || material.id === value,
    );
    const selectableCustom = materialsWithTemperatureData(customMaterials);
    const available = selectableDefaults.some((material) => material.id === value)
        || selectableCustom.some((material) => material.id === value);
    return <label className="tcr-field" htmlFor="tcr-material-select">
        <span>{messages.materialToAdd}</span>
        <select id="tcr-material-select" value={available ? value : ""}
            onChange={(event) => onChange(event.target.value)}>
            <CatalogSelectOptions defaultItems={selectableDefaults} customItems={selectableCustom}
                defaultGroupLabel={messages.builtInMaterials ?? "Built-in materials"}
                customGroupLabel={messages.customMaterials ?? "Custom materials"}
                placeholder={available ? undefined : { value: "", label: messages.selectMaterialPlaceholder }}
                optionLabel={(material) => <>{material.name} ({material.tfr ? "TFR" : "TCR"})</>} />
        </select>
    </label>;
};

export const TcrCalculator = (): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).tcr;
    const [materialRepository, materialSnapshot] = useRepository(createMaterialRepository);
    const persistence = useMemo(
        () => createTcrPersistence(undefined, () => materialRepository.getSnapshot().allMaterials),
        [materialRepository],
    );
    const [settings, setSettings] = useState<TcrSettings>(() => persistence.load());
    const [temperatureDraft, setTemperatureDraft] = useState(
        () => formatTemperaturePoints(settings.temperaturesCelsius, settings.scale),
    );
    const [materialToAdd, setMaterialToAdd] = useState(
        () => materialsWithTemperatureData(materialRepository.getSnapshot().visibleDefaultMaterials)[0]?.id ?? "",
    );
    const [resistanceDrafts, setResistanceDrafts] = useState<Readonly<Record<number, string>>>(
        () => Object.fromEntries(settings.selectedMaterials.map(
            (material) => [material.id, String(material.resistance)],
        )),
    );
    const [validation, setValidation] = useState("");
    const [notice, setNotice] = useState("");
    const [calculation, setCalculation] = useState<TcrCalculation>({ kind: "empty" });
    const debouncedCalculation = useMemo(() => createDebouncedRequest<TcrCalculation>(200), []);
    const [showMaterialManager, setShowMaterialManager] = useState(false);
    const skipNextSave = useRef(false);

    useEffect(
        () => materialRepository.registerReferences("tcr-active-settings", {
            label: "Current TCR calculator settings",
            materialIds: () => settings.selectedMaterials.map((material) => material.materialId),
        }),
        [materialRepository, settings.selectedMaterials],
    );
    useEffect(() => {
        if (skipNextSave.current) {
            skipNextSave.current = false;
            return;
        }
        persistence.save(settings);
    }, [persistence, settings]);

    useEffect(() => {
        setResistanceDrafts(Object.fromEntries(settings.selectedMaterials.map(
            (material) => [material.id, String(material.resistance)],
        )));
    }, [settings.selectedMaterials]);

    useEffect(() => {
        void debouncedCalculation.schedule(() => calculateTcrFromApi(settings, materialSnapshot.allMaterials))
            .then(setCalculation).catch((error: unknown) => {
                if (error !== debouncedRequestSuperseded) return;
            });
        return () => debouncedCalculation.cancel();
    }, [debouncedCalculation, materialSnapshot.allMaterials, settings]);

    const changeScale = () => {
        const scale: TemperatureScale = settings.scale === "fahrenheit" ? "celsius" : "fahrenheit";
        setSettings((current) => ({ ...current, scale }));
        setTemperatureDraft(formatTemperaturePoints(settings.temperaturesCelsius, scale));
        setValidation("");
    };

    const commitTemperaturePoints = () => {
        const parsed = parseTemperaturePoints(temperatureDraft, settings.scale);
        if (parsed.kind === "invalid") {
            setValidation(parsed.message);
            return;
        }
        setValidation("");
        if (sameTemperatures(parsed.temperaturesCelsius, settings.temperaturesCelsius)) return;
        const clearedMaterials = settings.selectedMaterials.length > 0;
        setSettings((current) => ({
            ...current,
            temperaturesCelsius: parsed.temperaturesCelsius,
            selectedMaterials: [],
        }));
        if (clearedMaterials) setNotice("Temperature points changed; selected materials were cleared.");
    };

    const addMaterial = () => {
        setSettings((current) => addSelectedMaterial(
            current,
            materialToAdd,
            materialSnapshot.allMaterials,
        ));
        setValidation("");
        setNotice("");
    };

    const removeMaterial = (selectedMaterialId: number) => {
        setSettings((current) => removeSelectedMaterial(current, selectedMaterialId));
        setNotice("");
    };

    const commitResistance = (selectedMaterialId: number) => {
        const resistance = Number(resistanceDrafts[selectedMaterialId]);
        if (!Number.isFinite(resistance) || resistance <= 0) {
            const selected = settings.selectedMaterials.find((material) => material.id === selectedMaterialId);
            setResistanceDrafts((current) => ({
                ...current,
                [selectedMaterialId]: String(selected?.resistance ?? 1),
            }));
            setValidation("Every base resistance must be greater than zero.");
            return;
        }
        setSettings((current) => updateSelectedResistance(current, selectedMaterialId, resistance));
        setValidation("");
    };

    const reset = () => {
        const defaults = defaultTcrSettings();
        skipNextSave.current = true;
        persistence.clear();
        setSettings(defaults);
        setTemperatureDraft(formatTemperaturePoints(defaults.temperaturesCelsius, defaults.scale));
        setValidation("");
        setNotice("TCR settings were reset.");
    };

    const downloadCsv = () => {
        if (calculation.kind !== "valid" || calculation.csv.kind !== "ready") return;
        const url = URL.createObjectURL(new Blob([calculation.csv.text], { type: "text/csv;charset=utf-8" }));
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "SteamEngine-DNA200.csv";
        anchor.click();
        URL.revokeObjectURL(url);
    };

    const defaultDraft = formatTemperaturePoints(defaultTcrSettings().temperaturesCelsius, "fahrenheit");
    const showReset = !isDefaultTcrSettings(settings)
        || (settings.scale === "fahrenheit" && temperatureDraft !== defaultDraft);
    const visibleDefaultMaterialIds = useMemo(
        () => new Set(materialSnapshot.visibleDefaultMaterials.map((material) => material.id)),
        [materialSnapshot.visibleDefaultMaterials],
    );

    return <SiteLayout basePath="./" className="tcr-app" currentRoute="tcr" rootHref=".">
        <main className="page-content tcr-page">
            <CalculatorPageHeader className="tcr-page-header" eyebrow={messages.eyebrow}
                title={messages.title} description={messages.description}
                actionsClassName="se-page-header__action-buttons tcr-page-header__actions" actions={
                    <button type="button" className={showMaterialManager ? "active" : ""}
                        aria-expanded={showMaterialManager}
                        aria-controls="tcr-material-manager"
                        onClick={() => setShowMaterialManager((visible) => !visible)}>
                        <FontAwesomeIcon icon={faSliders} aria-hidden="true" /> {messages.manageMaterials}
                    </button>
                } />

            {showMaterialManager && <div id="tcr-material-manager">
                <MaterialManager repository={materialRepository}
                    onClose={() => setShowMaterialManager(false)} />
            </div>}

            <aside className="se-alert se-alert--info tcr-wirewiz-note">
                <strong>{messages.needModel}</strong> <a href="../wirewiz">{messages.wireWizard}</a> for wire
                {messages.needModelText}
            </aside>

            {validation && <p className="se-alert se-alert--warning tcr-validation"
                role="alert">{validation}</p>}
            {notice && <p className="se-alert se-alert--info tcr-notice" role="status">{notice}</p>}

            <div className="tcr-layout">
                <section className="se-card se-card--soft-shadow tcr-panel tcr-controls"
                    aria-labelledby="tcr-controls-title">
                    <div className="se-split-heading tcr-panel-heading">
                        <h2 id="tcr-controls-title">{messages.controls}</h2>
                        {showReset && <button type="button" className="se-button se-button--bordered" onClick={reset}>
                            {messages.reset}
                        </button>}
                    </div>
                    <label className="tcr-field" htmlFor="tcr-temperature-points">
                        <span>{messages.temperatureList}</span>
                        <span className="tcr-temperature-input">
                            <input id="tcr-temperature-points" value={temperatureDraft}
                                onChange={(event) => setTemperatureDraft(event.target.value)}
                                onBlur={commitTemperaturePoints}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") commitTemperaturePoints();
                                }} />
                            <button type="button" onClick={changeScale}
                                aria-label={`${messages.temperatureScale}: ${scaleLabel(settings.scale)}`}
                                aria-pressed={settings.scale === "fahrenheit"}>
                                {scaleLabel(settings.scale)}
                            </button>
                        </span>
                    </label>
                    <p className="tcr-help">{messages.help}</p>

                    <h2>{messages.selectMaterial}</h2>
                    <TcrMaterialSelect value={materialToAdd}
                        defaultMaterials={materialSnapshot.defaultMaterials}
                        visibleDefaultMaterialIds={visibleDefaultMaterialIds}
                        customMaterials={materialSnapshot.customMaterials} messages={messages}
                        onChange={setMaterialToAdd} />
                    <button type="button" className="se-button se-button--primary" onClick={addMaterial}
                        disabled={!materialToAdd}>
                        {messages.addMaterial}
                    </button>
                    <p className="tcr-help">{messages.duplicateHelp}</p>
                </section>

                <section className="se-card se-card--soft-shadow tcr-panel tcr-results"
                    aria-labelledby="tcr-results-title">
                    <div className="se-split-heading tcr-panel-heading">
                        <div>
                            <h2 id="tcr-results-title">{messages.results}</h2>
                            <p>{messages.baseAt20}</p>
                        </div>
                        <div className="tcr-sensitivity" aria-live="polite">
                            <span>{messages.sensitivity}</span>
                            <strong>{calculation.kind === "valid"
                                ? `${Math.round(calculation.sensitivityPercent)}%`
                                : "—"}</strong>
                        </div>
                    </div>

                    {calculation.kind === "empty" && <p className="tcr-empty">
                        {messages.empty}
                    </p>}
                    {calculation.kind === "invalid" && <p
                        className="se-alert se-alert--warning tcr-validation" role="alert">
                        {calculation.message}
                    </p>}
                    {calculation.kind === "valid" && <div className="se-table-scroll tcr-table-scroll">
                        <table className="se-table tcr-table">
                            <thead>
                                <tr>
                                    <th scope="col">{messages.material}</th>
                                    {settings.temperaturesCelsius.map((temperature, index) => <th scope="col"
                                        key={`${temperature}-${index}`}>
                                        {formatResult(temperature, 1)} °C<br />
                                        <small>{formatResult(celsiusToFahrenheit(temperature), 1)} °F</small>
                                    </th>)}
                                    <th scope="col">{messages.baseResistance}</th>
                                    <th scope="col"><span className="sr-only">{messages.actions}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculation.rows.map((row) => <tr key={row.id}>
                                    <th scope="row">
                                        {row.material.name}
                                        <small>{row.material.tfr ? "TFR" : "TCR"}</small>
                                    </th>
                                    {row.resistances.map((resistance, index) => <td key={index}>
                                        {formatResult(resistance)} Ω
                                    </td>)}
                                    <td>
                                        <label className="sr-only" htmlFor={`tcr-resistance-${row.id}`}>
                                            {messages.baseFor} {row.material.name} {row.id}
                                        </label>
                                        <input id={`tcr-resistance-${row.id}`} type="number" min="0.000001"
                                            step="0.01" value={resistanceDrafts[row.id] ?? row.resistance}
                                            onChange={(event) => setResistanceDrafts((current) => ({
                                                ...current,
                                                [row.id]: event.target.value,
                                            }))}
                                            onBlur={() => commitResistance(row.id)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") commitResistance(row.id);
                                            }} />
                                    </td>
                                    <td><button type="button" className="se-button se-button--bordered"
                                        aria-label={`${messages.removeMaterial} ${row.material.name} ${row.id}`}
                                        onClick={() => removeMaterial(row.id)}>
                                        {messages.remove}
                                    </button></td>
                                </tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="row">{messages.totalParallel}</th>
                                    {calculation.totalResistances.map((resistance, index) => <td key={index}>
                                        {formatResult(resistance)} Ω
                                    </td>)}
                                    <td colSpan={2}></td>
                                </tr>
                                <tr>
                                    <th scope="row">{messages.normalizedTfr}</th>
                                    {settings.temperaturesCelsius.map((_, index) => <td key={index}>
                                        {formatResult(calculation.normalizedFactors[index])}
                                    </td>)}
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>}
                </section>
            </div>

            <section className="se-card se-card--soft-shadow tcr-panel tcr-export"
                aria-labelledby="tcr-export-title">
                <div>
                    <h2 id="tcr-export-title">{messages.export}</h2>
                    <p>{messages.exportHelp}</p>
                    {calculation.kind === "valid" && calculation.extrapolated
                        && <p className="tcr-export-message">
                            {messages.extrapolated}
                        </p>}
                    {calculation.kind === "valid" && calculation.csv.kind === "unavailable"
                        && <p className="tcr-export-message">{calculation.csv.message}</p>}
                </div>
                <textarea readOnly aria-label={messages.csvOutput} rows={9}
                    value={calculation.kind === "valid" && calculation.csv.kind === "ready"
                        ? calculation.csv.text
                        : ""} />
                <button type="button" className="se-button se-button--primary" onClick={downloadCsv}
                    disabled={calculation.kind !== "valid" || calculation.csv.kind !== "ready"}>
                    {messages.downloadCsv}
                </button>
            </section>

            <section className="se-card se-card--soft-shadow tcr-about" aria-labelledby="tcr-about-title">
                <h2 id="tcr-about-title">{messages.about}</h2>
                <div>
                    <p>
                        {messages.aboutOne}
                    </p>
                    <p>
                        {messages.aboutTwo}
                    </p>
                </div>
            </section>
            <CalculatorLegacyNote href="old/tcr" />
        </main>
    </SiteLayout>;
};
