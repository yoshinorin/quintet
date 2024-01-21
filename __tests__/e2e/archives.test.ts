import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/archives/');
});

test.describe('Archives', () => {
  // NOTE: Next.js generateMetadata is unflexible, I compromised this page metadata same with home page.
  test('should exists and set collect values in head meta', async ({ page }) => {
    await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'john doe');
    // TODO: maybe wrong property. I'll be delete it.
    // await expect(page.locator('meta[property="article:author"]')).toHaveAttribute('content', 'john doe');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'E2E Test Site');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'http://localhost:3000/');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'E2E Test Site');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'ja_JP');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'http://localhost:3000/defaultImage.jpg');
    await expect(page.locator('meta[name="injectedMetaName"]')).toHaveAttribute('content', 'injectedMetaContent');

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    const sortedRobots = robots.split(',').sort().map(r => r.trim());
    expect(sortedRobots.join(', ')).toBe('noarchive, nofollow, noimageindex, noindex');
  });

  test('should display all articles when text input is empty', async ({ page }) => {
    await expect(page.getByText('posts')).toHaveText('10 posts');
  });

  test('should display filterd articles when input text field - with screenshot', async ({ page }, testInfo) => {
    await page.getByRole('textbox').fill('With');

    await expect(page.getByText('posts')).toHaveText('3 posts');

    const archives = await page.locator('main>section');
    await expect(archives).toContainText('With externalResources');
    await expect(archives).toContainText('Without tags');
    await expect(archives).toContainText('Without robots');
    await expect(archives).not.toContainText('Standard nested post');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
  });

  test('should display all articles after clear text field - with screenshot', async ({ page }, testInfo) => {
    await page.getByRole('textbox').fill('Empty');
    await expect(page.getByText('posts')).toHaveText('2 posts');

    await page.getByRole('textbox').clear();
    await expect(page.getByText('posts')).toHaveText('10 posts');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
  });
});
