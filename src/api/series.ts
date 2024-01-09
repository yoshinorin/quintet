import { api } from '../../config';
import { RequestContext } from '../models/models';
import { generateRequestHeaderObject } from './utils/header';

export async function getSeries(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series/`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}

export async function getSeriesBySeriesName(seriesName: string, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series/${seriesName}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
