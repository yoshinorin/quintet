import { api } from '../../config';

export async function getTags(): Promise<Response> {
  return fetch(
    `${api.url}/tags/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
