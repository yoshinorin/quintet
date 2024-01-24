import Link from 'next/link';
import { Article } from '../models/models';
import { SimpleArticlesComponent } from '../components/simpleArticles';
import styles from '../styles/home.module.scss';
import flexStyles from '../styles/components/flex.module.scss';

export const RecentArticlesComponent: React.FunctionComponent<{ articles: Array<Article> }> = ({ articles }) => {
  return <>
    <div className={flexStyles['flex-row']}>
      <div className={flexStyles['col-35']}>
        <span className={styles['cat-title']}>
          {
            (() => {
              return(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9"/>
                </svg>
              )
            })()
          }
          &nbsp;
          Recent articles:
        </span>
      </div>
      <div className={flexStyles['col-65']}>
        <SimpleArticlesComponent
            articles={articles}
          />
      </div>
    </div>
    <div className={`${flexStyles['flex-right']} ${styles['external-link']}`}>
      <Link
        href={`/articles`}
        prefetch={false}
        className={`unstyled ${styles['read-more']}`}>
          Read more →
      </Link>
    </div>
  </>;
}
