// TODO: refactor all
import Link from 'next/link';
import style from '../styles/components/pagination.module.scss';

export default function Pagination({ basePath, current, total }) {
  // TODO: you are a number not a string...
  current = parseInt(current);
  // TODO: refactor magic number
  const last = Math.floor(total / 10);

  // TODO: a tag to Link component
  //       Multiple children were passed to <Link> with `href` of ....
  return(
    <div className={style['pagination-bar']}>
      <nav aria-label="Page navigation">
        <ul className={style['pagination']}>
          {
            (() => {
              if (current === 1 || last === 1) {
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
                      <a href={`/${basePath}/1`}>First</a>
                    </li>
                    <li>
                      <a href={`/${basePath}/${current - 1}`}>Prev</a>
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
                    <a href={`/${basePath}/1`}>1</a>
                  </li>
                )
              }
            })()
          }
          {
            (() => {
              if (current > 4) {
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
              if (current > 3) {
                return(
                  <li>
                    <a href={`/${basePath}/${current - 2}`}>{current - 2}</a>
                  </li>
                )
              }
            })()
          }
          <li className={style['active']}><a href={`/${basePath}/${current}`}>{current}</a></li>
          {
            (() => {
              if (current !== last && last - 2 > current) {
                return(
                  <li>
                    <a href={`/${basePath}/${current + 1}`}>{current + 1}</a>
                  </li>
                )
              }
            })()
          }
          {
            (() => {
              if (current !== last && last - 3 > current) {
                return(
                  <li>
                    <a href={`/${basePath}/${current + 2}`}>{current + 2}</a>
                  </li>
                )
              }
            })()
          }
          {
            (() => {
              if (current !== last && last - 4 > current) {
                return(
                  <li><a>...</a></li>
                )
              }
            })()
          }
          {
            (() => {
              if (current !== last && last - 1 > current) {
                return(
                  <>
                    <li>
                      <a href={`/${basePath}/${last - 1}`}>{last - 1}</a>
                    </li>
                  </>
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
                      <a href={`/${basePath}/${last}`}>{last}</a>
                    </li>
                    <li>
                      <a href={`/${basePath}/${current + 1}`}>Next</a>
                    </li>
                    <li>
                      <a href={`/${basePath}/${last}`}>Last</a>
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
