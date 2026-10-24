import "@testing-library/jest-dom/vitest";

// jsdom implements <dialog> without its modal methods; the browser provides focus containment and Escape.
if (typeof HTMLDialogElement !== "undefined" && typeof HTMLDialogElement.prototype.showModal !== "function") {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement): void {
        this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement): void {
        this.removeAttribute("open");
    };
}
