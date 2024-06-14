export const sequentialPadPosNum = (
  starts: number,
  ends: number
): Array<string> => {
  return [...Array(ends)].map((_, i) =>
    (i + starts).toString().padStart(2, "0")
  );
};
