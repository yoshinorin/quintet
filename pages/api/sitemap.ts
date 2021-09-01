import { api } from '../../config';

export async function getSitemap(): Promise<Response> {
  return fetch(
    `${api.url}/sitemaps/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
