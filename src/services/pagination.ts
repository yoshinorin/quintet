import { PaginationNumbers } from '../models/pagination';

export function calcNumberOfPages(total: number, perPage: number): PaginationNumbers {
  // FIX: do not add +1 to last page
  const last = Math.ceil(total / perPage) + 1;
  const pages = [...Array(last)].map((_, i) => i);
  pages.shift();
  return {
    pages: pages,
    last: last
  };
}

export function getNumbersForDisplay(pages: Array<number>, current: number, last: number): Array<number> {
  if (1 == pages.length) {
    return pages;
  }

  if (pages.length >= 2 && 7 > pages.length[pages.length]) {
    return pages;
  }

  // l.length >= 7
  const ls = [pages[0], pages[1], current - 1, current, current + 1, pages[pages.length -2], pages[pages.length -1]];
  if (5 > current || current >= last - 4) {
    ls.push(Math.floor(pages.length / 2));
  }
  // TODO: avoid scan array many times
  return Array.from(new Set(ls.sort((x, y) => {return x - y;}))).filter(x => last > x && x > 0);
}
