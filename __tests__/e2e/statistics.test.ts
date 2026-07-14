import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/statistics/");
});

test.describe("Statistics", () => {
  test("should display cover title", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Statistics");
  });

  test("should display summary cards", async ({ page }) => {
    const cards = page
      .locator("main section > div")
      .first()
      .locator("> a, > div");
    await expect(cards).toHaveCount(4);

    // NOTE: the mock backend's fixtures return 10 posts, 5 tags and 3 series.
    const postsCard = cards.nth(0);
    await expect(postsCard).toContainText("10");
    await expect(postsCard).toContainText("posts");

    await expect(cards.nth(1)).toContainText("5");
    await expect(cards.nth(1)).toContainText("tags");
    await expect(cards.nth(2)).toContainText("3");
    await expect(cards.nth(2)).toContainText("series");
    // NOTE: "years" depends on the current date, so assert the label only.
    await expect(cards.nth(3)).toContainText("years");

    await expect(cards.nth(0)).toHaveAttribute("href", "/archives");
    await expect(cards.nth(1)).toHaveAttribute("href", "/tags");
    await expect(cards.nth(2)).toHaveAttribute("href", "/series");

    for (let i = 0; i < 4; i++) {
      const value = await cards.nth(i).locator("> div").first().textContent();
      expect(value).toMatch(/^\d+$/);
    }
  });

  test("should display activity charts and switch year and timezone by dropdowns - with screenshot", async ({
    page
  }, testInfo) => {
    const dropdowns = page.locator("main section select");
    await expect(dropdowns).toHaveCount(2);
    const yearDropdown = dropdowns.nth(0);
    const timeZoneDropdown = dropdowns.nth(1);

    // recharts renders svg bar charts (monthly / day of week / hour)
    await expect(page.getByText("Monthly Posts")).toBeVisible();
    await expect(page.getByText("Posts by Day of Week")).toBeVisible();
    await expect(page.getByText("Posts by Hour (Asia/Tokyo)")).toBeVisible();
    // auto-retrying assertion: at least 3 svg charts are rendered
    await expect(page.locator("main section svg").nth(2)).toBeVisible();

    // punch card renders a 7x24 grid
    await expect(page.getByText("Punch Card (Asia/Tokyo)")).toBeVisible();
    await expect(page.locator("main section [data-count]")).toHaveCount(168);

    // hovering a punch card cell shows a tooltip
    const filledCell = page
      .locator('main section [data-count]:not([data-count="0"])')
      .first();
    await filledCell.hover();
    const tooltip = page.locator('main section [class*="punch-tooltip"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText("posts");

    // contribution calendar shows the latest year (2023) with one cell per day
    await expect(
      page.getByText("Contributions (2023, Asia/Tokyo)")
    ).toBeVisible();
    await expect(page.locator("main section [data-date]")).toHaveCount(365);

    // NOTE: the mock's posts are all in 2023; only years which have posts are listed.
    const yearOptions = await yearDropdown.locator("option").allTextContents();
    expect(yearOptions).toEqual(["ALL", "2023"]);

    // all years aggregation is selected by default
    await expect(yearDropdown).toHaveValue("all");

    // switch to a single year and the charts should still render
    await yearDropdown.selectOption({ value: "2023" });
    await expect(page.locator("main section svg").first()).toBeVisible();
    await expect(page.locator("main section [data-count]")).toHaveCount(168);

    // switch the timezone (config.e2e.js: Asia/Tokyo + UTC) and re-aggregate
    const timeZoneOptions = await timeZoneDropdown
      .locator("option")
      .allTextContents();
    expect(timeZoneOptions).toEqual(["Asia/Tokyo", "UTC"]);
    await timeZoneDropdown.selectOption({ value: "UTC" });
    await expect(page.getByText("Posts by Hour (UTC)")).toBeVisible();
    await expect(page.getByText("Punch Card (UTC)")).toBeVisible();
    await expect(page.getByText("Contributions (2023, UTC)")).toBeVisible();
    await expect(page.locator("main section [data-count]")).toHaveCount(168);
    await expect(page.locator("main section [data-date]")).toHaveCount(365);

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png"
    });
  });

  test("should display top tags pie chart with linked legend", async ({
    page
  }) => {
    // NOTE: the mock's tags fixture is: diary(291), Scala(96), Akka(9), Rust(4), Android(2)
    await expect(page.locator("main section .recharts-pie")).toHaveCount(1);

    const tagLinks = page.locator("main section a[data-tag]");
    await expect(tagLinks).toHaveCount(5);

    const first = tagLinks.first();
    await expect(first).toHaveText("diary");
    await expect(first).toHaveAttribute("href", "/tags/diary");

    const scala = page.locator('main section a[data-tag="scala"]');
    await expect(scala).toHaveAttribute("href", "/tags/scala");

    // all 5 tags are within the topTags limit (7), so no "Others" entry
    await expect(page.getByText("Others")).toHaveCount(0);
  });
});
