import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrivacyPage } from "./privacy-page";

describe("privacy page", () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root" data-locale="en"></div>';
        window.SteamEngineAds = undefined;
    });
    afterEach(cleanup);

    it("describes local and remote processing without claiming everything stays in the browser", () => {
        render(<PrivacyPage />);

        expect(screen.getByRole("heading", { name: "Privacy" })).toBeInTheDocument();
        expect(screen.getByText(/send the values needed for a calculation/)).toBeInTheDocument();
        expect(screen.getByText(/Google Analytics/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    });

    it("opens the provider's privacy choices when its runtime is available", async () => {
        const showPrivacyOptions = vi.fn().mockResolvedValue(undefined);
        window.SteamEngineAds = { showPrivacyOptions };
        render(<PrivacyPage />);

        fireEvent.click(screen.getByRole("button", { name: "Privacy and cookie settings" }));

        await waitFor(() => expect(showPrivacyOptions).toHaveBeenCalledOnce());
    });
});
