import { expect, test } from 'vitest'
import { isIgnoreRequest } from '../../../src/utils/filterRequests';

test('isIgnoreRequest should be return true', () => {
  expect(isIgnoreRequest('favicon.svg')).toBeTruthy();
  expect(isIgnoreRequest('a.svg')).toBeTruthy();
  expect(isIgnoreRequest('b.svg/')).toBeTruthy();
  expect(isIgnoreRequest('c.jpg')).toBeTruthy();
  expect(isIgnoreRequest('d.jpg/')).toBeTruthy();
});

test('isIgnoreRequest should be return false', () => {
  expect(isIgnoreRequest('/')).toBeFalsy();
  expect(isIgnoreRequest('/articles/')).toBeFalsy();
  expect(isIgnoreRequest('.jpg')).toBeFalsy();
  expect(isIgnoreRequest('/yyyy/mm/dd/')).toBeFalsy();
  expect(isIgnoreRequest('jpg')).toBeFalsy();
  expect(isIgnoreRequest('svg')).toBeFalsy();
});
