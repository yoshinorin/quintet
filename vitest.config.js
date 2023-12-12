import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // globals: true
    include: [
      './__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'
    ]
  },
})
