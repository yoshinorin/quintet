import { Article } from '../models/article';
import HeadMetaComponent from '../components/headmeta';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import RecentArticlesComponent from '../components/recentArticles';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import { defaultRobotsMeta } from '../../config';

export const Renderer: React.FunctionComponent<{
  articles: Array<Article>
}> = ({ articles }) => {

  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
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
