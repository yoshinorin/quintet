import { ArticleResponseWithCount } from '../../types/article'
import { api } from '../../config'

export async function getArticles(p: number = 1, l: number = 10): Promise<ArticleResponseWithCount> {
  const articlesResponseWithCount: Promise<ArticleResponseWithCount> = await fetch(
    `${api.url}/articles/?page=${p}&limit=${l}`,
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
