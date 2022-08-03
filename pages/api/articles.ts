import { api } from '../../config';
import { RequestContext } from '../../types/requestContext';

export async function getArticles(p: number = 1, l: number = 10, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/articles/?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': rq.ipAddress,
        'user-agent': rq.ua,
        'referer': rq.referer
      }
    }
  )
}

export async function getArticlesByTagName(tagName: string, p: number = 1, l: number = 10, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/tags/${encodeURI(tagName)}?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': rq.ipAddress,
        'user-agent': rq.ua,
        'referer': rq.referer
      }
    }
  )
}
