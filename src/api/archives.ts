import { api } from '../../config';
import { RequestContext } from '../models/models';
import { requestHeaderFrom } from './utils/header';

export async function getArchives(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/archives/`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: requestHeaderFrom(rq) as any
    }
  )
}
