import { api } from '../../config';
import { RequestContext } from '../models/models';
import { isIgnoreRequest } from '../utils/filterRequests';
import { requestHeaderFrom } from './utils/header';

export async function findByPath(path: string, rq: RequestContext): Promise<Response> {

  if (!path || (path && isIgnoreRequest(path))) {
    return new Response(null, { "status" : 404 });
  }

  if (path.startsWith("/")) {
    path = path.substr(1, path.length)
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }

  return fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: requestHeaderFrom(rq) as any
    }
  )
}
