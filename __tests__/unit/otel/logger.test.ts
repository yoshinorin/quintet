import { SeverityNumber } from "@opentelemetry/api-logs";
import { expect, test } from "vitest";
import { isKnownLevel, toSeverityNumber } from "../../../src/otel/logger";

test("toSeverityNumber maps known levels", () => {
  expect(toSeverityNumber("debug")).toBe(SeverityNumber.DEBUG);
  expect(toSeverityNumber("info")).toBe(SeverityNumber.INFO);
  expect(toSeverityNumber("warn")).toBe(SeverityNumber.WARN);
  expect(toSeverityNumber("error")).toBe(SeverityNumber.ERROR);
});

test("toSeverityNumber handles casing and trimming", () => {
  expect(toSeverityNumber("  INFO ")).toBe(SeverityNumber.INFO);
  expect(toSeverityNumber("Warn")).toBe(SeverityNumber.WARN);
});

test("toSeverityNumber returns UNSPECIFIED for unknown", () => {
  expect(toSeverityNumber("unknown" as any)).toBe(SeverityNumber.UNSPECIFIED);
  expect(toSeverityNumber("")).toBe(SeverityNumber.UNSPECIFIED);
  expect(toSeverityNumber(undefined as any)).toBe(SeverityNumber.UNSPECIFIED);
  expect(toSeverityNumber(null as any)).toBe(SeverityNumber.UNSPECIFIED);
});

test("isKnownLevel", () => {
  expect(isKnownLevel("info")).toBe(true);
  expect(isKnownLevel("foo")).toBe(false);
});
