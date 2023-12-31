import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/nested/without-tags/');
});

test.describe('Article - Without Tags', () => {
  test('should invisible `articles:tag` meta in head', async ({ page } ) => {
    await expect(page.locator('meta[property="article:tag"]')).not.toBeVisible();
  });
});
