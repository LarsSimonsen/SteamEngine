import { useEffect, useRef, type MouseEvent, type ReactElement, type ReactNode, type RefObject } from "react";
import "../styles/manager-dialog.css";

export type ManagerDialogProps = {
    readonly id: string;
    readonly label: string;
    readonly onClose: () => void;
    /** The control that opened the dialog; focus returns to it when the dialog closes. */
    readonly returnFocusTo: RefObject<HTMLElement | null>;
    readonly children: ReactNode;
};

const clickedBackdrop = (event: MouseEvent<HTMLDialogElement>): boolean => {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
};

/**
 * A modal catalog manager. showModal() makes the page behind it inert, keeps Tab inside the dialog and turns
 * Escape into a cancel event; the dialog itself takes focus so screen readers announce its name first.
 */
export const ManagerDialog = ({ id, label, onClose, returnFocusTo, children }: ManagerDialogProps): ReactElement => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        if (dialog && !dialog.open) dialog.showModal();
        dialog?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            returnFocusTo.current?.focus();
        };
    }, [returnFocusTo]);
    return <dialog ref={dialogRef} id={id} className="se-manager-dialog" aria-label={label} tabIndex={-1}
        onCancel={(event) => {
            event.preventDefault();
            onClose();
        }}
        onMouseDown={(event) => {
            if (clickedBackdrop(event)) onClose();
        }}>
        {children}
    </dialog>;
};
