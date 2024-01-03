import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import SeriesComponent from '../../components/series';
import { Series } from '../../models/series';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  series: Array<Series>
}> = ({ series }) => {
  return (
    <>
      <HeadMetaComponent
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
