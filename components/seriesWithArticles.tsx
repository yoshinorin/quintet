import Link from 'next/link';
import { SeriresWithArticles } from '../models/series';
import { Article } from '../models/article';
import styles from '../styles/series.module.scss';
import containerStyles from '../styles/components/container.module.scss';

const SeriesWithArticlesComponent: React.FunctionComponent<{ seriresWithArticles: SeriresWithArticles }> = ({ seriresWithArticles }) => {
  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['series']}>
        <div className={styles['description']}>
          { seriresWithArticles.description }
        </div>
        {seriresWithArticles.articles.map((article: Article, idx) => {
          return (
            <article className={styles['articles']} key={idx}>
              <div className={styles['wrap']}>
                <blockquote>
                  <p className={styles['header']}>
                    <Link href={`${article.path}`} target="_blank" prefetch={false} className='unstyled'>
                      {`${article.title}`}
                    </Link>
                  </p>
                  <Link href={`${article.path}`} target="_blank" prefetch={false} className={`${styles['excerpt']} unstyled`}>
                    {`${article.content}`}
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

export default SeriesWithArticlesComponent;
