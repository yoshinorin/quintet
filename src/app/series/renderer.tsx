import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import SeriesComponent from '../../components/series';
import { Series } from '../../models/models';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  slug: string,
  series: Array<Series>
}> = ({ slug, series }) => {
  return (
    <>
      <HeadMetaComponent
        slug={slug}
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent
        contentCover={{
          title: "Series",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <SeriesComponent
          series={series}
        />
      </main>
    </>
  )
}
