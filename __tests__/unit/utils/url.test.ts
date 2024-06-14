import { expect, test } from "vitest";
import { buildUrl, buildQueryParams } from "../../../src/utils/url";

test("should returns collect url - with out queryParam and pagination", () => {
  const url = buildUrl("https://example.com", "slug/nested", false);
  expect(url).toEqual("https://example.com/slug/nested");
});

test("should returns collect url - baseUrl has trailing slash", () => {
  const url = buildUrl("https://example.com/", "slug/nested", false);
  expect(url).toEqual("https://example.com/slug/nested");
});

test("should returns collect url - trailing slash is enabled: pattern1", () => {
  const url = buildUrl("https://example.com/", "slug/nested", true);
  expect(url).toEqual("https://example.com/slug/nested/");
});

test("should returns collect url - trailing slash is enabled: pattern2", () => {
  const url = buildUrl("https://example.com/", "slug/nested/", true);
  expect(url).toEqual("https://example.com/slug/nested/");
});

test("should returns collect url - baseUrl and slug has trailing slash", () => {
  const url = buildUrl("https://example.com/", "slug/nested/", false);
  expect(url).toEqual("https://example.com/slug/nested");
});

test("should returns collect url - baseUrl has trailing slash and slug has prefix slash and trailing slash", () => {
  const url = buildUrl("https://example.com/", "/slug/nested/", false);
  expect(url).toEqual("https://example.com/slug/nested");
});

test("should returns collect queryParams - with single queryParam", () => {
  const queryParam = buildQueryParams({
    params: {
      key: "q",
      values: ["abc"]
    }
  });
  expect(queryParam).toEqual("q=abc");
});

test("should returns collect queryParams - with double queryParam", () => {
  const queryParam = buildQueryParams({
    params: {
      key: "q",
      values: ["abc", "def"]
    }
  });
  expect(queryParam).toEqual("q=abc&q=def");
});

test("should returns collect queryParams - with pagination", () => {
  const queryParam = buildQueryParams({
    pagination: {
      page: 3,
      limit: 10
    }
  });
  expect(queryParam).toEqual("page=3&limit=10");
});

test("should returns collect queryParams - with double queryParams and pagination", () => {
  const queryParam = buildQueryParams({
    params: {
      key: "q",
      values: ["abc", "def"]
    },
    pagination: {
      page: 3,
      limit: 10
    }
  });
  expect(queryParam).toEqual("q=abc&q=def&page=3&limit=10");
});
