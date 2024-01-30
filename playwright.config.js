import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  testIgnore: '**/__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)',
  testMatch: '**/__tests__/e2e/**/*.{test,spec}.?(c|m)[jt]s?(x)',
  timeout: 50000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      'html',
      { outputFolder: './report/e2e' }
    ]
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  webServer: [
    {
      command: 'set NEXT_ANALYZE=false && npm run copy:e2econfig && next dev',
      url: 'http://127.0.0.1:3000',
      timeout: 20000,
      reuseExistingServer: !process.env.CI,
    }
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
});
