import { useEffect, useRef, useState, type ReactElement } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";
import "../styles/transient-message.css";

/** Long enough to read and act on; messages also stay until they are dismissed or replaced. */
export const transientMessageDuration = 20_000;

export const useTransientMessage = (duration = transientMessageDuration) => {
    const [message, setMessage] = useState<string>();
    const timer = useRef<number | undefined>(undefined);
    const clearMessage = (): void => {
        if (timer.current !== undefined) window.clearTimeout(timer.current);
        timer.current = undefined;
        setMessage(undefined);
    };
    const showMessage = (text: string): void => {
        if (timer.current !== undefined) window.clearTimeout(timer.current);
        setMessage(text);
        timer.current = window.setTimeout(clearMessage, duration);
    };
    useEffect(() => () => {
        if (timer.current !== undefined) window.clearTimeout(timer.current);
    }, []);
    return { message, showMessage, clearMessage } as const;
};

export type TransientMessageProps = {
    readonly message?: string;
    readonly onDismiss: () => void;
    readonly className?: string;
};

/**
 * The status region stays in the document so screen readers announce each new message once; the dismiss button
 * sits outside it so it is not read as part of the message.
 */
export const TransientMessage = ({
    message,
    onDismiss,
    className = "se-transient-message",
}: TransientMessageProps): ReactElement => <div className={message === undefined ? undefined : className}>
    <p className="se-transient-message__text" role="status">{message}</p>
    {message !== undefined && <button type="button" className="se-transient-message__dismiss"
        aria-label={messagesFor(pageLocale()).notice.dismiss} onClick={onDismiss}>
        <span aria-hidden="true">×</span>
    </button>}
</div>;
