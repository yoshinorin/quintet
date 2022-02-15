// TODO: refactor all
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

// TODO: set default number of articles in one page from config.
const PER_PAGE = 10;

const PaginationComponent: React.FunctionComponent<{ basePath: string, current: number, total: number }> = ({ basePath, current, total} ) => {
  const last = Math.floor(total / PER_PAGE);
  const l = [...Array(last)].map((_, i) => i);
  l.shift();

  // YOU ARE NOT A STRING!!! THANK YOU TYPESCRIPT!!!
  // @ts-ignore
  current = parseInt(current);
  current = 0 >= current ? 1 : current;

  let p = []
  if (1 > l.length) {
    // No-need pagination
    return(
      <></>
    )
  } else if (1 == l.length) {
    p = l;
  } else if (l.length >= 2 && 7 > l.length[l.length]) {
    p = l;
  } else { // l.length >= 7
    const m = Math.floor(l.length / 2);
    const ls = [l[0], l[1], m, current - 1, current, current + 1, l[l.length -2], l[l.length -1]]
    // TODO: avoid scan array many times
    p = Array.from(new Set(ls.sort((x, y) => {return x - y;}))).filter(x => last > x && x > 0);
  }

  // TODO: add First, Prev, Next, Last
  // TODO: enable & disable
  return(
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
                  <li key={k}>
                    <Link
                      href={`/${basePath}/${p[i]}`}
                      prefetch={false}
                    >
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
  )
}

export default PaginationComponent;
