'use server';

import { getSeries } from '../../api/series';
import { Series, SeriesResponse } from '../../models/series';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  const response: Response = await getSeries(getRequestContext(req))
  // ctx.res.statusCode = response.status;

  let series: Array<Series> = [];
  if (response.status === 200) {
    let seriesResponse: Array<SeriesResponse> = await response.json() as Array<SeriesResponse>;
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
