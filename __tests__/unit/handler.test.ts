import { expect, test } from "vitest";
import { parseOrThrow } from "../../src/app/handler";

test("should parse response and return data if status is 200", async () => {
  const response = new Response(JSON.stringify({ message: "Success" }), {
    status: 200
  });
  const data = await parseOrThrow<{ message: string }>(response);
  expect(data).toEqual({ message: "Success" });
});

test("should throw an error if status is 404", async () => {
  const response = new Response("Not Found", { status: 404 });
  await expect(parseOrThrow(response)).rejects.toThrowError(
    "NEXT_HTTP_ERROR_FALLBACK;404"
  );
});

test("should throw an error if status is not 200 or 404", async () => {
  const response = new Response("Internal Server Error", { status: 500 });
  await expect(parseOrThrow(response)).rejects.toThrowError(Error);
});
