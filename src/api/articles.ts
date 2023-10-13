import { api } from '../../config';
import { RequestContext } from '../models/requestContext';
import { generateRequestHeaderObject } from './utils/header';

export async function getArticles(p: number = 1, l: number = 10, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/articles/?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}

export async function getArticlesByTagName(tagName: string, p: number = 1, l: number = 10, rq: RequestContext): Promise<Response> {
  return fetch(
    `${api.url}/tags/${encodeURI(tagName)}?page=${p}&limit=${l}`,
    {
      method: 'GET',
      headers: generateRequestHeaderObject(rq) as any
    }
  )
}
