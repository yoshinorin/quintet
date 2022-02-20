import { api } from '../../config';

export async function getArchives(ip: string): Promise<Response> {
  return fetch(
    `${api.url}/archives`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
