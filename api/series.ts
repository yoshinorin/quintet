import { api } from '../config';
import { RequestContext } from '../models/requestContext';

export async function getSeries(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': rq.ipAddress,
        'user-agent': rq.ua,
        'referer': rq.referer
      }
    }
  )
}

export async function getSeriesBySeriesName(seriesName: string, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/series/${seriesName}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': rq.ipAddress,
        'user-agent': rq.ua,
        'referer': rq.referer
      }
    }
  )
}
