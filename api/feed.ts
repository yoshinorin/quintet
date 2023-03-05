import { api } from '../config';
import { RequestContext } from '../models/requestContext';

export async function getFeed(rq: RequestContext): Promise<Response> {
  // TODO: get feed dynamically
  return fetch(
    `${api.url}/feeds/index`,
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
