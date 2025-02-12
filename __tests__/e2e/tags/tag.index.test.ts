import { expect, test } from "@playwright/test";
import { assert } from "console";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/tags/tagA");
});

test.describe("Tags", () => {
  test("should not display PaginationComponent when returns random page is true", async ({
    page
  }) => {
    const pagination = page.getByLabel("Page navigation");
    await expect(pagination).toHaveCount(1);

    await page.locator("text=Random").click();
    await expect(page.getByLabel("Page navigation")).toHaveCount(0);

    const articles = await page.locator("main>section>article").all();
    await assert(articles.length === 5);

    await page.locator("text=Reset").click();
    await expect(page.getByLabel("Page navigation")).toHaveCount(1);
    const articlesAfterReset = await page.locator("main>section>article").all();
    await assert(articlesAfterReset.length === 10);
  });
});
