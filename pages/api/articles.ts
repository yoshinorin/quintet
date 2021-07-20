import { ArticleResponse } from '../../types/article'
import { api } from '../../config'

export async function getArticles(): Promise<Array<ArticleResponse>> {
  const articlesResponse: Promise<Array<ArticleResponse>> = await fetch(
    `${api.url}/articles/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((response) => response.json());
  // TODO: error handling
  return articlesResponse;
}
