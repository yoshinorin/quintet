import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  testIgnore: '**/__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)',
  testMatch: '**/__tests__/e2e/**/*.{test,spec}.?(c|m)[jt]s?(x)',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
