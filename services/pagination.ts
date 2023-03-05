import { PaginationNumbers } from '../models/pagination';

export function calcNumberOfPages(total: number, perPage: number): PaginationNumbers {
  const last = Math.ceil(total / perPage) + 1;
  const pages = [...Array(last)].map((_, i) => i);
  pages.shift();
  return {
    pages: pages,
    last: last
  };
}
