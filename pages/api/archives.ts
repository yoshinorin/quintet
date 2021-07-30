import { api } from '../../config';

export async function getArchives(): Promise<Response> {
  return fetch(
    `${api.url}/archives`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
