import { test, expect } from "@playwright/test";

test.describe("Article - Redirect", () => {
  test("should be redirect from `/{yyyy}/{mm}/{dd}/` to `/articles/{yyyy}/{mm}/{dd}/` and set collect values in head meta", async ({
    page
  }) => {
    await page.goto("http://localhost:3000/2024/01/01/standard/");
    await expect(page.url()).toBe(
      "http://localhost:3000/articles/2024/01/01/standard/"
    );

    await expect(page.locator('meta[name="author"]')).toHaveAttribute(
      "content",
      "yoshinorin"
    );
    await expect(
      page.locator('meta[property="article:author"]')
    ).toHaveAttribute("content", "yoshinorin");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "YYYY MM DD post"
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article"
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/articles/2024/01/01/standard/"
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

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Proin tellus nibh, pretium vitae bibendum in, tempus nec odio..."
    );
    await expect(
      page.locator('meta[property="og:description"]')
    ).toHaveAttribute(
      "content",
      "Proin tellus nibh, pretium vitae bibendum in, tempus nec odio..."
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

    // TODO: assert content value
    await expect(
      page.locator('meta[property="article:published_time"]')
    ).toHaveAttribute("content");
    await expect(
      page.locator('meta[property="article:modified_time"]')
    ).toHaveAttribute("content");

    const tags = await page.locator('meta[property="article:tag"]').all();
    await expect(tags[0]).toHaveAttribute("content", "Scala");
    await expect(tags[1]).toHaveAttribute("content", "Cats");
  });

  test("should be redirect from `/{yyyy}/{mm}/{dd}` to `/articles/{yyyy}/{mm}/{dd}/` and set collect values in head meta", async ({
    page
  }) => {
    await page.goto("http://localhost:3000/2024/01/01/standard");
    await expect(page.url()).toBe(
      "http://localhost:3000/articles/2024/01/01/standard/"
    );
  });

  test("returns 500 if url not ends with `/{yyyy}/{mm}/{dd}/`: pattern1", async ({
    page
  }) => {
    const response = await page.goto(
      "http://localhost:3000/aaa/01/01/standard"
    );
    // FIXME: Next.js returns 500
    await expect(response.status()).toBe(404);
  });

  test("returns 500 if url not ends with `/{yyyy}/{mm}/{dd}/`: pattern2", async ({
    page
  }) => {
    const response = await page.goto(
      "http://localhost:3000/2024/aa/01/standard"
    );
    // FIXME: Next.js returns 500
    await expect(response.status()).toBe(404);
  });

  test("returns 500 if url not ends with `/{yyyy}/{mm}/{dd}/`: pattern3", async ({
    page
  }) => {
    const response = await page.goto(
      "http://localhost:3000/2024/01/bb/standard"
    );
    // FIXME: Next.js returns 500
    await expect(response.status()).toBe(404);
  });
});
