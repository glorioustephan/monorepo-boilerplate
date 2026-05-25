import { expect, test } from '@playwright/test';

test('ui harness renders a component example by slug', async ({ page }) => {
  await page.goto('/ui/button');
  await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
  // The button.example.tsx ground truth renders the variant buttons.
  await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
});

test('ui harness 404s an unknown component slug', async ({ page }) => {
  const response = await page.goto('/ui/does-not-exist');
  expect(response?.status()).toBe(404);
});
