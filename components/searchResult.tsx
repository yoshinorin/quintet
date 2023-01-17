import React from 'react';
import Link from 'next/link';
import styles from '../styles/articles.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import buttonStyles from '../styles/components/button.module.scss';
import { convertUnixtimeToDate, toJaJpDottedDateString } from '../utils/time';
import { SearchResponse } from '../types/search';

const SearchResultComponent: React.FunctionComponent<{
  hits: number,
  count:number,
  contents: Array<SearchResponse>
}> = ({ hits, count, contents }) => {

  return <>
    <div className={styles['found']}>
      {contents.length} / {hits}
    </div>
    <div id={styles['archives']}>
      {contents.map((content: SearchResponse, idx) => {
        return (
          <article className={styles['articles']} key={idx}>
            <div className={styles['wrap']}>
              <div className={styles['header']}>
                <time dateTime={`${content.publishedAt}`} className={styles['time']}>
                  {`${toJaJpDottedDateString(convertUnixtimeToDate(content.publishedAt))}`}
                </time>
                <h3 className={styles['title']}>
                  <Link href={`${content.path}`} prefetch={false} className='unstyled' target="_blank">
                    {`${content.title}`}
                  </Link>
                </h3>
              </div>
              <div className={styles['excerpt']}>
                <Link href={`${content.path}`} prefetch={false} className='unstyled' target="_blank">
                  {`${content.content}`}
                </Link>
                <div className={`${buttonStyles['continue-read-button-wrap']}`}>
                  <Link
                    href={`${content.path}`}
                    prefetch={false}
                    className={`'unstyled' ${buttonStyles['menu-button']} ${buttonStyles['continue-read-button']}`}>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </>;
}

export default SearchResultComponent;
