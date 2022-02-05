import {
  convertUnixtimeToDate,
  convertUnixTimeToISODateSrting
} from '../../utils/time';

test('Unixtime should be convert to Date', () => {
  expect(convertUnixtimeToDate(1644075206).toISOString())
  .toEqual("2022-02-05T15:33:26.000Z")
})

test('Unixtime should be convert to ISODateTime', () => {
  expect(convertUnixTimeToISODateSrting(1644075206))
  .toEqual("2022-02-05T15:33:26.000Z")
})
