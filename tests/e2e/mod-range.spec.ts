import { expect, test } from '@playwright/test';
import { routeToLiveApi } from './live-api';

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

test('Mod Range manages its mod catalog and validates editable limits', async ({ page }) => {
    await page.goto('/modrange');
    await expect(page.getByRole('heading', { name: 'Mod range' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Regulated mod preset' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Power curve' })).toBeVisible();

    await expect(page.getByRole('option', { name: 'AceSmok Ace 50' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Manage mods' }).click();
    await expect(page.locator('.mod-range-page-header + #mod-manager')).toBeVisible();
    await page.getByRole('searchbox', { name: 'Filter built-ins' }).fill('AceSmok');
    await page.getByRole('button', { name: 'Clone' }).click();
    await expect(page.getByRole('heading', { name: 'Clone AceSmok Ace 50' })).toBeVisible();
    await expect(page.getByLabel('Model')).toHaveValue('Ace 50 copy');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('checkbox', { name: 'AceSmok Ace 50' }).check();
    await expect(page.getByRole('option', { name: 'AceSmok Ace 50' })).toHaveCount(1);

    await page.getByRole('button', { name: 'New custom mod' }).click();
    const editor = page.locator('form.mod-editor');
    await editor.getByLabel('Manufacturer').fill('Test');
    await editor.getByLabel('Model').fill('Mod');
    await editor.getByLabel('Maximum output voltage (V)').fill('8');
    await editor.getByLabel('Maximum output power (W)').fill('100');
    await editor.getByLabel('Maximum output current (A)').fill('30');
    await editor.getByRole('button', { name: 'Save mod' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await editor.getByLabel('Model').fill('Mod 2');
    await editor.getByRole('button', { name: 'Save mod' }).click();
    await page.getByRole('combobox', { name: 'Regulated mod preset' }).selectOption({ label: 'Test Mod 2' });
    await expect(page.getByLabel('Maximum power').last()).toHaveValue('100');
    await expect(page.getByRole('button', { name: /Reset/ })).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('status')).toContainText('Current Mod Range settings');

    await expect(page.getByText('Optimal resistance')).toBeVisible();
    await page.getByLabel('Maximum power').last().fill('');
    await expect(page.getByRole('alert')).toHaveText('Enter a value for maximum power.');
    await expect(page.getByText('Optimal resistance')).toHaveCount(0);
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Confirm delete' }).click();
    await expect(page.getByRole('option', { name: 'Test Mod 2' })).toHaveCount(0);
});
