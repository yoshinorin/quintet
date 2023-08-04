import { NextApiRequest } from 'next';
import { api } from '../config';
import { isIgnoreRequest } from '../utils/filterRequests';
import { getRequestContext } from '../utils/requestContext';
import { generateRequestHeaderObject } from './header';

export async function findByPath(req: NextApiRequest, path: string): Promise<Response> {

  if (!path || (path && isIgnoreRequest(path))) {
    return new Response(null, { "status" : 404 });
  }

  if (path.startsWith("/")) {
    path = path.substr(1, path.length)
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }

  const rq = getRequestContext(req);

  return fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
