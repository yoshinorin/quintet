// TODO: refactor
import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import SeriesWithArticlesComponent from '../../../components/seriesWithArticles';
import { defaultRobotsMeta } from '../../../../config';
import PlanePage from '../../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode,
  seriresWithArticles
}> = ({ statusCode, seriresWithArticles }) => {
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
        contentCover={{
          title: seriresWithArticles.title,
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <SeriesWithArticlesComponent
           seriresWithArticles={seriresWithArticles}
        />
      </main>
    </>
  )
}
