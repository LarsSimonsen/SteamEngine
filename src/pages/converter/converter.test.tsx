import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Converter } from "./converter";
import { ConverterPanel } from "./converter-panel";

describe("Converter", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
            const query = new URL(String(input)).searchParams;
            const outputUnit = query.get("t");
            const inputValue = query.get("v");
            const body = outputUnit === "swg"
                ? { kind: "approximate", approximation: {
                    larger: { name: "20", inches: 0.036 }, smaller: { name: "21", inches: 0.032 },
                    largerErrorPercent: 2.7, smallerErrorPercent: 9.4,
                } }
                : outputUnit === "awg"
                    ? { kind: "exact", outputValue: "-9.697", numericOutput: -9.696522190162251 }
                    : { kind: "exact", outputValue: inputValue === "2" ? "50.8" : "25.4",
                        numericOutput: 25.4123456789 };
            return new Response(JSON.stringify(body), { status: 200,
                headers: { "Content-Type": "application/json" } });
        }));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        cleanup();
    });

    it("renders input, output settings, and result as ordered layout panels", () => {
        const { container } = render(<Converter />);
        const panelHeadings = Array.from(container.querySelectorAll(".converter-layout > .converter-card h2"))
            .map((heading) => heading.textContent);
        expect(screen.getByRole("heading", { name: "Converter", level: 1 })).toBeInTheDocument();
        expect(panelHeadings).toEqual(["Input", "Output settings", "Result"]);
        expect(screen.queryByRole("button", { name: /Reset defaults/ })).not.toBeInTheDocument();
    });

    it("updates a numeric result and reveals reset after a setting changes", async () => {
        render(<Converter />);
        fireEvent.change(screen.getByLabelText("Input value"), { target: { value: "2" } });
        fireEvent.blur(screen.getByLabelText("Input value"));
        await waitFor(() => expect(screen.getByText("50.8")).toBeInTheDocument());
        expect(screen.getByRole("button", { name: /Reset defaults/ })).toBeInTheDocument();
    });

    it("clears stale results and disables swapping while a new result is pending", async () => {
        render(<Converter />);
        await waitFor(() => expect(screen.getByText("25.4")).toBeInTheDocument());
        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "awg" } });
        expect(screen.getByText("Calculating…")).toBeInTheDocument();
        expect(screen.queryByText("25.4")).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Swap input and output/ })).toBeDisabled();
        await waitFor(() => expect(screen.getByText("-9.697")).toBeInTheDocument());
    });

    it("ignores a superseded in-flight result", async () => {
        const pending: Array<{ readonly url: string; readonly resolve: (response: Response) => void }> = [];
        vi.stubGlobal("fetch", vi.fn((input: RequestInfo | URL) => new Promise<Response>((resolve) => {
            pending.push({ url: String(input), resolve });
        })));
        const response = (outputValue: string): Response => new Response(JSON.stringify({
            kind: "exact", outputValue, numericOutput: Number(outputValue),
        }), { status: 200, headers: { "Content-Type": "application/json" } });

        render(<Converter />);
        await waitFor(() => expect(pending).toHaveLength(1));
        await act(async () => pending[0].resolve(response("25.4")));
        await waitFor(() => expect(screen.getByText("25.4")).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "awg" } });
        await waitFor(() => expect(pending).toHaveLength(2));
        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "inch" } });
        await waitFor(() => expect(pending).toHaveLength(3));
        await act(async () => pending[2].resolve(response("1")));
        await waitFor(() => expect(screen.getByText("1", { selector: ".converter-result-value strong" }))
            .toBeInTheDocument());
        await act(async () => pending[1].resolve(response("-9.697")));
        expect(screen.getByText("1", { selector: ".converter-result-value strong" })).toBeInTheDocument();
        expect(screen.queryByText("-9.697")).not.toBeInTheDocument();
    });

    it("uses the displayed precision when swapping", async () => {
        render(<Converter />);
        await waitFor(() => expect(screen.getByText("25.4")).toBeInTheDocument());
        fireEvent.click(screen.getByRole("button", { name: /Swap input and output/ }));
        expect(screen.getByLabelText("Input value")).toHaveValue(25.4);
    });

    it("disables irrelevant precision and hides swapping for an approximate gauge result", async () => {
        render(<Converter />);
        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "swg" } });
        expect(screen.getByLabelText("Decimal places")).toBeDisabled();
        fireEvent.change(screen.getByLabelText("Input value"), { target: { value: "0.035" } });
        fireEvent.blur(screen.getByLabelText("Input value"));
        await waitFor(() => expect(screen.getByText("Between standard values")).toBeInTheDocument());
        expect(screen.queryByRole("button", { name: /Swap input and output/ })).not.toBeInTheDocument();
    });

    it("uses the v2 converter contract", async () => {
        render(<Converter />);
        await waitFor(() => expect(fetch).toHaveBeenCalled());
        expect(vi.mocked(fetch).mock.calls.some(([input]) => String(input).includes("/api/v2/converter?"))).toBe(true);
    });

    it("automatically persists and reloads the selected output unit", () => {
        const { unmount } = render(<Converter />);
        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "inch" } });
        unmount();
        render(<Converter />);
        expect(screen.getByLabelText("Output unit")).toHaveValue("inch");
    });

    it("keeps non-persistent panel instances isolated", () => {
        const { unmount } = render(<ConverterPanel />);
        fireEvent.change(screen.getByLabelText("Output unit"), { target: { value: "inch" } });
        expect(screen.getByLabelText("Output unit")).toHaveValue("inch");
        unmount();

        render(<ConverterPanel />);
        expect(screen.getByLabelText("Output unit")).toHaveValue("mm");
    });
});
