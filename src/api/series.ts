import { api } from '../../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function getSeries(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series/`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}

export async function getSeriesBySeriesName(seriesName: string, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series/${seriesName}`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
