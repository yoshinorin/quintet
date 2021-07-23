import { ContentResponse } from '../../types/content'
import { api } from '../../config'

export async function findByPath(path: string): Promise<ContentResponse> {
  // TODO: move to util func and write tests code.
  if (path.startsWith("/")) {
    path = path.substr(1);
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }
  const contentResponse: Promise<ContentResponse> = await fetch(
    `${api.url}/contents/${path}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  .then((response) => {
    return response.json()
  })
  .catch((error) => {
    // TODO: error handling
    console.log(error)
  });

  return contentResponse;
}
