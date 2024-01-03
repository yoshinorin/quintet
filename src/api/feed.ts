import { api } from '../../config';
import { RequestContext } from '../models/models';
import { generateRequestHeaderObject } from './utils/header';

export async function getFeed(rq: RequestContext): Promise<Response> {
  // TODO: get feed dynamically
  return fetch(
    `${api.url}/feeds/index`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
