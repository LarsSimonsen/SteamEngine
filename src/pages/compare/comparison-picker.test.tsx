import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useState, type ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { axeViolations } from "../../shared/test-axe";
import { ComparisonPicker } from "./comparison-picker";

const options = [
    { slug: "lg-18650hg2", label: "LG 18650HG2", details: "3,000 mAh" },
    { slug: "samsung-30q", label: "Samsung 30Q", details: "3,000 mAh" },
    { slug: "molicel-p45b", label: "Molicel P45B", details: "4,500 mAh" },
];

const Example = (): ReactElement => {
    const [selected, setSelected] = useState<string>();
    return <ComparisonPicker label="Select battery A" chooseLabel="Choose a battery" options={options}
        selected={options.find((option) => option.slug === selected)} onSelect={setSelected} />;
};

describe("comparison picker", () => {
    afterEach(cleanup);

    it("names the disclosure, filter and list by its visible label", async () => {
        const { container } = render(<Example />);
        const summary = container.querySelector("summary")!;
        expect(summary).toHaveAccessibleName("Select battery A Choose a battery");
        expect(screen.getByRole("searchbox", { name: "Select battery A" })).toBeInTheDocument();
        expect(screen.getByRole("list", { name: "Select battery A" })).toBeInTheDocument();
        expect(await axeViolations(container)).toEqual([]);
    });

    it("announces the number of matches while filtering", () => {
        render(<Example />);
        const status = screen.getByRole("status");
        expect(status).toBeEmptyDOMElement();

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "3" } });
        expect(status).toHaveTextContent("Matches: 1");
        expect(within(screen.getByRole("list")).getAllByRole("button")).toHaveLength(1);
    });

    it("marks the chosen entry pressed and returns focus to the disclosure, which reads the choice", () => {
        const { container } = render(<Example />);
        const details = container.querySelector("details")!;
        details.open = true;
        fireEvent.click(screen.getByRole("button", { name: /Samsung 30Q/ }));

        const summary = container.querySelector("summary")!;
        expect(details.open).toBe(false);
        expect(summary).toHaveFocus();
        expect(summary).toHaveAccessibleName("Select battery A Samsung 30Q");
        expect(screen.getByRole("button", { name: /Samsung 30Q/ })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: /LG 18650HG2/ })).toHaveAttribute("aria-pressed", "false");
    });
});
