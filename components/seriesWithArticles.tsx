import Link from 'next/link';
import { SeriresWithArticles } from '../models/series';
import { Article } from '../models/article';
import styles from '../styles/series.module.scss';
import containerStyles from '../styles/components/container.module.scss';

const SeriesWithArticlesComponent: React.FunctionComponent<{ seriresWithArticles: SeriresWithArticles }> = ({ seriresWithArticles }) => {
  return (
    <section className={`${containerStyles.container} ${styles['group']}`}>
      <div id={styles['series']}>
        <div className={styles['description']}>
          { seriresWithArticles.description }
        </div>
        {seriresWithArticles.articles.map((article: Article, idx) => {
          return (
            <article className={styles['articles']} key={idx}>
              <div className={styles['wrap']}>
                <blockquote>
                  <div className={styles['header']}>
                    <h2 className={styles['title']}>
                      <Link href={`${article.path}`} prefetch={false} className='unstyled'>
                        {`${article.title}`}
                      </Link>
                    </h2>
                  </div>
                  <div className={styles['excerpt']}>
                    <Link href={`${article.path}`} prefetch={false} className='unstyled'>
                      {`${article.content}`}
                    </Link>
                  </div>
                </blockquote>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SeriesWithArticlesComponent;
