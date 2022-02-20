import { api } from '../../config';

export async function getTags(ip: string): Promise<Response> {
  return fetch(
    `${api.url}/tags/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
