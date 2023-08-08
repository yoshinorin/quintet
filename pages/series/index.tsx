import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import SeriesComponent from '../../components/series';
import { getSeries } from '../../api/series';
import { Series, SeriesResponse } from '../../models/series';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../../utils/requestContext';
import PlanePage from '../../components/planePage';

const Page: React.FunctionComponent<{ statusCode: number, series: Array<Series> }> = ({ statusCode, series }) => {
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

export async function getServerSideProps(ctx: any) {
  const response: Response = await getSeries(getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  let seriesResponse: Array<SeriesResponse> = null;
  let series: Array<Series> = [];
  if (response.status === 200) {
    seriesResponse = await response.json() as Array<SeriesResponse>;
    series = seriesResponse.map(series => {
      return {
        id: series.id,
        name: series.name,
        title: series.title,
        description: series.description
      } as Series
    });
  }

  return {
    props: {
      statusCode: response.status,
      series: series
    }
  }
}

export default Page;
