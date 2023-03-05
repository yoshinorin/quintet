// TODO: refactor all
import { PaginationNumbers } from '../models/pagination';
import { calcNumberOfPages } from '../services/pagination';
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

// TODO: set default number of articles in one page from config.
const PER_PAGE = 10;

const PaginationComponent: React.FunctionComponent<{ basePath: string, current: number, total: number }> = ({ basePath, current, total} ) => {

  const paginationNumbers: PaginationNumbers = calcNumberOfPages(total, PER_PAGE);

  if (1 > paginationNumbers.pages.length) {
    // No-need pagination
    return(
      <></>
    )
  }

  // YOU ARE NOT A STRING!!! THANK YOU TYPESCRIPT!!!
  // @ts-ignore
  current = parseInt(current);
  current = 0 >= current ? 1 : current;

  let p = []
  if (1 == paginationNumbers.pages.length) {
    p = paginationNumbers.pages;
  } else if (paginationNumbers.pages.length >= 2 && 7 > paginationNumbers.pages.length[paginationNumbers.pages.length]) {
    p = paginationNumbers.pages;
  } else { // l.length >= 7

    const ls = [paginationNumbers.pages[0], paginationNumbers.pages[1], current - 1, current, current + 1, paginationNumbers.pages[paginationNumbers.pages.length -2], paginationNumbers.pages[paginationNumbers.pages.length -1]];
    if (5 > current || current >= paginationNumbers.last - 4) {
      ls.push(Math.floor(paginationNumbers.pages.length / 2));
    }
    // TODO: avoid scan array many times
    p = Array.from(new Set(ls.sort((x, y) => {return x - y;}))).filter(x => paginationNumbers.last > x && x > 0);
  }

  // TODO: add First, Prev, Next, Last
  // TODO: enable & disable
  return (
    <div className={style['pagination-bar']}>
      <nav aria-label="Page navigation">
        <ul className={style['pagination']}>
          {
            (() => {
              let e = [];
              let k = 0; // NOTE: just suppress warning
              for (let i = 0; i < p.length; i++) {
                const prev = p[i - 1];
                if (p[i] - 2 >= prev) {
                  e.splice(e.length, 0,
                    <li key={k}>
                      <a>...</a>
                    </li>
                  )
                  k++;
                }
                e.push(
                  <li key={k}
                      className={p[i] !== current ? '' : style['active']}>
                    <Link href={`/${basePath}/${p[i]}`} prefetch={false}>
                      {p[i].toString()}
                    </Link>
                  </li>
                )
                k++;
              }
              return(
                <>{e}</>
              )
            })()
          }
        </ul>
      </nav>
    </div>
  );
}

export default PaginationComponent;
