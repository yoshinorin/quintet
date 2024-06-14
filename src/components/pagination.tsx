// TODO: refactor all
import { PaginationNumbers } from "../models/models";
import {
  calcNumberOfPages,
  getNumbersForDisplay
} from "../services/pagination";
import Link from "next/link";
import style from "../styles/components/pagination.module.scss";

// TODO: set default number of articles in one page from config.
const PER_PAGE = 10;

export const PaginationComponent: React.FunctionComponent<{
  basePath: string;
  current: number;
  total: number;
}> = ({ basePath, current, total }) => {
  const paginationNumbers: PaginationNumbers = calcNumberOfPages(
    total,
    PER_PAGE
  );

  if (1 > paginationNumbers.pages.length) {
    // No-need pagination
    return <></>;
  }

  // YOU ARE NOT A STRING!!! THANK YOU TYPESCRIPT!!!
  // @ts-ignore
  current = parseInt(current);
  current = 0 >= current ? 1 : current;
  const p = getNumbersForDisplay(
    paginationNumbers.pages,
    current,
    paginationNumbers.last
  );

  // TODO: add First, Prev, Next, Last
  // TODO: enable & disable
  return (
    <div className={style["pagination-bar"]}>
      <nav aria-label="Page navigation">
        <ul className={style["pagination"]}>
          {(() => {
            let e = [];
            let k = 0; // NOTE: just suppress warning
            for (let i = 0; i < p.length; i++) {
              const prev = p[i - 1];
              if (p[i] - 2 >= prev) {
                e.splice(
                  e.length,
                  0,
                  <li key={k}>
                    <a>...</a>
                  </li>
                );
                k++;
              }
              e.push(
                <li key={k} className={p[i] !== current ? "" : style["active"]}>
                  <Link href={`/${basePath}?p=${p[i]}`} prefetch={false}>
                    {p[i].toString()}
                  </Link>
                </li>
              );
              k++;
            }
            return <>{e}</>;
          })()}
        </ul>
      </nav>
    </div>
  );
};
