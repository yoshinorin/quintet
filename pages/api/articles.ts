import { ArticleResponseWithCount } from '../../types/article'
import { api } from '../../config'

export async function getArticles(): Promise<ArticleResponseWithCount> {
  const articlesResponseWithCount: Promise<ArticleResponseWithCount> = await fetch(
    `${api.url}/articles/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((response) => response.json());
  // TODO: error handling
  return articlesResponseWithCount;
}
