import { expect, test } from "vitest";
import {
  isProblemDetails,
  ProblemDetails
} from "../../../src/models/problemDetails";

test("should return true when value is a ProblemDetails object", () => {
  const value: ProblemDetails = {
    title: "Internal Server Error",
    status: 500,
    detail: "An unexpected error occurred.",
    instance: "/api/users",
    errors: ["500", "Internal Server Error"]
  };
  const result = isProblemDetails(value);

  expect(result).toBe(true);
});

test("should return false when value is not an object", () => {
  const value = "Invalid input";
  const result = isProblemDetails(value);

  expect(result).toBe(false);
});

test("should return false when value is null", () => {
  const value = null;
  const result = isProblemDetails(value);

  expect(result).toBe(false);
});

test("should return false when status is not a number", () => {
  const value = {
    title: "Bad Request",
    status: "400",
    detail: "Invalid request.",
    instance: "/api/users",
    errors: ["400", "Bad Request"]
  };
  const result = isProblemDetails(value);

  expect(result).toBe(false);
});

test("should return true when errors is an array", () => {
  const value: ProblemDetails = {
    title: "Not Found",
    status: 404,
    detail: "Resource not found.",
    instance: "/api/users",
    errors: ["", ""]
  };
  const result = isProblemDetails(value);

  expect(result).toBe(true);
});

test("should return false when errors is not an array", () => {
  const value = {
    title: "Unauthorized",
    status: 401,
    detail: "Access denied.",
    instance: "/api/users",
    errors: "401"
  };
  const result = isProblemDetails(value);

  expect(result).toBe(false);
});
