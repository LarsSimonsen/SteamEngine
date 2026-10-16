import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CalculatorLegacyNote, CalculatorPageHeader } from "./calculator-page-header";

afterEach(cleanup);

describe("CalculatorPageHeader", () => {
    it("renders the page heading without the legacy note", () => {
        render(<CalculatorPageHeader title="Test calculator" />);

        expect(screen.getByRole("heading", { name: "Test calculator" })).toBeInTheDocument();
        expect(screen.queryByText("You can find the old version of this calculator", { exact: false }))
            .not.toBeInTheDocument();
    });

    it("links to the legacy calculator in the same tab", () => {
        render(<CalculatorLegacyNote href="old/test" />);

        const link = screen.getByRole("link", { name: "here" });
        expect(link).toHaveAttribute("href", "/old/test");
        expect(link).not.toHaveAttribute("target");
        expect(screen.getByText("You can find the old version of this calculator", { exact: false }))
            .toBeInTheDocument();
    });

    it("preserves an already root-relative legacy path", () => {
        render(<CalculatorLegacyNote href="/old/test" />);

        expect(screen.getByRole("link", { name: "here" })).toHaveAttribute("href", "/old/test");
    });
});
