import { expect, test } from 'vitest'
import { isMatch } from '../../../src/utils/match';

test('isMatch should be return true', () => {
  expect(isMatch('favicon.svg')).toBeTruthy();
  expect(isMatch('a.svg')).toBeTruthy();
  expect(isMatch('b.svg/')).toBeTruthy();
  expect(isMatch('c.jpg')).toBeTruthy();
  expect(isMatch('d.jpg/')).toBeTruthy();
});

test('isMatch should be return false', () => {
  expect(isMatch('/')).toBeFalsy();
  expect(isMatch('/articles/')).toBeFalsy();
  expect(isMatch('.jpg')).toBeFalsy();
  expect(isMatch('/yyyy/mm/dd/')).toBeFalsy();
  expect(isMatch('jpg')).toBeFalsy();
  expect(isMatch('svg')).toBeFalsy();
});
