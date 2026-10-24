import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import {
    createDefaultState,
    fieldCodeByField,
    getLockTargetForField,
    getLockRules,
    isDefaultLockSettings,
    isDefaultOhmValues,
    resetOhmLockSettings,
    resetOhmValues,
    selectSimpleLock,
    setSimpleLockPair,
    setCustomLock,
    type OhmField,
    type OhmState
} from './domain';
import { calculateOhmValues } from './api';
import { createOhmPersistence } from './persistence';
import { createDebouncedRequest, debouncedRequestSuperseded } from '../../shared/debounced-request';
import '../../shared/styles/foundation.css';
import { NumericField } from '../../shared/ui/form-fields';
import { NumericDraftReset } from '../../shared/ui/numeric-input';
import { formatDisplayNumber } from '../../shared/domain/numeric';
import { pageLocale } from '../../i18n/page-locale';
import { parseNumericInput } from '../../shared/domain/numeric';
import { messagesFor } from '../../i18n/messages';
import { CalculatorLegacyNote, CalculatorPageHeader } from '../../shared/ui/calculator-page-header';
import { SiteLayout } from '../../shared/ui/site-layout';
import { TransientMessage, transientMessageDuration } from '../../shared/ui/transient-message';
import './ohm.css';

const fields = [
    { field: 'resistance', unit: 'Ω' },
    { field: 'voltage', unit: 'V' },
    { field: 'current', unit: 'A' },
    { field: 'power', unit: 'W' }
] as const satisfies ReadonlyArray<{ field: OhmField; unit: string }>;

const lockOptions = {
    resistance: ['voltage', 'current', 'power'],
    voltage: ['resistance', 'current', 'power'],
    current: ['resistance', 'voltage', 'power'],
    power: ['resistance', 'voltage', 'current']
} as const satisfies Readonly<Record<OhmField, readonly OhmField[]>>;

const joinNames = (names: readonly string[], conjunction: string): string => {
    if (names.length < 2) return names[0] ?? '';
    if (names.length === 2) return names.join(` ${conjunction} `);
    return `${names.slice(0, -1).join(', ')}, ${conjunction} ${names[names.length - 1]}`;
};

const describeLockState = (
    settings: OhmState['lockSettings'],
    labels: Readonly<Record<OhmField, string>>,
    conjunction: string,
    lockSummary: (adjusted: string, locked: string) => string,
): string => {
    const rules = getLockRules(settings);
    const lockedFields = rules.reduce<readonly OhmField[]>((result, rule) =>
        result.includes(rule.lockedField) ? result : [...result, rule.lockedField], []);
    const groups = lockedFields.map((lockedField) => ({
        lockedField,
        adjustedFields: rules.filter((rule) => rule.lockedField === lockedField)
            .map((rule) => labels[rule.adjustedField].toLowerCase())
    })).filter(({ adjustedFields }) => adjustedFields.length > 0);
    return groups.map(({ lockedField, adjustedFields }) =>
        lockSummary(joinNames(adjustedFields, conjunction), labels[lockedField])
    ).join(' ');
};

const format = (value: number): string => formatDisplayNumber(value, 2, pageLocale());
type InvalidFields = Readonly<Partial<Record<OhmField, true>>>;

