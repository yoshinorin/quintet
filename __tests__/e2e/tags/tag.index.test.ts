import { expect, test } from "@playwright/test";

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
  });
});
