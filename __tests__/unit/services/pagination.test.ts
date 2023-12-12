import { expect, test } from 'vitest'
import { calcNumberOfPages, getNumbersForDisplay } from '../../../src/services/pagination';
import { PaginationNumbers } from '../../../src/models/pagination';

test('calculate number of pagination: max pages 150 and current page is 10', () => {
  expect(calcNumberOfPages(150, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      last: 16
    } as PaginationNumbers
  )
});

test('calculate number of pagination: max pages 151 and current page is 10', () => {
  expect(calcNumberOfPages(151, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      last: 17
    } as PaginationNumbers
  )
});

test('calculate number of pagination: max pages 159 and current page is 10', () => {
  expect(calcNumberOfPages(159, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      last: 17
    } as PaginationNumbers
  )
});

test('calculate number of pagination: max pages 1 and current page is 10', () => {
  expect(calcNumberOfPages(1, 10))
  .toEqual(
    {
      pages: [1],
      last: 2
    } as PaginationNumbers
  )
});

test('calculate number of pagination: max pages 0 and current page is 10', () => {
  expect(calcNumberOfPages(0, 10))
  .toEqual(
    {
      pages: [],
      last: 1
    } as PaginationNumbers
  )
});

test('get numbers for display: max page is 1 and current page is 1', () => {
  expect(getNumbersForDisplay([1], 1, 2)).toEqual([1])
});

test('get numbers for display: max page is 5 and current page is 1', () => {
  expect(getNumbersForDisplay(Array.from(Array(5).keys()), 1, 6)).toEqual([1,2,3,4])
});

const total = Array.from(Array(152).keys())
test('get numbers for display: max page is 152 and current page is 1', () => {
  expect(getNumbersForDisplay(total, 1, 153)).toEqual([1,2,76,150,151])
});

test('get numbers for display: max page is 152 and  current page is 2', () => {
  expect(getNumbersForDisplay(total, 2, 153)).toEqual([1,2,3,76,150,151])
});

test('get numbers for display: max page is 152 and  current page is 4', () => {
  expect(getNumbersForDisplay(total, 4, 153)).toEqual([1,3,4,5,76,150,151])
});

test('get numbers for display: max page is 152 and  current page is 5', () => {
  expect(getNumbersForDisplay(total, 5, 153)).toEqual([1,4,5,6,150,151])
});

test('get numbers for display: max page is 152 and  current page is 148', () => {
  expect(getNumbersForDisplay(total, 148, 153)).toEqual([1,147,148,149,150,151])
});

test('get numbers for display: max page is 152 and  current page is 149', () => {
  expect(getNumbersForDisplay(total, 149, 153)).toEqual([1,76,148,149,150,151])
});

test('get numbers for display: max page is 152 and  current page is 150', () => {
  expect(getNumbersForDisplay(total, 150, 153)).toEqual([1,76,149,150,151])
});

test('get numbers for display: max page is 152 and  current page is 151', () => {
  expect(getNumbersForDisplay(total, 151, 153)).toEqual([1,76,150,151,152])
});

test('get numbers for display: max page is 152 and  current page is 152', () => {
  expect(getNumbersForDisplay(total, 152, 153)).toEqual([1,76,150,151,152])
});
