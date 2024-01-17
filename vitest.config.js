import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // globals: true
    include: [
      './__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'
    ],
    coverage: {
      exclude: [
        '**/*.tsx',
        '.next/*',
        'config.js',
        'config.*.js',
        '*.config.js',
        'next-env.d.ts',
        '**/models/*',      // Just a interface.
        // '**/api/*',      // Need a mock. Coverd with E2E testing.
      ],
    }
  },
})
