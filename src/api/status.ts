import { api } from '../../config';
import { RequestContext } from '../models/models';
import { generateRequestHeaderObject } from './utils/header';

export async function getStatus(rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/system/health`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
