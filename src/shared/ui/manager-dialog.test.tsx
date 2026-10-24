import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState, type ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ManagerDialog } from "./manager-dialog";

const Example = ({ onClose = vi.fn() }: { readonly onClose?: () => void }): ReactElement => {
    const [open, setOpen] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    const close = (): void => {
        onClose();
        setOpen(false);
    };
    return <>
        <button ref={button} type="button" onClick={() => setOpen(true)}>Manage</button>
        {open && <ManagerDialog id="manager" label="Manage things" returnFocusTo={button} onClose={close}>
            <button type="button" onClick={close}>Close</button>
        </ManagerDialog>}
    </>;
};

describe("manager dialog", () => {
    afterEach(cleanup);

    it("opens modally with focus on the named dialog and locks page scrolling", () => {
        const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
        render(<Example />);
        fireEvent.click(screen.getByRole("button", { name: "Manage" }));

        const dialog = screen.getByRole("dialog", { name: "Manage things" });
        expect(showModal).toHaveBeenCalledOnce();
        expect(dialog).toHaveFocus();
        expect(document.body.style.overflow).toBe("hidden");
        showModal.mockRestore();
    });

    it("closes on Escape and returns focus to the opening button", () => {
        const onClose = vi.fn();
        render(<Example onClose={onClose} />);
        const manage = screen.getByRole("button", { name: "Manage" });
        fireEvent.click(manage);

        fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));

        expect(onClose).toHaveBeenCalledOnce();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(manage).toHaveFocus();
        expect(document.body.style.overflow).toBe("");
    });

    it("closes on a backdrop click but not on a click inside", () => {
        const onClose = vi.fn();
        render(<Example onClose={onClose} />);
        fireEvent.click(screen.getByRole("button", { name: "Manage" }));
        const dialog = screen.getByRole("dialog");
        vi.spyOn(dialog, "getBoundingClientRect").mockReturnValue(new DOMRect(100, 100, 400, 300));

        fireEvent.mouseDown(dialog, { clientX: 200, clientY: 200 });
        expect(onClose).not.toHaveBeenCalled();
        fireEvent.mouseDown(dialog, { clientX: 20, clientY: 20 });
        expect(onClose).toHaveBeenCalledOnce();
    });
});
