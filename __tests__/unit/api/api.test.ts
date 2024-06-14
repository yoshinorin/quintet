import { expect, test } from "vitest";
import { fetchFromApi } from "../../../src/api/request";

test("should returns 404 if path contains ignore chars", async () => {
  const response = await fetchFromApi(
    "https://example.com/hoge.svg",
    "",
    null,
    {
      interceptIfContainsIgnorePaths: true
    }
  );
  expect(response.status).toEqual(404);
});
