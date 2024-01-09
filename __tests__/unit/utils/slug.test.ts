import { expect, test } from "vitest";
import { sluggize } from "../../../src/utils/slug";

test('should sluggize from string array - without prefix and fallback option', () => {
  expect(sluggize(['foo', 'bar'])).toEqual('/foo/bar');
});

test('should sluggize from number array - without prefix and fallback option', () => {
  expect(sluggize([1, 2])).toEqual('/1/2');
});

test('should sluggize from array - without fallback option', () => {
  expect(sluggize(['foo', 'bar'], '_prefix')).toEqual('/_prefix/foo/bar');
});

test('should sluggize returns fallback (undefined) if slug can not convert to array', () => {
  expect(sluggize({'hoge': 'piyo'}, '_prefix')).toEqual(undefined);
});

test('should sluggize returns fallback string if slug can not convert to array', () => {
  expect(sluggize({'hoge': 'piyo'}, '_prefix', 'fallback_str')).toEqual('fallback_str');
});
