import Link from 'next/link';
import { Article } from '../types/article';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import buttonStyles from '../styles/components/button.module.scss';
import { convertUnixtimeToDate, toJaJpDottedDateString } from '../utils/time';

const ArticlesComponent: React.FunctionComponent<{ articles: Array<Article> }> = ({ articles }) => {
  return (
    <section className={`${containerStyles.container} ${styles['home-articles-group']}`}>
      {articles.map((article: Article, idx) => {
        return (
          <article className={styles['home-articles']} key={idx}>
            <div className={styles['home-articles-wrap']}>
              <div className={styles['home-articles-header']}>
                <time dateTime={`${article.publishedAt}`} className={styles['home-articles-time']}>
                  {`${toJaJpDottedDateString(convertUnixtimeToDate(article.publishedAt))}`}
                </time>
                <h2 className={styles['home-articles-title']}>
                  <Link
                    href={`${article.path}`}
                    prefetch={false}
                  >
                    <a className='unstyled'>{`${article.title}`}</a>
                  </Link>
                </h2>
              </div>
              <div className={styles['home-articles-excerpt']}>
                <Link
                  href={`${article.path}`}
                  prefetch={false}
                >
                  <a className='unstyled'>{`${article.content}`}</a>
                </Link>
                <div className={`${buttonStyles['continue-read-button-wrap']}`}>
                  <Link
                    href={`${article.path}`}
                    prefetch={false}
                  >
                    <a className={`'unstyled' ${buttonStyles['menu-button']} ${buttonStyles['continue-read-button']}`}>続きを読む</a>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default ArticlesComponent;
