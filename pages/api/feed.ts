import { api } from '../../config';

export async function getFeed(): Promise<Response> {
  // TODO: get feed dynamically
  return fetch(
    `${api.url}/feeds/index`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
