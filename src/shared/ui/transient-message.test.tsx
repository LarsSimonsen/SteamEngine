import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TransientMessage, transientMessageDuration, useTransientMessage } from "./transient-message";

describe("transient message", () => {
    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it("keeps an empty status region and dismisses messages with a real button", () => {
        const onDismiss = vi.fn();
        const view = render(<TransientMessage onDismiss={onDismiss} />);
        expect(screen.getByRole("status")).toBeEmptyDOMElement();
        expect(screen.queryByRole("button")).not.toBeInTheDocument();

        view.rerender(<TransientMessage message="Saved." onDismiss={onDismiss} />);
        expect(screen.getByRole("status")).toHaveTextContent("Saved.");
        expect(screen.getByRole("status")).not.toContainElement(screen.getByRole("button"));
        fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("keeps a message for twenty seconds", () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useTransientMessage());
        act(() => result.current.showMessage("Saved."));

        act(() => vi.advanceTimersByTime(transientMessageDuration - 1));
        expect(result.current.message).toBe("Saved.");
        act(() => vi.advanceTimersByTime(1));
        expect(result.current.message).toBeUndefined();
    });
});
