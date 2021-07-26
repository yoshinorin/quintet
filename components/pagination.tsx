// TODO: refactor all
import style from '../styles/components/pagination.module.scss';

function createFirstButton(basePath, current, last) {
  if (current === 1 || last === 1) {
    return(
      <li className={style['disabled']}><a>First</a></li>
    )
  }
  if (current >= 2) {
    const path = `/${basePath}/1`
    return(
      <li><a href={path}>First</a></li>
    )
  }
}

function createPrevButton(basePath, current, last) {
  if (current === 1 || last === 1) {
    return(
      <li className={style['disabled']}><a>Prev</a></li>
    )
  }
  if (current >= 2) {
    const path = `/${basePath}/${current - 1}`
    return(
      <li><a href={path}>Prev</a></li>
    )
  }
}

function createFirstNumButton(basePath, current) {
  if (current > 2) {
    const path = `/${basePath}/1`
    return(
      <li><a href={path}>1</a></li>
    )
  }
}

function createPrevDots(current) {
  if (current > 4) {
    return(
      <li><a>...</a></li>
    )
  }
}

function createTwoPrevNumButton(basePath, current) {
  if (current > 3) {
    const path = `/${basePath}/${current - 2}`
    return(
      <li><a href={path}>{current - 2}</a></li>
    )
  }
}

function createNextNumButton(basePath, current, last) {
  if (current !== last && last - 2 > current) {
    const path = `/${basePath}/${current + 1}`
    return(
      <li><a href={path}>{current + 1}</a></li>
    )
  }
}

function createTwoNextNumButton(basePath, current, last) {
  if (current !== last && last - 3 > current) {
    const path = `/${basePath}/${current + 2}`
    return(
      <li><a href={path}>{current + 2}</a></li>
    )
  }
}

function createNextDots(current, last) {
  if (current !== last && last - 4 > current) {
    return(
      <li><a>...</a></li>
    )
  }
}

function createLastNumButton(basePath, current, last) {
  if (current !== last) {
    const path = `/${basePath}/${last}`
    return(
      <li><a href={path}>{last}</a></li>
    )
  }
}

function createNextButton(basePath, current, last) {
  if (current !== last) {
    const path = `/${basePath}/${current + 1}`
    return(
      <li><a href={path}>Next</a></li>
    )
  }
  return(
    <li className={style['disabled']}><a>Next</a></li>
  )
}

function createBeforeLastNumButton(basePath, current, last) {
  if (current !== last && last - 1 > current) {
    const path = `/${basePath}/${last - 1}`
    return(
      <li><a href={path}>{last - 1}</a></li>
    )
  }
}

function createLastButton(basePath, current, last) {
  if (current !== last) {
    const path = `/${basePath}/${last}`
    return(
      <li><a href={path}>Last</a></li>
    )
  }
  return(
    <li className={style['disabled']}><a>Last</a></li>
  )
}

export default function Pagination({ basePath, current, total }) {
  // TODO: you are a number not a string...
  current = parseInt(current);
  // TODO: refactor magic number
  const last = Math.floor(total / 10);
  return(
    <div className={style['pagination-bar']}>
      <nav aria-label="Page navigation">
        <ul className={style['pagination']}>
          {createFirstButton(basePath, current, last)}
          {createPrevButton(basePath, current, last)}
          {createFirstNumButton(basePath, current)}
          {createPrevDots(current)}
          {createTwoPrevNumButton(basePath, current)}
          <li className={style['active']}><a href={`/${basePath}/${current}`}>{current}</a></li>
          {createNextNumButton(basePath, current, last)}
          {createTwoNextNumButton(basePath, current, last)}
          {createNextDots(current, last)}
          {createBeforeLastNumButton(basePath, current, last)}
          {createLastNumButton(basePath, current, last)}
          {createNextButton(basePath, current, last)}
          {createLastButton(basePath, current, last)}
        </ul>
      </nav>
    </div>
  )
}
