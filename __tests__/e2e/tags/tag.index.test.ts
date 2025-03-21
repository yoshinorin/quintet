import { expect, test } from "@playwright/test";
import { assert } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/tags/tagA");
});

test.describe("Tags", () => {
  test("should change articles order and count: random", async ({ page }) => {
    const pagination = page.getByLabel("Page navigation");
    await expect(pagination).toHaveCount(1);

    await page
      .locator("main>section>div>div>select")
      .selectOption({ value: "random" });
    await expect(page.getByLabel("Page navigation")).toHaveCount(0);
    await expect(page.url()).toBe(
      "http://localhost:3000/tags/tagA/?order=random"
    );

    const articles = await page.locator("main>section>article").all();
    await assert(articles.length === 5);
  });

  test("should change articles order and count: default", async ({ page }) => {
    await page
      .locator("main>section>div>div>select")
      .selectOption({ value: "default" });
    await expect(page.getByLabel("Page navigation")).toHaveCount(1);
    const defaultOrderArticles = await page
      .locator("main>section>article")
      .all();
    await assert(defaultOrderArticles.length === 10);
    await expect(page.url()).toBe("http://localhost:3000/tags/tagA/");
  });

  test("should change articles order and count: desc", async ({ page }) => {
    await page
      .locator("main>section>div>div>select")
      .selectOption({ value: "desc" });
    await expect(page.getByLabel("Page navigation")).toHaveCount(1);
    const defaultOrderArticles = await page
      .locator("main>section>article")
      .all();
    await assert(defaultOrderArticles.length === 10);
    await expect(page.url()).toBe(
      "http://localhost:3000/tags/tagA/?order=desc"
    );
  });
});
