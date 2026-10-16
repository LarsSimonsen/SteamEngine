import type { Page } from "@playwright/test";

/**
 * Forwards calculation API requests to the live Steam Engine API from the test runner, using the production
 * origin so the API's CORS allowlist accepts them. The calculation API is not part of this repository.
 */
export const routeToLiveApi = async (page: Page, pattern = "**/api/**"): Promise<void> => {
    await page.route(pattern, async (route) => {
        const response = await route.fetch({
            headers: { ...route.request().headers(), origin: "https://www.steam-engine.org" },
        });
        await route.fulfill({
            response,
            headers: { ...response.headers(), "access-control-allow-origin": "*" },
        });
    });
};
