import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/nested/empty-tags/');
});

test.describe('Article - Empty Tags', () => {
  test('should invisible `articles:tag` meta in head', async ({ page } ) => {
    await expect(page.locator('meta[property="article:tag"]')).not.toBeVisible();
  });
});
