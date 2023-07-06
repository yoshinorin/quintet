import { api } from '../config';
import { RequestContext } from '../models/requestContext';

export async function getStatus(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/status`,
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
