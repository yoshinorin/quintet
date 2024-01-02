import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import SeriesComponent from '../../components/series';
import { Series } from '../../models/series';
import { defaultRobotsMeta } from '../../../config';
import PlanePage from '../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode: number,
  series: Array<Series>
}> = ({ statusCode, series }) => {
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
