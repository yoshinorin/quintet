import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import SeriesWithArticlesComponent from '../../../components/seriesWithArticles';
import { defaultRobotsMeta } from '../../../../config';

export const Renderer: React.FunctionComponent<{
  seriresWithArticles
}> = ({ seriresWithArticles }) => {
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
