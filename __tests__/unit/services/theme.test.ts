import { expect, test } from 'vitest'
import { getTheme } from '../../../src/services/theme';

test('get default theme if raise exception', () => {
  expect(getTheme()).toBe('light')
});
