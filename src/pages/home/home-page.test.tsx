import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HomePage } from "./home-page";

describe("home page locale", () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root" data-locale="nb"></div>';
    });
    afterEach(cleanup);

    it("renders Bokmål home copy and locale-preserving calculator links", () => {
        render(<HomePage />, { container: document.getElementById("root")! });

        expect(screen.getByRole("heading", { name: "Velg en kalkulator" })).toBeInTheDocument();
        expect(document.querySelector(".tool-card__title")?.closest("a")).toHaveAttribute("href", "nb/ohm");
        fireEvent.click(screen.getByRole("button", { name: "Språk: Bokmål" }));
        expect(screen.getByRole("link", { name: /^English/ })).toHaveAttribute("href", ".");
    });
});
