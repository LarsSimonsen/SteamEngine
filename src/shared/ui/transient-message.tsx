import { useEffect, useRef, useState, type ReactElement } from "react";
import "../styles/transient-message.css";

export const useTransientMessage = (duration: number) => {
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
};

export const TransientMessage = ({ message, onDismiss }: TransientMessageProps): ReactElement | null =>
    message === undefined ? null : <div className="se-transient-message" role="status" onClick={onDismiss}>
        {message}
    </div>;
