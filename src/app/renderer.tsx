import { Article } from '../models/article';
import HeadMetaComponent from '../components/headmeta';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import RecentArticlesComponent from '../components/recentArticles';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import { defaultRobotsMeta } from '../../config';
import PlanePage from '../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode: number,
  articles: Array<Article>
}> = ({ statusCode, articles }) => {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
  }

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
