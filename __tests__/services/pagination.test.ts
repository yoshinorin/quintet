import { calcNumberOfPages } from '../../services/pagination';
import { PaginationNumbers } from '../../models/pagination';

let x =

test('calculate number of pagination', () => {
  expect(calcNumberOfPages(150, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      last: 16
    } as PaginationNumbers
  )
});

test('calculate number of pagination', () => {
  expect(calcNumberOfPages(151, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      last: 17
    } as PaginationNumbers
  )
});

test('calculate number of pagination', () => {
  expect(calcNumberOfPages(159, 10))
  .toEqual(
    {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      last: 17
    } as PaginationNumbers
  )
});

test('calculate number of pagination', () => {
  expect(calcNumberOfPages(1, 10))
  .toEqual(
    {
      pages: [1],
      last: 2
    } as PaginationNumbers
  )
});

test('calculate number of pagination', () => {
  expect(calcNumberOfPages(0, 10))
  .toEqual(
    {
      pages: [],
      last: 1
    } as PaginationNumbers
  )
});
