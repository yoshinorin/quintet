'use server';

import { getSeries } from '../../api/series';
import { Series, SeriesResponse } from '../../models/models';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}


async function get(req: any) {
  const response: Response = await getSeries(getRequestContext())
  throwIfError(response);

  const seriesResponse: Array<SeriesResponse> = await response.json() as Array<SeriesResponse>;
  const series: Array<Series> = seriesResponse.map(series => {
    return {
      id: series.id,
      name: series.name,
      title: series.title,
      description: series.description
    } as Series
  });

  return {
    props: {
      slug: req.params.slug,
      series: series
    }
  }
}
