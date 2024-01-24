import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/articles/nested/standard/');
});

test.describe('Article', () => {

  test('should exists and set collect values in head meta - with screenshot', async ({ page }, testInfo ) => {
    await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'yoshinorin');
    await expect(page.locator('meta[property="article:author"]')).toHaveAttribute('content', 'yoshinorin');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'standard');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'http://localhost:3000/articles/nested/standard/');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'E2E Test Site');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'ja_JP');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'http://localhost:3000/defaultImage.jpg');
    await expect(page.locator('meta[name="injectedMetaName"]')).toHaveAttribute('content', 'injectedMetaContent');

    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Proin tellus nibh, pretium vitae bibendum in, tempus nec odio...');
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', 'Proin tellus nibh, pretium vitae bibendum in, tempus nec odio...');

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    const sortedRobots = robots.split(',').sort().map(r => r.trim());
    expect(sortedRobots.join(', ')).toBe('noarchive, nofollow, noimageindex, noindex');

    // TODO: assert content value
    await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content');
    await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content');

    const tags = await page.locator('meta[property="article:tag"]').all();
    await expect(tags[0]).toHaveAttribute('content', 'Scala');
    await expect(tags[1]).toHaveAttribute('content', 'Cats');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
  });

  test('should article has two tags', async ({ page } ) => {
    const tags = await page.locator('body>div>div>div>section>a').all();
    // await assert(tags.length === 2);    Not working...

    // TODO: fix
    // await expect(tags[0]).toHaveText('Scala');
    // await expect(tags[1]).toHaveValue('Cats');
  });

  test('should clickable `Attributes / Insight` button - with screenshot', async ({ page }, testInfo ) => {
    const button = await page.locator('main>article>div>div>div>span');
    await expect(button).toHaveText('Attributes / Insight ▼');

    await button.click();
    const content = await page.locator('main>article>div>div>div>pre');

    // TODO: assert JSON
    await expect(content).toContainText('attributes');
    // NOTE: content id
    await expect(content).toContainText('01h81rme1cy11e3ffgagtym2xh');
    // NOTE: commit hash
    await expect(content).toContainText('24af403');

    // NOTE: x-response-id
    await expect(content).toContainText('c5befa09-ac43-4ee5-9ece-0db860163d93');
    // NOTE: x-response-time
    await expect(content).toContainText('15 ms');

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
  });
});
