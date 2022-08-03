import { api } from '../../config';
import { RequestContext } from '../../types/requestContext';

export async function getTags(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/tags/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': rq.ipAddress,
        'user-agent': rq.ua,
        'referer': rq.referrer
      }
    }
  )
}