export const OhmCalculator = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const locale = pageLocale();
    const messages = messagesFor(locale).ohm;
    const labels = messages.fields;
    const persistence = useMemo(() => createOhmPersistence(), []);
    const [state, setState] = useState<OhmState>(() => ({
        ...createDefaultState(),
        lockSettings: persistence.load()
    }));
    const [drafts, setDrafts] = useState<Readonly<Record<OhmField, string>>>(() => ({
        resistance: format(state.values.resistance), voltage: format(state.values.voltage),
        current: format(state.values.current), power: format(state.values.power)
    }));
    const [notice, setNotice] = useState<{ readonly panel: 'values' | 'locks'; readonly text: string }>();
    const [invalidFields, setInvalidFields] = useState<InvalidFields>({});
    const requestNumber = useRef(0);
    const debouncedCalculation = useMemo(() => createDebouncedRequest<OhmState['values']>(200), []);
    useEffect(() => () => debouncedCalculation.cancel(), [debouncedCalculation]);
    useEffect(() => {
        if (!notice) return;
        const timeout = window.setTimeout(() => setNotice(undefined), transientMessageDuration);
        return () => window.clearTimeout(timeout);
    }, [notice]);
    useEffect(() => {
        persistence.save(state.lockSettings);
    }, [persistence, state.lockSettings]);
    const refreshDrafts = (values: OhmState['values']) => setDrafts({
        resistance: format(values.resistance), voltage: format(values.voltage),
        current: format(values.current), power: format(values.power)
    });
    const updateValue = (field: OhmField, raw: string) => {
        setDrafts((current) => ({ ...current, [field]: raw }));
        const value = parseNumericInput(raw);
        if (value === undefined || value <= 0) {
            requestNumber.current += 1;
            debouncedCalculation.cancel();
            return;
        }
        setInvalidFields((current) => {
            if (current[field] === undefined) return current;
            const next = { ...current };
            delete next[field];
            return next;
        });
        const request = ++requestNumber.current;
        const lock = getLockTargetForField(state.lockSettings, field);
        void debouncedCalculation.schedule(
            () => calculateOhmValues(state.values, field, value, lock),
        ).then((values) => {
            if (request !== requestNumber.current) return;
            setState((current) => ({ ...current, values }));
            refreshDrafts(values);
            setDrafts((current) => ({ ...current, [field]: raw }));
            setInvalidFields({});
        }).catch((error: unknown) => {
            if (error === debouncedRequestSuperseded) return;
            if (request === requestNumber.current) {
                setNotice({ panel: 'values', text: messages.serviceUnavailable });
            }
        });
    };
    const commitValue = (field: OhmField, raw: string) => {
        const value = parseNumericInput(raw);
        if (value === undefined || value <= 0) {
            setInvalidFields((current) => ({ ...current, [field]: true }));
        }
    };
    const prepareForReset = () => {
        requestNumber.current += 1;
        debouncedCalculation.cancel();
    };
    const resetValues = () => {
        setInputReset((revision) => revision + 1);
        prepareForReset();
        const defaultState = createDefaultState();
        setState((current) => resetOhmValues(current));
        refreshDrafts(defaultState.values);
        setInvalidFields({});
        setNotice({ panel: 'values', text: messages.defaultsRestored });
    };
    const resetLocks = () => {
        prepareForReset();
        setState((current) => resetOhmLockSettings(current));
        setNotice({ panel: 'locks', text: messages.defaultsRestored });
    };
    const renderNotice = (panel: 'values' | 'locks') => <TransientMessage className="notice"
        message={notice?.panel === panel ? notice.text : undefined} onDismiss={() => setNotice(undefined)} />;
    const chooseSimple = (field: OhmField) => setState((current) => ({
        ...current, lockSettings: selectSimpleLock(current.lockSettings, field)
    }));
    const choosePrimary = (field: OhmField) => setState((current) => {
        const previousPrimary = current.lockSettings.primaryField;
        const previousSecondary = current.lockSettings.secondaryField;
        const nextSecondary = previousSecondary === field ? previousPrimary : previousSecondary;
        return {
            ...current,
            lockSettings: nextSecondary && nextSecondary !== field
                ? setSimpleLockPair(current.lockSettings, field, nextSecondary)
                : selectSimpleLock(current.lockSettings, field),
        };
    });
    const chooseSecondary = (field: OhmField) => setState((current) => {
        const primaryField = current.lockSettings.primaryField;
        return primaryField && primaryField !== field ? {
            ...current,
            lockSettings: setSimpleLockPair(current.lockSettings, primaryField, field),
        } : current;
    });
    const chooseDetailed = (field: OhmField, lock: OhmField) => setState((current) => ({
        ...current, lockSettings: setCustomLock(current.lockSettings, field, lock)
    }));
    const updateAdvanced = () => setState((current) => ({
        ...current, lockSettings: { ...current.lockSettings, advancedMode: !current.lockSettings.advancedMode }
    }));
    const primary = state.lockSettings.primaryField;
    const secondary = state.lockSettings.secondaryField;
    const simpleRuleSummaries = primary && secondary ? {
        primary: messages.lockSummary(joinNames(
            fields.filter(({ field }) => field !== primary).map(({ field }) => labels[field].toLowerCase()),
            messages.descriptionBetweenLaws,
        ), labels[primary]),
        secondary: messages.lockSummary(labels[primary].toLowerCase(), labels[secondary]),
    } : undefined;

    return <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" className="ohm-app" currentRoute="ohm" rootHref=".">
        <main id="main" className="page-content">
            <CalculatorPageHeader className="ohm-page-header" eyebrow={messages.eyebrow}
                title={messages.title}
                description={<>
                    {messages.descriptionBeforeOhm} <a href="./catalog/concept/ohms-law">{messages.title}</a>{' '}
                    {messages.descriptionBetweenLaws} <a href="./catalog/concept/joule-heating">
                        {messages.joulesLawLinkLabel ?? "Joule's law"}
                    </a>{' '}
                    {messages.descriptionAfterLaws}
                </>} />
            <div className="ohm-layout">
            <section className="se-card ohm-card" aria-labelledby="values-title">
                <div className="se-split-heading se-split-heading--center ohm-heading values-heading">
                    <h2 className="ohm-panel-title" id="values-title">{messages.values}</h2>
                    {!isDefaultOhmValues(state.values) && <div className="ohm-menu">
                        <button className="se-button" type="button" onClick={resetValues}>
                            <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" /> {messages.reset}
                        </button>
                    </div>}
                </div>
                {renderNotice('values')}
                {fields.map(({ field, unit }) => <NumericField key={field}
                    label={<><b>{labels[field]}</b> <small>{fieldCodeByField[field].toUpperCase()}</small></>}
                    id={`cc-${fieldCodeByField[field]}`}
                    ariaLabel={`${labels[field]} ${fieldCodeByField[field].toUpperCase()}`}
                    value={drafts[field]} unit={unit} min="0" step={field === 'power' ? '0.5' : '0.1'}
                    onChange={(value) => updateValue(field, value)} onCommit={(value) => commitValue(field, value)}
                    error={invalidFields[field] ? <>{labels[field]} &gt; 0</> : undefined}
                    fieldClassName="ohm-field" errorClassName="ohm-field-error"
                    inputWrapperClassName="ohm-input" />)}
            </section>
            <section className="se-card ohm-card lock-card" aria-labelledby="lock-title">
                <div className="se-split-heading se-split-heading--center ohm-heading lock-heading">
                    <h2 id="lock-title">{messages.lock}</h2>
                    {!isDefaultLockSettings(state.lockSettings) && <div className="ohm-menu">
                        <button className="se-button" type="button" onClick={resetLocks}>
                            <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" /> {messages.reset}
                        </button>
                    </div>}
                </div>
                {renderNotice('locks')}
                <p className="help-text">{messages.help}</p>
                {primary && secondary && simpleRuleSummaries ? <div className="simple-locks" role="group"
                    aria-label={messages.simpleLocks}>
                    <label className="simple-lock-rule">
                        <span>{simpleRuleSummaries.primary}</span>
                        <select value={primary} onChange={(event) => choosePrimary(event.target.value as OhmField)}>
                            {fields.map(({ field }) => <option key={field} value={field}>{labels[field]}</option>)}
                        </select>
                    </label>
                    <label className="simple-lock-rule">
                        <span>{simpleRuleSummaries.secondary}</span>
                        <select value={secondary} onChange={(event) => chooseSecondary(event.target.value as OhmField)}>
                            {fields.filter(({ field }) => field !== primary).map(({ field }) =>
                                <option key={field} value={field}>{labels[field]}</option>)}
                        </select>
                    </label>
                </div> : <label className="simple-lock-rule simple-lock-rule--custom">
                    <span>{messages.simpleLocks}</span>
                    <select value="" onChange={(event) => chooseSimple(event.target.value as OhmField)}>
                        <option value="" disabled>{messages.detailedLocks}</option>
                        {fields.map(({ field }) => <option key={field} value={field}>{labels[field]}</option>)}
                    </select>
                </label>}
                <button className="detail-toggle" type="button" onClick={updateAdvanced}
                    aria-expanded={state.lockSettings.advancedMode} aria-controls="detailed-locks">
                    {state.lockSettings.advancedMode ? messages.hideDetailedLocks : messages.showDetailedLocks}
                </button>
                {state.lockSettings.advancedMode && <div className="advanced-locks" id="detailed-locks">
                    <h3>{messages.detailedLocks}</h3>
                    {fields.map(({ field }) => <fieldset key={field}>
                    <legend>{messages.adjusting(labels[field])}</legend>
                    {lockOptions[field].map((lock) => <label key={lock}><input type="radio" name={`lock-${field}`}
                        checked={getLockTargetForField(state.lockSettings, field) === lock}
                        onChange={() => chooseDetailed(field, lock)} /> {labels[lock]}</label>)}
                </fieldset>)}</div>}
                {!simpleRuleSummaries && <p className="lock-summary" role="status" aria-live="polite">
                    {describeLockState(
                        state.lockSettings, labels, messages.descriptionBetweenLaws, messages.lockSummary,
                    )}
                </p>}
            </section>
            </div>
            <section className="ohm-about"><h2>{messages.about}</h2>
            <p>{messages.aboutText}</p></section>
            <CalculatorLegacyNote href="old/ohm" />
        </main>
        </SiteLayout>
    </NumericDraftReset.Provider>;
};
