import { Component, type ErrorInfo, type ReactNode, type ReactElement } from "react";
import { subscribeToBackendErrors, type BackendRequestError } from "../backend-request";
import "../styles/backend-error-boundary.css";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

type ErrorState = {
    readonly error?: BackendRequestError;
    readonly retry?: () => Promise<unknown>;
    readonly cancel?: () => void;
    readonly reset?: () => void;
    readonly renderError?: Error;
    readonly detailsOpen?: boolean;
    readonly retrying?: boolean;
};

type Props = { readonly children: ReactNode };

export class BackendErrorBoundary extends Component<Props, ErrorState> {
    state: ErrorState = {};
    private unsubscribe?: () => void;
    private ignoreNextError = false;
    private ignoreNextErrorTimer?: number;

    override componentDidMount(): void {
        this.unsubscribe = subscribeToBackendErrors((error, retry, cancel, reset) =>
            this.ignoreNextError
                ? undefined
                : this.setState({ error, retry, cancel, reset, detailsOpen: false, retrying: false }));
    }

    override componentWillUnmount(): void {
        this.unsubscribe?.();
        if (this.ignoreNextErrorTimer !== undefined) window.clearTimeout(this.ignoreNextErrorTimer);
    }

    private clearIgnoredError = (): void => {
        this.ignoreNextError = false;
        if (this.ignoreNextErrorTimer !== undefined) window.clearTimeout(this.ignoreNextErrorTimer);
        this.ignoreNextErrorTimer = undefined;
    };

    private clearError = (): void => {
        this.setState({
            error: undefined,
            retry: undefined,
            cancel: undefined,
            reset: undefined,
            renderError: undefined,
            detailsOpen: false,
            retrying: false,
        });
    };

    private dismissAndIgnoreFollowUp = (action?: () => void): void => {
        this.clearError();
        this.ignoreNextError = true;
        if (this.ignoreNextErrorTimer !== undefined) window.clearTimeout(this.ignoreNextErrorTimer);
        this.ignoreNextErrorTimer = window.setTimeout(() => this.clearIgnoredError(), 2000);
        action?.();
    };

    override componentDidCatch(error: Error, _info: ErrorInfo): void {
        this.setState({
            error: new Error(error.message) as BackendRequestError,
            retry: async () => this.setState({}),
            cancel: () => undefined,
            reset: () => undefined,
            renderError: error,
            detailsOpen: false,
            retrying: false,
        });
    }

    private retry = async (): Promise<void> => {
        const current = this.state;
        if (!current.error || !current.retry) return;
        this.setState({ ...current, retrying: true });
        try {
            await current.retry();
            this.clearError();
        } catch {
            // The shared request client reports the retry failure and refreshes the popup.
        }
    };

    override render(): ReactElement {
        const state = this.state;
        const messages = messagesFor(pageLocale());
        return <>
            {state.renderError ? null : this.props.children}
            {state.error && <aside className="backend-error" role="alertdialog" aria-labelledby="backend-error-title">
                <div className="backend-error__panel">
                    <h2 id="backend-error-title">{messages.error.title}</h2>
                    <p>{state.error.message}</p>
                    {state.detailsOpen && <pre className="backend-error__details">
                        {state.error.status ? `HTTP ${state.error.status}\n` : ""}
                        {state.error.endpoint}
                        {state.renderError ? `\n\n${state.renderError.stack ?? state.renderError.message}` : ""}
                    </pre>}
                    <div className="backend-error__actions">
                        <button type="button" onClick={() => {
                            this.dismissAndIgnoreFollowUp(state.cancel);
                        }}>{messages.error.cancel}</button>
                        <button type="button" onClick={() => {
                            this.dismissAndIgnoreFollowUp(state.reset);
                        }}>{messages.error.reset}</button>
                        <button type="button" className="se-button se-button--quiet backend-error__details-toggle"
                            onClick={() => this.setState({ ...state, detailsOpen: !state.detailsOpen })}>
                            {state.detailsOpen ? messages.error.hideDetails : messages.error.viewDetails}
                        </button>
                        <button type="button" onClick={() => void this.retry()} disabled={state.retrying}>
                            {state.retrying ? messages.error.retrying : messages.error.retry}
                        </button>
                    </div>
                </div>
            </aside>}
        </>;
    }
}
