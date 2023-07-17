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
                <Link href={`${article.path}`} target="_blank" prefetch={false} className='unstyled'>
                  <blockquote>
                    <p className={styles['header']}>
                      {`${article.title}`}
                    </p>
                    <p className={`${styles['excerpt']}`}>
                      {`${article.content}`}
                    </p>
                  </blockquote>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SeriesWithArticlesComponent;
