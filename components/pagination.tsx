// TODO: refactor all
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

export default function Pagination({ basePath, current, total }) {
  // TODO: you are a number not a string...
  current = parseInt(current);
  // TODO: refactor magic number
  const last = Math.floor(total / 10);

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
                      <Link href={`/${basePath}/${current - 1}`}>Prev</Link>
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
          <li className={style['active']}>
            <a href={`/${basePath}/${current}`}>{current}</a>
          </li>
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
                      <Link href={`/${basePath}/${current + 1}`}>Next</Link>
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
