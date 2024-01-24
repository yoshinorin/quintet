import { api } from '../../config';
import { isIgnoreRequest } from '../utils/filterRequests';
import { getRequestContext } from '../utils/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function findByPath(path: string): Promise<Response> {

  if (!path || (path && isIgnoreRequest(path))) {
    return new Response(null, { "status" : 404 });
  }

  if (path.startsWith("/")) {
    path = path.substr(1, path.length)
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }

  const rq = getRequestContext();

  return fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
