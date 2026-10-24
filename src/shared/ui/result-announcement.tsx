import { useEffect, useRef, useState, type ReactElement } from "react";

/** How long results must stay unchanged before they are announced; typing restarts the wait. */
export const resultAnnouncementDelay = 1000;

/** Joins result phrases with the page language's list separators, without a final "and". */
export const resultSummary = (locale: string, parts: readonly string[]): string =>
    new Intl.ListFormat(locale, { type: "unit", style: "short" }).format(parts);

/**
 * Announces a one-sentence result summary to screen readers once the results settle after the user changes an
 * input. Summaries that change without user input, such as the first calculation on page load, stay silent.
 */
export const ResultAnnouncement = ({
    summary,
    delay = resultAnnouncementDelay,
}: {
    readonly summary?: string;
    readonly delay?: number;
}): ReactElement => {
    const [announcement, setAnnouncement] = useState("");
    const userChangedInput = useRef(false);
    useEffect(() => {
        const markUserInput = (): void => {
            userChangedInput.current = true;
        };
        document.addEventListener("input", markUserInput, true);
        document.addEventListener("change", markUserInput, true);
        return () => {
            document.removeEventListener("input", markUserInput, true);
            document.removeEventListener("change", markUserInput, true);
        };
    }, []);
    useEffect(() => {
        if (summary === undefined || !userChangedInput.current) return;
        const timer = window.setTimeout(() => {
            userChangedInput.current = false;
            setAnnouncement(summary);
        }, delay);
        return () => window.clearTimeout(timer);
    }, [summary, delay]);
    return <p className="sr-only" role="status">{announcement}</p>;
};
