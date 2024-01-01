import { headers } from 'next/headers'

import Renderer from './renderer';
import { getArticles } from '../api/articles';
import { Article, ArticleResponseWithCount } from '../models/article';
import { getRequestContext } from '../utils/requestContext';

export default async function Page() {
  const { props } = await get();
  return <Renderer {...props} />;
}

// export async function get(ctx: any) {
  export async function get() {
  const response: Response = await getArticles(1, 5, getRequestContext(headers()));
  // ctx.res.statusCode = response.status;

  let articles: Array<Article> = [];
  if (response.status === 200) {
    let articlesResponseWithCount: ArticleResponseWithCount = await response.json() as ArticleResponseWithCount;
    articles = articlesResponseWithCount.articles.map(article => {
      return {
        path: article.path,
        title: article.title,
        content: `${article.content} ...`,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt
      } as Article
    });
  }

  return {
    props: {
      statusCode: response.status,
      articles: articles
    }
  }
}
