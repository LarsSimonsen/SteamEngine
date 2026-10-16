import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faRotateLeft, faSliders } from '@fortawesome/free-solid-svg-icons';
import {
    defaultModLimits,
    limitsFromPreset,
    modRangeFieldErrors,
    parseModRangeDrafts,
    type ModLimits,
    type ModPreset,
    type ModRangeDrafts,
    type ModRangeResult
} from './domain';
import { calculateModRangeFromApi, type ModRangeGraphResponse } from './api';
import { createDebouncedRequest, debouncedRequestSuperseded } from '../../shared/debounced-request';
import { ModManager } from '../../catalogs/mods/mod-manager';
import { createModRepository } from '../../catalogs/mods/repository';
import { ModRangeGraph } from './mod-range-graph';
import {
    clearModRangeSettings,
    loadModRangeSettings,
    saveModRangeSettings
} from './persistence';
import '../../shared/styles/foundation.css';
import { useRepository } from '../../shared/hooks/use-repository';
import { CalculatorLegacyNote, CalculatorPageHeader } from '../../shared/ui/calculator-page-header';
import { NumericField, SelectField } from '../../shared/ui/form-fields';
import { NumericDraftReset } from '../../shared/ui/numeric-input';
import { SiteLayout } from '../../shared/ui/site-layout';
import './mod-range.css';
import { formatDisplayNumber } from '../../shared/domain/numeric';
import { localizedRouteHref, pageLocale } from '../../i18n/page-locale';
import { calculatorMessagesFor } from '../../i18n/calculator-messages';

type ModRangeField = keyof ModRangeDrafts;

const fields = [
    { field: 'maxPower', label: 'Maximum power', unit: 'W', min: '1', step: '1' },
    { field: 'maxVoltage', label: 'Maximum voltage', unit: 'V', min: '0.1', step: '0.1' },
    { field: 'maxCurrent', label: 'Maximum current', unit: 'A', min: '0.1', step: '0.1' },
    { field: 'minResistance', label: 'Minimum resistance (optional)', unit: 'Ω', min: '0.05', step: '0.05' },
    { field: 'maxResistance', label: 'Maximum resistance (optional)', unit: 'Ω', min: '0.05', step: '0.05' }
] as const satisfies ReadonlyArray<{
    field: ModRangeField; label: string; unit: string; min: string; step: string
}>;

const defaultDrafts: ModRangeDrafts = {
    maxPower: '15',
    maxVoltage: '6',
    maxCurrent: '3.5',
    minResistance: '1.2',
    maxResistance: ''
};

const formatValue = (value: number): string => formatDisplayNumber(value, 2, pageLocale());

const presetLabel = (preset: ModPreset, presetById: ReadonlyMap<string, ModPreset>): string => {
    const basedOn = preset.basedOnPresetId === undefined ? undefined : presetById.get(preset.basedOnPresetId);
    return basedOn === undefined ? preset.displayName : `${preset.displayName} (${basedOn.displayName})`;
};

