import { expect, test } from "vitest";
import { sequentialPadPosNum } from "../../../src/utils/nums";

test("should generate zero padded pos nums - starts with 0", () => {
  expect(sequentialPadPosNum(0, 5)).toEqual(["00", "01", "02", "03", "04"]);
});

test("should generate zero padded pos nums - starts with 1", () => {
  expect(sequentialPadPosNum(1, 5)).toEqual(["01", "02", "03", "04", "05"]);
});
