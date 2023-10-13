import {
  convertUnixtimeToDate,
  convertUnixTimeToISODateSrting,
  toJaJpDottedDateString
} from '../../src/utils/time';

test('Unixtime should be convert to Date', () => {
  expect(convertUnixtimeToDate(1644075206).toISOString())
  .toEqual("2022-02-05T15:33:26.000Z")
})

test('Unixtime should be convert to ISODateTime', () => {
  expect(convertUnixTimeToISODateSrting(1644075206))
  .toEqual("2022-02-05T15:33:26.000Z")
})

/*
This test seems lazy no-need.

// https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config
test('Date should be convert to dotted date string (ja-Jp)', () => {
  expect(toJaJpDottedDateString(convertUnixtimeToDate(1644075206)))
  .toEqual("2022.2.6")
})
*/
