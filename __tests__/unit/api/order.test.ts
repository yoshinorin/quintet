import { describe, expect, it } from "vitest";
import { Order, getValidOrder, isRandomOrder } from "../../../src/api/order";

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

describe("isRandomOrder", () => {
  it("should return true when order is Order.RANDOM", () => {
    const result = isRandomOrder(Order.RANDOM);
    expect(result).toBe(true);
  });

  it("should return false when order is Order.DEFAULT", () => {
    const result = isRandomOrder(Order.DEFAULT);
    expect(result).toBe(false);
  });

  it("should return false when order is Order.DESC", () => {
    const result = isRandomOrder(Order.DESC);
    expect(result).toBe(false);
  });

  it("should work with getValidOrder function", () => {
    const randomOrder = getValidOrder("random");
    const descOrder = getValidOrder("desc");
    const defaultOrder = getValidOrder("invalid");

    expect(isRandomOrder(randomOrder)).toBe(true);
    expect(isRandomOrder(descOrder)).toBe(false);
    expect(isRandomOrder(defaultOrder)).toBe(false);
  });
});
