import { api } from '../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function getArchives(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/archives`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
