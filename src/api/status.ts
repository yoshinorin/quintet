import { api } from '../../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function getStatus(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/system/health`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
