import { catalogErrorFor } from "../../i18n/catalog-errors";
import { catalogLoadFailure } from "../../i18n/messages/fi";
import { Fragment, useState, type ReactElement, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faPenToSquare, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";
import "../styles/catalog-manager.css";

export type CatalogItem = {
    readonly id: string;
};

export type CatalogEditorMode<DefaultItem, CustomItem> =
    | { readonly kind: "create" }
    | { readonly kind: "clone"; readonly source: DefaultItem }
    | { readonly kind: "edit"; readonly source: CustomItem };

export type CatalogOperationResult =
    | { readonly kind: "success" }
    | { readonly kind: "invalid"; readonly message: string }
    | { readonly kind: "blocked"; readonly references: readonly string[] };

export type CatalogManagerProps<DefaultItem extends CatalogItem, CustomItem extends CatalogItem> = {
    readonly idPrefix: string;
    readonly noun: string;
    readonly pluralNoun: string;
    readonly onClose: () => void;
    readonly storageKey: string;
    readonly error?: string;
    readonly defaultItems: readonly DefaultItem[];
    readonly customItems: readonly CustomItem[];
    readonly hiddenDefaultIds: ReadonlySet<string>;
    readonly defaultItemLabel: (item: DefaultItem) => string;
    readonly defaultItemHref?: (item: DefaultItem) => string | undefined;
    readonly defaultVisibilityControl?: "checkbox" | "toggle";
    readonly customItemLabel: (item: CustomItem) => string;
    readonly customItemSummary: (item: CustomItem) => ReactNode;
    readonly customItemsDescription: string;
    readonly setDefaultVisible: (id: string, visible: boolean) => CatalogOperationResult;
    readonly referencesFor: (id: string) => readonly string[];
    readonly deleteCustom: (id: string) => CatalogOperationResult;
    readonly reset: () => CatalogOperationResult;
    readonly renderEditor: (
        mode: CatalogEditorMode<DefaultItem, CustomItem>,
        onSaved: (message: string) => void,
        onCancel: () => void,
    ) => ReactNode;
};

const operationMessage = (noun: string, result: CatalogOperationResult): string | undefined =>
    result.kind === "invalid"
        ? catalogErrorFor(pageLocale(), result.message)
        : result.kind === "blocked"
            ? messagesFor(pageLocale()).catalogManager.usedBy(noun, result.references.join(", "))
            : undefined;

export const CatalogManager = <DefaultItem extends CatalogItem, CustomItem extends CatalogItem>({
    idPrefix,
    noun,
    pluralNoun,
    onClose,
    storageKey,
    error,
    defaultItems,
    customItems,
    hiddenDefaultIds,
    defaultItemLabel,
    defaultItemHref,
    defaultVisibilityControl = "checkbox",
    customItemLabel,
    customItemSummary,
    customItemsDescription,
    setDefaultVisible,
    referencesFor,
    deleteCustom,
    reset,
    renderEditor,
}: CatalogManagerProps<DefaultItem, CustomItem>): ReactElement => {
    const [filter, setFilter] = useState("");
    const [editor, setEditor] = useState<CatalogEditorMode<DefaultItem, CustomItem>>();
    const [message, setMessage] = useState<string>();
    const [confirmDeleteId, setConfirmDeleteId] = useState<string>();
    const [confirmReset, setConfirmReset] = useState(false);
    const titleId = `${idPrefix}-title`;
    const messages = messagesFor(pageLocale()).catalogManager;
    const visibilityMessages = messagesFor(pageLocale()).calculatorVisibility;
    const displayNoun = pageLocale() === "nb"
        ? ({ Material: "materiale", Battery: "batteri", Mod: "mod" }[noun] ?? noun).toLocaleLowerCase()
        : noun.toLocaleLowerCase();
    const displayPlural = pageLocale() === "nb"
        ? ({ Materials: "materialer", Batteries: "batterier", Mods: "modder" }[pluralNoun] ?? pluralNoun)
        : pluralNoun.toLocaleLowerCase();
    const localizedCustomItemsDescription = pageLocale() === "nb"
        ? ({
            Materials: "Egendefinerte materialer vises alltid i kalkulatorvelgere.",
            Batteries: "Egendefinerte batterier vises alltid i kalkulatorvelgeren.",
            Mods: "Egendefinerte modder vises alltid i kalkulatorvelgeren.",
        }[pluralNoun] ?? customItemsDescription)
        : customItemsDescription;

    const performReset = (): void => {
        if (!confirmReset) {
            setConfirmReset(true);
            return;
        }
        const result = reset();
        setMessage(result.kind === "success"
            ? messages.savedReset(displayNoun)
            : operationMessage(displayNoun, result));
        setConfirmReset(false);
    };

    if (error) {
        return <section className="se-card catalog-manager" aria-labelledby={titleId}>
            <header className="catalog-manager__header"><div>
                <h2 id={titleId}>{messages.manage(displayPlural)} <small>
                    — {messages.shared(displayNoun)}
                </small></h2>
            </div>
                <button type="button" className="catalog-manager__close"
                    title={messages.close(displayNoun)}
                    aria-label={messages.close(displayNoun)} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                </button>
            </header>
            <p className="catalog-manager__message catalog-manager__message--error" role="alert">
                {catalogErrorFor(pageLocale(), error)} {pageLocale() === "fi" ? catalogLoadFailure
                    : <>No custom {displayPlural} were loaded, and the saved data has not been overwritten.</>}
            </p>
            <div className="catalog-manager__confirm">
                {confirmReset && <p>{messages.resetSavedMessage} <code>{storageKey}</code></p>}
                <button type="button" className="catalog-manager__danger" onClick={performReset}>
                    {confirmReset ? messages.confirmReset : messages.resetSaved(displayNoun)}
                </button>
                {confirmReset && <button type="button" className="catalog-manager__quiet"
                    onClick={() => setConfirmReset(false)}>{messages.cancel}</button>}
            </div>
        </section>;
    }

    const normalizedFilter = filter.trim().toLocaleLowerCase();
    const filteredDefaults = normalizedFilter === ""
        ? defaultItems
        : defaultItems.filter((item) => defaultItemLabel(item).toLocaleLowerCase().includes(normalizedFilter));
    const deleteItem = (item: CustomItem): void => {
        const label = customItemLabel(item);
        const references = referencesFor(item.id);
        if (references.length > 0) {
            setMessage(messages.usedBy(label, references.join(", ")));
            setConfirmDeleteId(undefined);
            return;
        }
        if (confirmDeleteId !== item.id) {
            setConfirmDeleteId(item.id);
            setMessage(undefined);
            return;
        }
        const result = deleteCustom(item.id);
        setMessage(result.kind === "success" ? messages.deleted(label) : operationMessage(displayNoun, result));
        setConfirmDeleteId(undefined);
        if (editor?.kind === "edit" && editor.source.id === item.id) setEditor(undefined);
    };
    const closeEditor = (): void => setEditor(undefined);

    return <section className="se-card catalog-manager" aria-labelledby={titleId}>
        <header className="catalog-manager__header">
            <div>
                <h2 id={titleId}>{messages.manage(displayPlural)} <small>
                    — {messages.shared(displayNoun)}
                </small></h2>
                <p>{messages.choose(displayPlural)}</p></div>
            <button type="button" className="catalog-manager__close"
                title={messages.close(displayNoun)}
                aria-label={messages.close(displayNoun)} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
        </header>
        {message && <p className="catalog-manager__message" role="status">{message}</p>}
        {editor && <Fragment key={`${editor.kind}-${"source" in editor ? editor.source.id : "new"}`}>
            {renderEditor(editor, (savedMessage) => {
                setMessage(savedMessage);
                closeEditor();
            }, closeEditor)}
        </Fragment>}
        <div className="catalog-manager__columns">
            <section className="catalog-manager__group" aria-labelledby={`${idPrefix}-defaults-title`}>
                <h3 id={`${idPrefix}-defaults-title`}>{messages.builtIn(displayPlural)}</h3>
                <p>{messages.visibility(displayPlural)}</p>
                <label className="catalog-manager__search"><span>{messages.filterBuiltIns}</span>
                    <input type="search" value={filter}
                        onChange={(event) => setFilter(event.target.value)} /></label>
                <div className="catalog-manager__list">
                    {filteredDefaults.map((item) => {
                        const visible = !hiddenDefaultIds.has(item.id);
                        const label = defaultItemLabel(item);
                        const href = defaultItemHref?.(item);
                        return <article className="catalog-manager__item" key={item.id}>
                            {defaultVisibilityControl === "toggle"
                                ? <div className="catalog-manager__item-identity">
                                    <button type="button" className="catalog-manager__visibility-toggle"
                                        aria-pressed={visible} aria-label={visibilityMessages.ariaLabel(label)}
                                        onClick={() => {
                                            const result = setDefaultVisible(item.id, !visible);
                                            setMessage(operationMessage(displayNoun, result));
                                        }}>
                                        <span aria-hidden="true" className="catalog-manager__visibility-track">
                                            <span className="catalog-manager__visibility-thumb" />
                                        </span>
                                        <span className="catalog-manager__visibility-state">
                                            {visible ? visibilityMessages.shown : visibilityMessages.hidden}
                                        </span>
                                    </button>
                                    {href ? <a href={href}>{label}</a> : <span>{label}</span>}
                                </div>
                                : <label><input type="checkbox" checked={visible} onChange={(event) => {
                                    const result = setDefaultVisible(item.id, event.target.checked);
                                    setMessage(operationMessage(displayNoun, result));
                                }} /><span>{label}</span></label>}
                            <button type="button" className="catalog-manager__quiet"
                                title={`${messages.clone} ${label}`}
                                aria-label={messages.clone} onClick={() => {
                                    setEditor({ kind: "clone", source: item });
                                    setMessage(undefined);
                                }}><FontAwesomeIcon icon={faClone} aria-hidden="true" /></button>
                        </article>;
                    })}
                </div>
            </section>
            <section className="catalog-manager__group" aria-labelledby={`${idPrefix}-custom-title`}>
                <div className="catalog-manager__group-header">
                    <h3 id={`${idPrefix}-custom-title`}>{messages.custom(displayPlural)}</h3>
                    <button type="button" title={messages.newCustom(displayNoun)}
                        aria-label={messages.newCustom(displayNoun)} onClick={() => {
                        setEditor({ kind: "create" });
                        setMessage(undefined);
                    }}><FontAwesomeIcon icon={faPlus} aria-hidden="true" /></button>
                </div>
                <p>{messages.customItemsDescription?.(displayPlural) ?? localizedCustomItemsDescription}</p>
                {customItems.length === 0
                    ? <p className="catalog-manager__empty">{messages.noneYet(displayPlural)}</p>
                    : <div className="catalog-manager__list">{customItems.map((item) =>
                        <article className="catalog-manager__item catalog-manager__item--custom" key={item.id}>
                            <div><strong>{customItemLabel(item)}</strong><small>{customItemSummary(item)}</small></div>
                            <div className="catalog-manager__item-actions">
                                <button type="button" className="catalog-manager__quiet"
                                    title={`${messages.edit} ${customItemLabel(item)}`} aria-label={messages.edit}
                                    onClick={() => setEditor({ kind: "edit", source: item })}>
                                    <FontAwesomeIcon icon={faPenToSquare} aria-hidden="true" />
                                </button>
                                <button type="button" className="catalog-manager__danger"
                                    title={`${confirmDeleteId === item.id
                                        ? messages.confirmDelete
                                        : messages.delete} ${customItemLabel(item)}`}
                                    aria-label={confirmDeleteId === item.id ? messages.confirmDelete : messages.delete}
                                    onClick={() => deleteItem(item)}>
                                    <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                </button>
                                {confirmDeleteId === item.id && <button type="button"
                                    className="catalog-manager__quiet"
                                    onClick={() => setConfirmDeleteId(undefined)}>{messages.cancel}</button>}
                            </div>
                        </article>)}</div>}
            </section>
        </div>
    </section>;
};
