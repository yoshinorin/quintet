import { test, expect } from "@playwright/test";

test.describe(".well-known", () => {
  test("should return 404 for .well-known/security.txt", async ({ page }) => {
    const response = await page.goto(
      "http://localhost:3000/.well-known/security.txt"
    );
    expect(response.status()).toBe(404);
  });

  test("should return 404 for .well-known/apple-app-site-association", async ({
    page
  }) => {
    const response = await page.goto(
      "http://localhost:3000/.well-known/apple-app-site-association"
    );
    expect(response.status()).toBe(404);
  });

  test("should return 404 for .well-known/change-password", async ({
    page
  }) => {
    const response = await page.goto(
      "http://localhost:3000/.well-known/change-password"
    );
    expect(response.status()).toBe(404);
  });

  test("should return 404 for any .well-known path", async ({ page }) => {
    const response = await page.goto(
      "http://localhost:3000/.well-known/any/arbitrary/path"
    );
    expect(response.status()).toBe(404);
  });
});
