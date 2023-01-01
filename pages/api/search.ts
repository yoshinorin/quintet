import { api } from '../../config';
import { RequestContext } from '../../types/requestContext';

export async function search(rq: RequestContext, query: Array<string>): Promise<Response> {
  const qs = query.map(q => `q=${q}`)
  return fetch(
    `${api.url}/search?${qs.join('&')}`,
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
