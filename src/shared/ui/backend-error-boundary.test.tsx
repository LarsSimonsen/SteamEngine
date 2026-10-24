import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { requestJson } from "../backend-request";
import { BackendErrorBoundary } from "./backend-error-boundary";

const failRequest = async (): Promise<void> => {
    await act(async () => {
        await requestJson("https://api.example.test/api/v1/ohm", undefined, "Ohm's law").catch(() => undefined);
    });
};

describe("calculation error dialog", () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root" data-locale="en"></div>';
        vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Failed to fetch"))));
    });
    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
    });

    it("opens as a modal dialog, focuses Retry and describes the error", async () => {
        const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
        render(<BackendErrorBoundary><button type="button">Calculate</button></BackendErrorBoundary>);
        screen.getByRole("button", { name: "Calculate" }).focus();

        await failRequest();

        const dialog = screen.getByRole("alertdialog", { name: "The calculator could not update" });
        expect(showModal).toHaveBeenCalledOnce();
        expect(dialog).toHaveAccessibleDescription("Failed to fetch");
        expect(screen.getByRole("button", { name: "Retry" })).toHaveFocus();
        showModal.mockRestore();
    });

    it("cancels on Escape and returns focus to the control that was focused", async () => {
        render(<BackendErrorBoundary><button type="button">Calculate</button></BackendErrorBoundary>);
        const calculate = screen.getByRole("button", { name: "Calculate" });
        calculate.focus();
        await failRequest();

        fireEvent(screen.getByRole("alertdialog"), new Event("cancel", { cancelable: true }));

        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
        expect(calculate).toHaveFocus();
    });

    it("returns focus after Cancel too", async () => {
        render(<BackendErrorBoundary><button type="button">Calculate</button></BackendErrorBoundary>);
        const calculate = screen.getByRole("button", { name: "Calculate" });
        calculate.focus();
        await failRequest();

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
        expect(calculate).toHaveFocus();
    });
});
