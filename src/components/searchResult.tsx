import React from 'react';
import Link from 'next/link';
import styles from '../styles/articles.module.scss';
import { convertUnixtimeToDate, toJaJpDottedDateString } from '../utils/time';
import { SearchResponse } from '../models/models';

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
                <Link href={`${content.path}`} prefetch={false} className='unstyled' target="_blank">
                  <h3 className={styles['title']}>
                    {`${content.title}`}
                  </h3>
                  <div className={styles['excerpt']}>
                    {`${content.content}`}
                  </div>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </>;
}

export default SearchResultComponent;
