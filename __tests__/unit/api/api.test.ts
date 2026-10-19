import { describe, expect, it, test } from "vitest";
import { PaginationParams } from "../../../src/api";
import { Order, getValidOrder } from "../../../src/api/order";
import {
  RequestOptions,
  fetchFromApi,
  forwardableHeaders,
  makeRequestHeader,
  maskHeaders
} from "../../../src/api/request";

test("should returns 404 if path contains ignore chars", async () => {
  const options: RequestOptions = {
    blockIgnoredPaths: true
  };
  const response = await fetchFromApi("https://example.com/hoge.svg", options);
  expect(response.status).toEqual(404);
});

describe("PaginationParams", () => {
  it("should accept valid PaginationParams object", () => {
    const params: PaginationParams = {
      page: 1,
      limit: 10,
      order: Order.DESC
    };

    expect(params.page).toBe(1);
    expect(params.limit).toBe(10);
    expect(params.order).toBe(Order.DESC);
  });

  it("should work with different Order values", () => {
    const defaultParams: PaginationParams = {
      page: 1,
      limit: 20,
      order: Order.DEFAULT
    };

    const randomParams: PaginationParams = {
      page: 2,
      limit: 5,
      order: Order.RANDOM
    };

    expect(defaultParams.order).toBe(Order.DEFAULT);
    expect(randomParams.order).toBe(Order.RANDOM);
  });

  it("should enforce correct types", () => {
    const params: PaginationParams = {
      page: 1,
      limit: 10,
      order: Order.DESC
    };

    expect(typeof params.page).toBe("number");
    expect(typeof params.limit).toBe("number");
    expect(typeof params.order).toBe("string");
  });

  it("should work with getValidOrder function", () => {
    const orderParam = "desc";
    const validOrder = getValidOrder(orderParam);

    const params: PaginationParams = {
      page: 1,
      limit: 10,
      order: validOrder
    };

    expect(params.order).toBe(Order.DESC);
  });
});

describe("forwardableHeaders", () => {
  it("should remove hop-by-hop and connection-listed headers", () => {
    const h = forwardableHeaders(
      new Headers({
        host: "example.com",
        connection: "keep-alive, x-foo",
        "keep-alive": "timeout=5",
        "transfer-encoding": "chunked",
        "x-foo": "foo",
        "x-bar": "bar",
        "accept-language": "ja"
      })
    );
    expect([...h.keys()].sort()).toEqual(["accept-language", "x-bar"]);
  });
});

describe("maskHeaders", () => {
  it("should mask sensitive headers", () => {
    expect(
      maskHeaders(
        new Headers({
          cookie: "a=b",
          authorization: "Bearer x",
          "x-bar": "bar"
        })
      )
    ).toEqual({ authorization: "***", cookie: "***", "x-bar": "bar" });
  });
});

describe("makeRequestHeader", () => {
  it("should forward incoming headers and override context headers", () => {
    const h = makeRequestHeader(
      new Headers({
        host: "example.com",
        "user-agent": "ua",
        "x-request-id": "incoming",
        "x-custom": "custom"
      }),
      {
        ipAddress: "192.0.2.1",
        referer: null,
        ua: "ua",
        requestId: "generated"
      }
    );
    expect(h.get("host")).toBeNull();
    expect(h.get("user-agent")).toEqual("ua");
    expect(h.get("x-custom")).toEqual("custom");
    expect(h.get("x-forwarded-for")).toEqual("192.0.2.1");
    expect(h.get("x-request-id")).toEqual("generated");
    expect(h.get("content-type")).toEqual("application/json");
  });
});
