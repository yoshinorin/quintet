import { api } from '../../config';
import { RequestContext } from '../models/models';
import { generateRequestHeaderObject } from './utils/header';

export async function getArchives(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/archives/`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
