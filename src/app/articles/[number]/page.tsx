'use server';

import { headers } from 'next/headers';

import { getArticles } from '../../../api/articles';
import { Article, ArticleResponseWithCount } from '../../../models/models';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  const response: Response = await getArticles(req.params.number, 10, getRequestContext(headers()));
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

  if (articles.length < 1) {
    throw new Error('Not Found', { cause: 404 });
  }

  return {
    props: {
      current: req.params.number,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
