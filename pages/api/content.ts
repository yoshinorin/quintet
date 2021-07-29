import { api } from '../../config'

export async function findByPath(path: string): Promise<Response> {
  // TODO: move to util func and write tests code.
  if (path.startsWith("/")) {
    path = path.substr(1);
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
