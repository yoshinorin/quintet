import { NextApiRequest } from 'next';
import { api } from '../../config';
import { isIgnoreRequest } from '../../utils/filterRequests';
import { extractIp } from '../../utils/ip';

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

  const ip = extractIp(req);

  return fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
