import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResultAnnouncement, resultAnnouncementDelay, resultSummary } from "./result-announcement";

describe("result announcement", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it("stays silent when results change without user input", () => {
        const view = render(<ResultAnnouncement summary="Resistance 2.5 Ω" />);
        view.rerender(<ResultAnnouncement summary="Resistance 3 Ω" />);
        act(() => vi.advanceTimersByTime(resultAnnouncementDelay));

        expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });

    it("announces the settled result once after typing stops", () => {
        const view = render(<><input aria-label="Resistance" /><ResultAnnouncement summary="Resistance 2.5 Ω" /></>);
        const input = screen.getByRole("textbox");
        for (const [typed, summary] of [["2", "Resistance 2 Ω"], ["2.7", "Resistance 2.7 Ω"]]) {
            fireEvent.input(input, { target: { value: typed } });
            view.rerender(<><input aria-label="Resistance" /><ResultAnnouncement summary={summary} /></>);
            act(() => vi.advanceTimersByTime(resultAnnouncementDelay / 2));
            expect(screen.getByRole("status")).toBeEmptyDOMElement();
        }

        act(() => vi.advanceTimersByTime(resultAnnouncementDelay / 2));
        expect(screen.getByRole("status")).toHaveTextContent("Resistance 2.7 Ω");
    });

    it("joins result phrases with the page language's separators", () => {
        expect(resultSummary("en", ["Resistance 2.5 Ω", "voltage 3.5 V"])).toBe("Resistance 2.5 Ω, voltage 3.5 V");
        expect(resultSummary("ja", ["抵抗 2.5 Ω", "電圧 3.5 V"])).not.toContain(", ");
    });
});
