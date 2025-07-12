import { describe, expect, it } from "vitest";
import { Order, getValidOrder } from "../../../src/api/order";

describe("Order", () => {
  it("should have correct enum values", () => {
    expect(Order.DEFAULT).toBe("default");
    expect(Order.DESC).toBe("desc");
    expect(Order.RANDOM).toBe("random");
  });
});

describe("getValidOrder", () => {
  it("should return Order.DESC when given 'desc'", () => {
    const result = getValidOrder("desc");
    expect(result).toBe(Order.DESC);
  });

  it("should return Order.RANDOM when given 'random'", () => {
    const result = getValidOrder("random");
    expect(result).toBe(Order.RANDOM);
  });

  it("should return Order.DEFAULT when given 'default'", () => {
    const result = getValidOrder("default");
    expect(result).toBe(Order.DEFAULT);
  });

  it("should return Order.DEFAULT when given undefined", () => {
    const result = getValidOrder(undefined);
    expect(result).toBe(Order.DEFAULT);
  });

  it("should return Order.DEFAULT when given invalid string", () => {
    const result = getValidOrder("invalid");
    expect(result).toBe(Order.DEFAULT);
  });

  it("should return Order.DEFAULT when given empty string", () => {
    const result = getValidOrder("");
    expect(result).toBe(Order.DEFAULT);
  });

  it("should return Order.DEFAULT when given null", () => {
    const result = getValidOrder(null as any);
    expect(result).toBe(Order.DEFAULT);
  });

  it("should be case sensitive", () => {
    expect(getValidOrder("DESC")).toBe(Order.DEFAULT);
    expect(getValidOrder("Desc")).toBe(Order.DEFAULT);
    expect(getValidOrder("RANDOM")).toBe(Order.DEFAULT);
  });
});
