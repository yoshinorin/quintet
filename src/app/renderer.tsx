import { Article } from '../models/models';
import { CoverWithNavigationComponent, RecentArticlesComponent } from '../components/components';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';

export const Renderer: React.FunctionComponent<{
  articles: Array<Article>
}> = ({ articles }) => {

  return (
    <>
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <div className={`${containerStyles.container} ${styles.wrap}`} >
          <RecentArticlesComponent
            articles={articles}
          />
        </div>
      </main>
    </>
  )
}
