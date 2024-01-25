import Link from 'next/link';
import {
  Article,
  Series,
  SeriresWithArticles
} from '../models/models';
import styles from '../styles/series.module.scss';
import containerStyles from '../styles/components/container.module.scss';

export const SeriesComponent: React.FunctionComponent<{ series: Array<Series> }> = ({ series }) => {

  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['series']}>
        {series.map((s: Series, idx) => {
          return (
            <article className={styles['article']} key={idx}>
              <div className={styles['wrap']}>
                <blockquote key={idx}>
                  <p className={styles['header']}>
                    <Link href={`/series/${s.name}`} prefetch={false} className='unstyled'>
                      {`${s.title}`}
                    </Link>
                  </p>
                  <Link href={`/series/${s.name}`}
                        prefetch={false}
                        className={`${styles['excerpt']} unstyled`}>
                    {`${s.description}`}
                  </Link>
                </blockquote>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export const SeriesWithArticlesComponent: React.FunctionComponent<{ seriresWithArticles: SeriresWithArticles }> = ({ seriresWithArticles }) => {
  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['series']}>
        <div className={styles['description']}>
          { seriresWithArticles.description }
        </div>
        {seriresWithArticles.articles.map((article: Article, idx) => {
          return (
            <article className={styles['article']} key={idx}>
              <div className={styles['wrap']}>
                <a href={`${article.path}`}
                  target="_blank"
                  className='unstyled'>
                  <blockquote>
                    <p className={styles['header']}>
                      {`${article.title}`}
                    </p>
                    <p className={`${styles['excerpt']}`}>
                      {`${article.content}`}
                    </p>
                  </blockquote>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
