import { expect, test } from "vitest";
import { sluggize } from "../../../src/utils/url";

test('should sluggize from array', () => {
  expect(sluggize(['foo', 'bar'])).toEqual('foo/bar');
});

test('should sluggize from array - contains double slashes', () => {
  expect(sluggize(['foo//bar', '/hoge/', '/piyo'])).toEqual('foo/bar/hoge/piyo');
});
