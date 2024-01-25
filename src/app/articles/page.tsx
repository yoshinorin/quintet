'use server';

import { headers } from 'next/headers';
import { getArticles } from '../../api/articles';
import { Article, ArticleResponseWithCount } from '../../models/models';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await getArticles(1, 10, requestContextFrom(headers()));
  throwIfError(response);

  const articlesResponseWithCount: ArticleResponseWithCount = await response.json() as ArticleResponseWithCount;
  const articles: Array<Article> = articlesResponseWithCount.articles.map(article => {
    return {
      path: article.path,
      title: article.title,
      content: `${article.content} ...`,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt
    } as Article
  });

  return {
    props: {
      slug: 'articles',
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
