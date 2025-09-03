import { describe, expect, test } from "vitest";
import {
  getDefaultSyntaxTheme,
  getSyntaxTheme,
  getTheme
} from "../../../src/services/theme";

describe("theme tests", () => {
  test("get light theme if localStorage is empty", () => {
    expect(getTheme()).toBe("light");
  });

  test("get default syntaxTheme if localStorage is empty", () => {
    expect(getSyntaxTheme()).toBe("default");
  });

  test("get theme's default syntaxTheme", () => {
    expect(getDefaultSyntaxTheme("light")).toBe("light");
    expect(getDefaultSyntaxTheme("dark")).toBe("dark");
  });
});
