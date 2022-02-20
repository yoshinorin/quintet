import { api } from '../../config';

export async function getFeed(ip: string): Promise<Response> {
  // TODO: get feed dynamically
  return fetch(
    `${api.url}/feeds/index`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
