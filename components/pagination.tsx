// TODO: refactor all
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

// TODO: set default number of articles in one page from config.
const PER_PAGE = 10;

const PaginationComponent: React.FunctionComponent<{ basePath: string, current: number, total: number }> = ({ basePath, current, total} ) => {
  const last = Math.floor(total / PER_PAGE);
  const l = [...Array(last)].map((_, i) => i + 1);
  //l.shift();

  let p = []
  if (1 > l.length) {
    // No-need pagination
    return(
      <></>
    )
  } else if (1 == l.length) {
    p = l;
  } else if (l.length >= 2 && 7 > l.length) {
    p = l;
  } else { // l.length >= 7
    const m = Math.floor(l.length / 2);
    p.push(l[0], l[1], m, l[l.length -2], l[l.length -1]);
  }
  current = 0 >= current ? 1 : current;

  // TODO: add First, Prev, Next, Last
  // TODO: enable & disable
  return(
    <div className={style['pagination-bar']}>
      <nav aria-label="Page navigation">
        <ul className={style['pagination']}>
          {
            (() => {
              if (7 > p[p.length - 1]) {
                return(
                  p.map(p => {
                    return (
                      <li>
                        <Link href={`/${basePath}/${p}`}>{p.toString()}</Link>
                      </li>
                    )
                  })
                )
              } else {
                return(
                  <>
                    <li>
                      <Link href={`/${basePath}/${p[0]}`}>{p[0].toString()}</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${p[1]}`}>{p[1].toString()}</Link>
                    </li>
                    <li>
                      <a>...</a>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${p[2]}`}>{p[2].toString()}</Link>
                    </li>
                    <li>
                      <a>...</a>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${p[3]}`}>{p[3].toString()}</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${p[4]}`}>{p[4].toString()}</Link>
                    </li>
                  </>
                )
              }
            })()
          }
        </ul>
      </nav>
    </div>
  )
}

export default PaginationComponent;
