import { expect, test } from "vitest";
import { RequestOptions, fetchFromApi } from "../../../src/api/request";

test("should returns 404 if path contains ignore chars", async () => {
  const options: RequestOptions = {
    interceptIfContainsIgnorePaths: true
  };
  const response = await fetchFromApi("https://example.com/hoge.svg", options);
  expect(response.status).toEqual(404);
});
