import { api } from '../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function getSitemap(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/sitemaps/`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
