import { api } from '../../config';

export async function getArticles(p: number = 1, l: number = 10, ip: string): Promise<Response> {
  return fetch(
    `${api.url}/articles/?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}

export async function getArticlesByTagName(tagName: string, p: number = 1, l: number = 10, ip: string): Promise<Response> {
  return fetch(
    `${api.url}/tags/${encodeURI(tagName)}?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip
      }
    }
  )
}
