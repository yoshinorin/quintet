import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/articles/nested/empty-robots/");
});

test.describe("Article - Empty Robots", () => {
  test("should fallback to default robots in head meta", async ({ page }) => {
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
  });
});
