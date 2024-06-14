import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/articles/nested/partially-robots/");
});

test.describe("Article - Partially Robots", () => {
  test("should not overwrite by default robots in head", async ({ page }) => {
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    const sortedRobots = robots
      .split(",")
      .sort()
      .map((r) => r.trim());
    expect(sortedRobots.join(", ")).toBe("noarchive, nofollow");
  });
});
