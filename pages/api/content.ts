import { api } from '../../config';

export async function findByPath(path: string): Promise<Response> {
  if (path.startsWith("/")) {
    path = path.substr(1, path.length)
  }
  // TODO
  if (path.startsWith("articles")) {
    path = path.substr(9, path.length)
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }
  return fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
