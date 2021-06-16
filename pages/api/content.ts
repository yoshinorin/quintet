import { ContentResponse } from '../../types/content'
import { api } from '../../config'

export async function getContent(): Promise<Array<ContentResponse>> {
  const ContentResponse: Promise<Array<ContentResponse>> = await fetch(
    `${api.url}/contents/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((response) => response.json());
  // TODO: error handling
  return ContentResponse;
}
