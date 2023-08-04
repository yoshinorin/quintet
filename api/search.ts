import { api } from '../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './header';

export async function search(rq: RequestContext, query: Array<string>): Promise<Response> {
  const qs = query.map(q => `q=${q}`)
  return fetch(
    `${api.url}/search?${qs.join('&')}`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
