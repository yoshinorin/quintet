import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/nested/with-externalresources/');
});

/* TODO:
test.describe('Article - With externalResources', () => {
  test('should inject script to head', async ({ page } ) => {
    await expect(page.locator('script[type="text/javascript"]')).toHaveAttribute('src', 'https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js');
  });
});
*/
