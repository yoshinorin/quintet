import Link from 'next/link';
import { Article } from '../types/article';
import styles from '../styles/simpleArticles.module.scss';
import { convertUnixtimeToDate, toJaJpDottedDateString } from '../utils/time';

const SimpleArticlesComponent: React.FunctionComponent<{ articles: Array<Article> }> = ({ articles }) => {
  return (
    <section className={styles['articles-wrap']}>
      {articles.map((article: Article, idx) => {
        return (
          <article className={styles['articles']} key={idx}>
            <div className={styles['wrap']}>
              <div className={styles['title']}>
                <time dateTime={`${article.publishedAt}`} className={styles['time']}>
                  {`${toJaJpDottedDateString(convertUnixtimeToDate(article.publishedAt))}`} - &nbsp;
                </time>
                <Link href={`${article.path}`} prefetch={false} className='unstyled'>
                  {`${article.title}`}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default SimpleArticlesComponent;
