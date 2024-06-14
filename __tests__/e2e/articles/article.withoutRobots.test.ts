import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/articles/nested/without-robots/");
});

/* TODO: fix quintet behavior
test.describe('Article - Without Robots', () => {
  test('should fallback to default robots in head meta', async ({ page } ) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noarchive, nofollow, noimageindex, noindex');
  });
});
*/
