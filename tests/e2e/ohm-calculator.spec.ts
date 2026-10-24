import { expect, test } from '@playwright/test';
import { routeToLiveApi } from './live-api';

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page, '**/api/v1/ohm?**');
});

test('OhmCalc updates values and changes its simple lock target', async ({ page }) => {
    await page.goto('/ohm');
    await expect(page.getByRole('heading', { name: "Ohm's law" })).toBeVisible();
    await expect(page.locator('svg[data-icon="lock"]')).toHaveCount(0);
    await expect(page.locator('svg[data-icon="rotate-left"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Reset', exact: true })).toHaveCount(0);
    const valuesPanel = page.getByRole('region', { name: 'Values' });
    const lockPanel = page.getByRole('region', { name: 'Lock' });
    await expect(valuesPanel.locator('.ohm-menu')).toHaveCount(0);
    await expect(lockPanel.locator('.ohm-menu')).toHaveCount(0);
    await expect(valuesPanel.locator('.notice')).toHaveCount(0);
    await expect(page.locator('.detail-toggle')).toHaveText('Show detailed locks');
    await expect(page.locator('.lock-summary')).toHaveCount(0);

    const simpleLocks = page.getByRole('group', { name: 'Simple locks' });
    const lockSelectors = simpleLocks.getByRole('combobox');
    await expect(lockSelectors).toHaveCount(2);
    await expect(lockSelectors.nth(0)).toHaveValue('resistance');
    await expect(lockSelectors.nth(1)).toHaveValue('voltage');
    await lockSelectors.nth(0).selectOption('current');
    await expect(lockSelectors.nth(0)).toHaveValue('current');

    await page.locator('#cc-u').fill('4');
    await expect.poll(async () => Number(await page.locator('#cc-i').inputValue()))
        .toBeCloseTo(1.4, 2);
    await expect.poll(async () => Number(await page.locator('#cc-p').inputValue()))
        .toBeCloseTo(5.6, 2);
    await expect(valuesPanel.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();
    await valuesPanel.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.locator('#cc-u')).toHaveValue('3.5');
    await expect(lockSelectors.nth(0)).toHaveValue('current');
    await expect(lockPanel.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();
    await expect(valuesPanel.getByRole('button', { name: 'Reset', exact: true })).toHaveCount(0);
    await expect(valuesPanel.locator('.notice').getByRole('status')).toHaveText('Default settings have been restored.');
    await valuesPanel.locator('.notice').getByRole('button', { name: 'Dismiss' }).click();

    await page.locator('#cc-u').fill('4');
    await expect.poll(async () => Number(await page.locator('#cc-r').inputValue())).toBeCloseTo(2.86, 2);
    await lockPanel.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.locator('#cc-u')).toHaveValue('4');
    await expect(lockSelectors.nth(0)).toHaveValue('resistance');
    await expect(valuesPanel.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();
    await expect(lockPanel.getByRole('button', { name: 'Reset', exact: true })).toHaveCount(0);

    await lockSelectors.nth(0).selectOption('current');
    await page.reload();
    await expect(page.getByRole('group', { name: 'Simple locks' }).getByRole('combobox').nth(0))
        .toHaveValue('current');
    await expect(lockPanel.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();
    await expect(page.locator('svg[data-icon="rotate-left"]')).toHaveCount(1);
    await lockPanel.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Reset', exact: true })).toHaveCount(0);
    await expect(page.locator('svg[data-icon="rotate-left"]')).toHaveCount(0);
    const notice = page.locator('.lock-card .notice');
    await expect(notice.getByRole('status')).toHaveText('Default settings have been restored.');
    await expect(page.locator('.ohm-card').first().locator('.notice')).toHaveCount(0);
    await notice.getByRole('button', { name: 'Dismiss' }).click();
    await expect(notice).toHaveCount(0);
    await page.getByRole('button', { name: 'Show detailed locks' }).click();
    await expect(page.getByRole('button', { name: 'Hide detailed locks' })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('heading', { name: 'Detailed locks' })).toBeVisible();
    await page.getByRole('group', { name: 'When adjusting resistance' }).getByLabel('Power').check();
    await expect(page.locator('.lock-summary')).toContainText('Changing resistance keeps power constant.');
});

test('OhmCalc accepts natural replacement typing for decimal values', async ({ page }) => {
    await page.goto('/ohm');

    const resistance = page.getByLabel('Resistance R');
    await resistance.click();
    await resistance.press('ControlOrMeta+a');
    await resistance.fill('0');
    await resistance.press('Tab');
    await expect(resistance).toHaveAttribute('aria-invalid', 'true');
    await expect(resistance).toHaveAccessibleDescription('Resistance > 0');
    await expect(page.getByText('Resistance > 0')).toBeVisible();
    await resistance.click();
    await resistance.press('ControlOrMeta+a');
    await resistance.pressSequentially('0.5');
    await expect(resistance).not.toHaveAttribute('aria-invalid');
    await expect.poll(async () => Number(await resistance.inputValue())).toBeCloseTo(0.5, 2);
    await expect.poll(async () => Number(await page.getByLabel('Current I').inputValue())).toBeCloseTo(7, 2);

    const voltage = page.getByLabel('Voltage U');
    await voltage.click();
    await voltage.press('ControlOrMeta+a');
    await voltage.press('Backspace');
    await voltage.pressSequentially('4.2');
    await expect.poll(async () => Number(await voltage.inputValue())).toBeCloseTo(4.2, 2);
    await expect.poll(async () => Number(await page.getByLabel('Current I').inputValue())).toBeCloseTo(8.4, 2);
});
