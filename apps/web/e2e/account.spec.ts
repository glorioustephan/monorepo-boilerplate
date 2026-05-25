import { expect, test } from '@playwright/test';

test('unauthenticated /account redirects home', async ({ page }) => {
  await page.goto('/account');
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: /hello, monorepo/i })).toBeVisible();
});
