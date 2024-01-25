'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../../api/request';
import { Series, SeriesResponse } from '../../models/models';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { api } from '../../../config';

const API_URL = `${api.url}/series/`

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(API_URL, ctx);
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
      series: series
    }
  }
}
