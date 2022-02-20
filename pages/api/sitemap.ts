import { api } from '../../config';

export async function getSitemap(ip: string): Promise<Response> {
  return fetch(
    `${api.url}/sitemaps/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
