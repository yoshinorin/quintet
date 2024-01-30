import { expect, test } from 'vitest'
import {
  splittedBy,
  toDate,
  toISODateSrting,
} from '../../../src/utils/time';

test('Unixtime should be convert to Date', () => {
  expect(toDate(1644075206).toISOString())
  .toEqual("2022-02-05T15:33:26.000Z")
})

test('Unixtime should be convert to ISODateTime', () => {
  expect(toISODateSrting(1644075206))
  .toEqual("2022-02-05T15:33:26.000Z")
})

test('splittedBy', () => {
  const result = splittedBy(1644075206, 'ja-JP', "/");
  expect(result[0]).toEqual('2022')
  expect(result[1]).toEqual('02')
   // .toEqual(['2022', '02', '06'])  NOTE: local -> JST, CI -> UTC
});
