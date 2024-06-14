import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Home", () => {
  /* FIXME: this test case always passes.
  test('navbar-items are exists', async ({ page }) => {
    await expect(page.getByTitle('Home')).toBeVisible;
    await expect(page.getByTitle('Archives')).toBeVisible;
  });
  */

  test("should exists and set collect values in head meta - with screenshot", async ({
    page
  }, testInfo) => {
    await expect(page.locator('meta[name="author"]')).toHaveAttribute(
      "content",
      "john doe"
    );
    // TODO: maybe wrong property. I'll be delete it.
    // await expect(page.locator('meta[property="article:author"]')).toHaveAttribute('content', 'john doe');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "E2E Test Site"
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website"
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/"
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "E2E Test Site"
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "ja_JP"
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/defaultImage.jpg"
    );
    await expect(page.locator('meta[name="injectedMetaName"]')).toHaveAttribute(
      "content",
      "injectedMetaContent"
    );

    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    const sortedRobots = robots
      .split(",")
      .sort()
      .map((r) => r.trim());
    expect(sortedRobots.join(", ")).toBe(
      "noarchive, nofollow, noimageindex, noindex"
    );

    // TODO: move somewhere
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png"
    });
  });
});
