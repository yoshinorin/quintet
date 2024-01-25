import { api } from '../../config';
import { RequestContext } from '../models/models';
import { requestHeaderFrom } from './utils/header';

export async function getSitemap(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/sitemaps/`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: requestHeaderFrom(rq) as any
    }
  )
}
