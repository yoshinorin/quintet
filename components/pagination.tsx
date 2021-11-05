// TODO: refactor all
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

const PaginationComponent: React.FunctionComponent<{ basePath: string, current: number, total: number }> = ({ basePath, current, total} ) => {
  // TODO: refactor magic number
  const last = Math.floor(total / 10);
  const prev = current - 1;
  // YOU ARE NOT A STRING!!!!
  // @ts-ignore
  const next = parseInt(current)+ 1;

  return(
    <div className={style['pagination-bar']}>
      <nav aria-label="Page navigation">
        <ul className={style['pagination']}>
          {
            (() => {
              if (current === 1) {
                return (
                  <>
                    <li className={style['disabled']}>
                      <a>First</a>
                    </li>
                    <li className={style['disabled']}>
                      <a>Prev</a>
                    </li>
                  </>
                )
              } else {
                return(
                  <>
                    <li>
                      <Link href={`/${basePath}/1`}>First</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${prev}`}>Prev</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/1`}>1</Link>
                    </li>
                  </>
                )
              }
            })()
          }
          {
            (() => {
              if (current > 2) {
                return(
                  <li>
                    <a>...</a>
                  </li>
                )
              }
            })()
          }
          {
            (() => {
              if (current !== 1 && current !== last) {
                return(
                  <li className={style['disabled']}>
                    <a>{current}</a>
                  </li>
                )
              }
            })()
          }
          {
            (() => {
              if (current !== last) {
                return(
                  <>
                    <li>
                      <a>...</a>
                    </li>
                    <li>
                      {/* NOTE:
                          need toString for deal with "Multiple children were passed to <Link> with `href` of ..."
                      */}
                      <Link href={`/${basePath}/${last}`}>{last.toString()}</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${next}`}>Next</Link>
                    </li>
                    <li>
                      <Link href={`/${basePath}/${last}`}>Last</Link>
                    </li>
                  </>
                )
              }
            })()
          }
          {
            (() => {
              if (current === last) {
                return(
                  <>
                    <li className={style['disabled']}>
                      <a>Next</a>
                    </li>
                    <li className={style['disabled']}>
                      <a>Last</a>
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
