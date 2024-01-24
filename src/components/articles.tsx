import Link from 'next/link';
import { Article } from '../models/models';
import styles from '../styles/articles.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import buttonStyles from '../styles/components/button.module.scss';
import { convertUnixtimeToDate, toJaJpDottedDateString } from '../utils/time';

export const ArticlesComponent: React.FunctionComponent<{ articles: Array<Article> }> = ({ articles }) => {
  return (
    <section className={`${containerStyles.container} ${styles['group']}`}>
      {articles.map((article: Article, idx) => {
        return (
          <article className={styles['article']} key={idx}>
            <div className={styles['wrap']}>
              <time dateTime={`${article.publishedAt}`} className={`${styles['time']}`}>
                {`${toJaJpDottedDateString(convertUnixtimeToDate(article.publishedAt))}`}
              </time>
              <Link href={`${article.path}`} prefetch={false} className='unstyled' >
                <h2 className={`${styles['header']} ${styles['title']}`}>
                  {`${article.title}`}
                </h2>
                <p className={styles['excerpt']}>
                  {`${article.content}`}
                </p>
                <div className={`${buttonStyles['continue-read-button-wrap']}`}>
                  <div className={`'unstyled' ${buttonStyles['menu-button']} ${buttonStyles['continue-read-button']}`}>
                    続きを読む
                  </div>
                </div>
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