export const ModRangeCalculator = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const calculatorMessages = calculatorMessagesFor(pageLocale());
    const messages = calculatorMessages.modrange;
    const sharedMessages = calculatorMessages.batt;
    const [modRepository, modSnapshot] = useRepository(createModRepository);
    const [initialSettings] = useState(() => loadModRangeSettings(
        typeof localStorage === 'undefined' ? undefined : localStorage,
        modRepository.getSnapshot().allMods,
        defaultDrafts
    ));
    const initialParse = parseModRangeDrafts(initialSettings.drafts);
    const initialLimits = initialParse.kind === 'valid' ? initialParse.limits : defaultModLimits;
    const [drafts, setDrafts] = useState<ModRangeDrafts>(initialSettings.drafts);
    const draftsRef = useRef<ModRangeDrafts>(initialSettings.drafts);
    const lastValidDrafts = useRef<ModRangeDrafts>(initialParse.kind === 'valid'
        ? initialSettings.drafts
        : defaultDrafts);
    const [selectedPreset, setSelectedPreset] = useState(initialSettings.selectedPresetId);
    const [showModManager, setShowModManager] = useState(false);
    const managerDialogRef = useRef<HTMLDivElement>(null);
    const managerButtonRef = useRef<HTMLButtonElement>(null);
    const [activeLimits, setActiveLimits] = useState<ModLimits>(initialLimits);
    const [calculation, setCalculation] = useState<ModRangeResult>(() => initialParse.kind === 'valid'
        ? { kind: 'invalid', message: messages.calculating }
        : initialParse);
    const [graph, setGraph] = useState<ModRangeGraphResponse | null>(null);
    const [isUpdating, setIsUpdating] = useState(initialParse.kind === 'valid');
    const [requestError, setRequestError] = useState<string>();
    const debouncedCalculation = useMemo(() => createDebouncedRequest<{
        readonly calculation: ModRangeResult;
        readonly graph: ModRangeGraphResponse | null;
    }>(200), []);
    useEffect(() => () => debouncedCalculation.cancel(), [debouncedCalculation]);
    useEffect(() => {
        setIsUpdating(true);
        setRequestError(undefined);
        void debouncedCalculation.schedule(() => calculateModRangeFromApi(activeLimits)).then((next) => {
            setCalculation(next.calculation);
            setGraph(next.graph);
            setIsUpdating(false);
        }).catch((error: unknown) => {
            if (error === debouncedRequestSuperseded) return;
            setIsUpdating(false);
            setRequestError(error instanceof Error ? error.message : String(error));
        });
    }, [activeLimits, debouncedCalculation]);
    useEffect(() => {
        if (!showModManager) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        managerDialogRef.current?.focus();
        const handleDialogKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setShowModManager(false);
                return;
            }
            if (event.key !== 'Tab') return;
            const focusable = managerDialogRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'
            );
            if (!focusable || focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleDialogKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleDialogKeyDown);
            managerButtonRef.current?.focus();
        };
    }, [showModManager]);
    useEffect(
        () => modRepository.registerReferences('modrange-active-settings', {
            label: 'Current Mod Range settings',
            modIds: () => selectedPreset === '' ? [] : [selectedPreset]
        }),
        [modRepository, selectedPreset]
    );
    useEffect(() => {
        const savedDrafts = parseModRangeDrafts(drafts).kind === 'valid' ? drafts : lastValidDrafts.current;
        saveModRangeSettings(
            typeof localStorage === 'undefined' ? undefined : localStorage,
            { drafts: savedDrafts, selectedPresetId: selectedPreset }
        );
    }, [drafts, selectedPreset]);
    useEffect(() => {
        if (selectedPreset === '') return;
        const preset = modSnapshot.allMods.find(({ id }) => id === selectedPreset);
        if (!preset) return;
        const limits = limitsFromPreset(preset);
        const nextDrafts: ModRangeDrafts = {
            maxPower: String(limits.maxPower),
            maxVoltage: String(limits.maxVoltage),
            maxCurrent: String(limits.maxCurrent),
            minResistance: limits.minResistance === undefined ? '' : String(limits.minResistance),
            maxResistance: limits.maxResistance === undefined ? '' : String(limits.maxResistance)
        };
        draftsRef.current = nextDrafts;
        lastValidDrafts.current = nextDrafts;
        setDrafts(nextDrafts);
        setActiveLimits(limits);
        setIsUpdating(true);
    }, [modSnapshot.allMods, selectedPreset]);

    const applyDrafts = (nextDrafts: ModRangeDrafts) => {
        const parsed = parseModRangeDrafts(nextDrafts);
        if (parsed.kind === 'invalid') return;
        setIsUpdating(true);
        setActiveLimits(parsed.limits);
    };

    const updateDraft = (field: ModRangeField, raw: string) => {
        const nextDrafts = { ...draftsRef.current, [field]: raw };
        draftsRef.current = nextDrafts;
        setSelectedPreset('');
        setDrafts(nextDrafts);
        if (parseModRangeDrafts(nextDrafts).kind === 'valid') {
            lastValidDrafts.current = nextDrafts;
        } else {
            setIsUpdating(false);
        }
        applyDrafts(nextDrafts);
    };

    const choosePreset = (presetId: string) => {
        setInputReset((revision) => revision + 1);
        setSelectedPreset(presetId);
        if (!presetId) return;
        const preset = modSnapshot.allMods.find(({ id }) => id === presetId);
        if (!preset) return;
        const limits = limitsFromPreset(preset);
        const nextDrafts: ModRangeDrafts = {
            maxPower: String(limits.maxPower),
            maxVoltage: String(limits.maxVoltage),
            maxCurrent: String(limits.maxCurrent),
            minResistance: limits.minResistance === undefined ? '' : String(limits.minResistance),
            maxResistance: limits.maxResistance === undefined ? '' : String(limits.maxResistance)
        };
        draftsRef.current = nextDrafts;
        lastValidDrafts.current = nextDrafts;
        setDrafts(nextDrafts);
        setIsUpdating(true);
        applyDrafts(nextDrafts);
    };

    const presetById = useMemo(
        () => new Map(modSnapshot.allMods.map((preset) => [preset.id, preset])),
        [modSnapshot.allMods]
    );
    const selectablePresets = useMemo(() => [
        ...modSnapshot.defaultMods.filter((preset) => modSnapshot.visibleDefaultMods.some(
            ({ id }) => id === preset.id
        ) || preset.id === selectedPreset),
        ...modSnapshot.customMods
    ], [
        modSnapshot.customMods,
        modSnapshot.defaultMods,
        modSnapshot.visibleDefaultMods,
        selectedPreset
    ]);
    const selectedDefaultMod = modSnapshot.defaultMods.find(({ id }) => id === selectedPreset);
    const selectedCustomMod = modSnapshot.customMods.find(({ id }) => id === selectedPreset);
    const selectedMod = selectedDefaultMod ?? selectedCustomMod;
    const batteryDrainLink = selectedMod === undefined ? undefined : {
        href: `${localizedRouteHref(pageLocale(), 'batt')}?${new URLSearchParams({
            mod: selectedDefaultMod?.slug ?? selectedMod.id,
            power: String(activeLimits.maxPower)
        })}`,
        label: `${sharedMessages.batteryDrain}: ${selectedMod.displayName}`
    };
    const fieldErrors = modRangeFieldErrors(drafts);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const resetVisible = selectedPreset !== '' || JSON.stringify(drafts) !== JSON.stringify(defaultDrafts);

    const reset = (): void => {
        setInputReset((revision) => revision + 1);
        debouncedCalculation.cancel();
        clearModRangeSettings(typeof localStorage === 'undefined' ? undefined : localStorage);
        draftsRef.current = defaultDrafts;
        lastValidDrafts.current = defaultDrafts;
        setDrafts(defaultDrafts);
        setSelectedPreset('');
        setActiveLimits(defaultModLimits);
        setIsUpdating(true);
        setRequestError(undefined);
        void debouncedCalculation.schedule(() => calculateModRangeFromApi(defaultModLimits)).then((next) => {
            setCalculation(next.calculation);
            setGraph(next.graph);
            setIsUpdating(false);
        }).catch((error: unknown) => {
            if (error === debouncedRequestSuperseded) return;
            setIsUpdating(false);
            setRequestError(error instanceof Error ? error.message : String(error));
        });
    };

    const validCalculation = calculation.kind === 'valid' ? calculation.values : undefined;
    const result = validCalculation && (
        <div className="se-result-grid mod-range-results-grid">
            <article className="se-card se-result-grid__primary mod-range-result mod-range-result--primary">
                <h2>{messages.optimalResistance}</h2>
                <dl className="se-result-list mod-range-result-list">
                    <div><dt>{messages.maximumPowerRange}</dt><dd>{formatValue(validCalculation.minimumResistance)} – {
                        formatValue(validCalculation.maximumResistance)} Ω</dd></div>
                    <div><dt>{messages.medianResistance}</dt><dd>{validCalculation.theoreticalMedianResistance <
                        validCalculation.minimumResistance || validCalculation.theoreticalMedianResistance >
                        validCalculation.maximumResistance
                        ? <><s>{formatValue(validCalculation.theoreticalMedianResistance)}</s>{' '}
                            {formatValue(validCalculation.medianResistance)}</>
                        : formatValue(validCalculation.medianResistance)} Ω</dd></div>
                    <div className="mod-range-result-list__emphasis"><dt>{messages.sweetSpot}</dt>
                        <dd>{formatValue(validCalculation.sweetSpotResistance)} Ω</dd></div>
                </dl>
            </article>
            <article className="se-card mod-range-result">
                <h3>{messages.currentLimit}</h3>
                <p>{messages.at} {formatValue(activeLimits.maxPower)} W, {messages.currentLimitRequires}
                    {` ${formatValue(validCalculation.currentLimitRequiredVoltage)} V.`}</p>
                <dl className="se-result-list mod-range-result-list">
                    <div><dt>{messages.resistanceAtLimit}</dt>
                        <dd>{formatValue(validCalculation.currentLimitResistance)} Ω</dd></div>
                </dl>
                <p className={validCalculation.currentLimitRequiredVoltage > activeLimits.maxVoltage
                    ? 'mod-range-warning' : 'mod-range-ok'}>
                    {validCalculation.currentLimitRequiredVoltage > activeLimits.maxVoltage
                        ? messages.voltageReachedFirst : messages.currentReachedFirst}
                </p>
            </article>
            <article className="se-card mod-range-result">
                <h3>{messages.voltageLimit}</h3>
                <p>{messages.at} {formatValue(activeLimits.maxPower)} W, {messages.voltageLimitRequires}
                    {` ${formatValue(validCalculation.voltageLimitRequiredCurrent)} A.`}</p>
                <dl className="se-result-list mod-range-result-list">
                    <div><dt>{messages.resistanceAtLimit}</dt>
                        <dd>{formatValue(validCalculation.voltageLimitResistance)} Ω</dd></div>
                </dl>
                <p className={validCalculation.voltageLimitRequiredCurrent > activeLimits.maxCurrent
                    ? 'mod-range-warning' : 'mod-range-ok'}>
                    {validCalculation.voltageLimitRequiredCurrent > activeLimits.maxCurrent
                        ? messages.currentReachedFirst : messages.voltageReachedFirst}
                </p>
            </article>
        </div>
    );

    return <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" className="mod-range-app" currentRoute="modrange" rootHref=".">
        <main className="page-content">
            <CalculatorPageHeader className="mod-range-page-header" eyebrow={messages.eyebrow}
                title={messages.title} description={messages.description}
                actionsClassName="se-page-header__action-buttons mod-range-page-header__actions" actions={<>
                    {resetVisible && <button type="button" onClick={reset}>
                        <FontAwesomeIcon icon={faRotateLeft} /> {messages.reset}
                    </button>}
                </>} />
            <div className="se-sidebar-layout mod-range-layout">
            <div className="mod-range-sidebar">
            <section className="se-card mod-range-card mod-range-presets"
                aria-labelledby="mod-range-presets-title">
                <p className="eyebrow">{messages.builtInDevices}</p>
                <h2 id="mod-range-presets-title">{messages.presets}</h2>
                <p className="se-muted-copy mod-range-intro">{messages.presetIntro}</p>
                <div className="mod-range-preset-controls">
                    <SelectField fieldClassName="se-field mod-range-field" label={messages.preset}
                        ariaLabel={messages.preset} id="mod-preset" value={selectedPreset}
                        onChange={choosePreset}>
                            <option value="">{sharedMessages.customValues}</option>
                            {selectablePresets.map((preset) => <option key={preset.id} value={preset.id}>
                                {presetLabel(preset, presetById)}
                            </option>)}
                    </SelectField>
                    <button ref={managerButtonRef} type="button" className={`se-button mod-range-manage-button${
                        showModManager ? ' se-button--secondary-active' : ''}`}
                        aria-expanded={showModManager} aria-controls="mod-manager"
                        onClick={() => setShowModManager((visible) => !visible)}>
                        <FontAwesomeIcon icon={faSliders} aria-hidden="true" /> {messages.manage}
                    </button>
                </div>
                {showModManager && <div id="mod-manager" className="mod-manager-overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setShowModManager(false);
                    }}>
                    <div ref={managerDialogRef} className="mod-manager-dialog" role="dialog"
                        aria-modal="true" aria-label={messages.manage} tabIndex={-1}>
                        <ModManager repository={modRepository} onClose={() => setShowModManager(false)} />
                    </div>
                </div>}
                {selectedDefaultMod?.slug !== undefined && <a className="mod-range-encyclopedia-link"
                    href={`./catalog/mod/${selectedDefaultMod.slug}`}>{messages.details}</a>}
                {batteryDrainLink !== undefined && <a
                    className="se-button se-button--primary mod-range-battery-link"
                    href={batteryDrainLink.href} aria-label={batteryDrainLink.label}>
                    <FontAwesomeIcon icon={faBatteryFull} aria-hidden="true" /> {sharedMessages.batteryDrain}
                </a>}
                {selectedCustomMod !== undefined && <span className="mod-range-preset-status">
                    {messages.customMod}
                </span>}
                {selectedPreset === '' && <small className="mod-range-preset-status">
                    {sharedMessages.customValues}
                </small>}
            </section>
            <section className="se-card mod-range-card mod-range-inputs" aria-labelledby="mod-range-title">
                <h2 id="mod-range-title">{messages.specs}</h2>
                {fields.map(({ field, unit, min, step }) => {
                    const label = messages[field];
                    return <NumericField key={field} label={label}
                    ariaLabel={label} id={`mod-${field}`} value={drafts[field]} unit={unit} min={min} step={step}
                    placeholder={field === 'minResistance'
                        ? messages.noLowerLimit
                        : field === 'maxResistance' ? messages.noUpperLimit : undefined}
                    error={fieldErrors[field]} errorClassName="mod-range-field-error"
                    onChange={(value) => updateDraft(field, value)}
                    onCommit={(value) => updateDraft(field, value)} commitOnArrowKeys
                    fieldClassName="se-field mod-range-field"
                    inputWrapperClassName="se-input-with-unit mod-range-input" />;
                })}
            </section>
            </div>
            <section className="se-sidebar-layout__output mod-range-output" aria-live="polite"
                aria-label={messages.results}>
                {hasFieldErrors && validCalculation !== undefined && <p
                    className="se-alert se-alert--info mod-range-status" role="status">
                    {sharedMessages.resultsUseLastValidValues}
                </p>}
                {isUpdating && !hasFieldErrors && <p
                    className="se-alert se-alert--info mod-range-status" role="status">
                    {messages.calculating}
                </p>}
                {!isUpdating && !hasFieldErrors && requestError !== undefined && <p
                    className="se-alert se-alert--warning mod-range-validation" role="alert">
                    {requestError}
                </p>}
                {!isUpdating && !hasFieldErrors && requestError === undefined
                    && calculation.kind === 'invalid' && <p
                    className="se-alert se-alert--warning mod-range-validation" role="alert">
                    {calculation.message}
                </p>}
                <ModRangeGraph graph={graph} />
                {result}
            </section>
            </div>
            <CalculatorLegacyNote href="old/modrange" />
        </main>
        </SiteLayout>
    </NumericDraftReset.Provider>;
};
