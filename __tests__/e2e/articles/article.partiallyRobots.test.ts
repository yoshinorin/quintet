import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/nested/partially-robots/');
});

test.describe('Article - Partially Robots', () => {
  test('should not overwrite by default robots in head', async ({ page } ) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noarchive, nofollow');
  });
});
