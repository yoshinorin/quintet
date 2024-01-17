import { test, expect } from '@playwright/test';

test.describe('Sitemap', () => {
  test('should returns xml', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/sitemap.xml');
    expect(response.status()).toBe(200);
    expect(await response.headerValue('Content-Type')).toBe('text/xml');
  });
});
