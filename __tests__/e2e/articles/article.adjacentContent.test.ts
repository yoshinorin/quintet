import { expect, test } from "@playwright/test";

test.describe("Article Adjacent Content", () => {
  test.describe("Both next and previous articles exist", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        "http://localhost:3000/articles/nested/adjacent-prev-next/"
      );
    });

    test("should display next article", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      const nextArticle = page.locator("#next-article");
      await expect(nextArticle).toBeVisible();
    });

    test("should display previous article", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      const previousArticle = page.locator("#previous-article");
      await expect(previousArticle).toBeVisible();
    });

    test("should take screenshot of adjacent content", async ({
      page
    }, testInfo) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await page.waitForSelector("#adjacent-content");

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach("adjacent-content-screenshot", {
        body: screenshot,
        contentType: "image/png"
      });
    });
  });

  test.describe("Only next article exists", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        "http://localhost:3000/articles/nested/adjacent-next-only/"
      );
    });

    test("should display only next article button on the left", async ({
      page
    }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      const nextArticle = page.locator("#next-article");
      const previousArticle = page.locator("#previous-article");

      await expect(nextArticle).toBeVisible();
      await expect(previousArticle).toBeHidden();
    });
  });

  test.describe("Only previous article exists", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        "http://localhost:3000/articles/nested/adjacent-prev-only/"
      );
    });

    test("should display only previous article button on the right", async ({
      page
    }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      const nextArticle = page.locator("#next-article");
      const previousArticle = page.locator("#previous-article");

      await expect(previousArticle).toBeVisible();
      await expect(nextArticle).toBeHidden();
    });
  });

  test.describe("No adjacent articles", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3000/articles/nested/standard/");
    });

    test("should not display adjacent content navigation", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      const adjacentNav = page.locator("#adjacent-content");
      await expect(adjacentNav).toBeHidden();
    });
  });
});
