import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // globals: true
    include: ["./__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "./report/coverage",
      exclude: [
        "**/*.tsx",
        ".next/*",
        "config.js",
        "config.*.js",
        "*.config.js",
        "next-env.d.ts",
        "src/app/feeds/index.xml/route.ts",
        "src/app/sitemap.xml",
        "src/components/*",
        "**/models/*" // Just a interface.
        // '**/api/*',      // Need a mock. Coverd with E2E testing.
      ]
    }
  }
});
