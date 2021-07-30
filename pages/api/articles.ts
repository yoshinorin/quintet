import { api } from '../../config';

export async function getArticles(p: number = 1, l: number = 10): Promise<Response> {
  return fetch(
    `${api.url}/articles/?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
}
