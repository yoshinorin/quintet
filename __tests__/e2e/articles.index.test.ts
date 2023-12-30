import { test, expect } from '@playwright/test';
import { assert } from 'console';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/');
});

test.describe('Articles', () => {
  test('should exists and set collect values in head meta', async ({ page }) => {
    await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'john doe');
    await expect(page.locator('meta[property="article:author"]')).toHaveAttribute('content', 'john doe');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'E2E Test Site');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'blog');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'http://localhost:3000/articles/');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'E2E Test Site');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'ja_JP');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'defaultImage.jpg');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noarchive, nofollow, noimageindex, noindex');
    await expect(page.locator('meta[name="injectedMetaName"]')).toHaveAttribute('content', 'injectedMetaContent');
  });

  test('should display 10 articles - with screenshot', async ({ page }, testInfo ) => {
    const articles = await page.locator('main>section>article').all();

    await assert(articles.length === 10);
    await expect(articles[0].getByRole('time')).toHaveAttribute('datetime');
    await expect(articles[0].getByRole('time')).toContainText('2023.12.20');
    await expect(articles[0].getByRole('heading')).toHaveText('Standard nested post');
    // TODO
    // await expect(articles[0].getAttribute('datetime')).toBe('1703069944');
    // const firstArticleLink = await articles[0].locator('div>a');
    // await expect(firstArticleLink.getAttribute('href')).toBe('/articles/nested/standard/');

    await expect(articles[9].getByRole('time')).toHaveAttribute('datetime');

    await expect(articles[9].getByRole('time')).toContainText('2023.12.7');
    await expect(articles[9].getByRole('heading')).toHaveText('Suspendisse quis tellus vestibulum, vestibulum est non, tincidunt orci.');
    // TODO
    // await expect(articles[9].getAttribute('datetime')).toBe('1701948427');
    // const lastArticleLink = await articles[9].locator('div>a');
    // await expect(lastArticleLink.getAttribute('href')).toBe('/articles/2023/12/07/vestibulum/');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
  });
});
