'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../../api/request';
import { Article, ArticleResponseWithCount } from '../../models/models';
import { requestContextFrom } from '../../utils/requestContext';
import { buildQueryParams, buildUrl } from '../../utils/url';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { api } from '../../../config';

const API_URL = `${api.url}/articles/`

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const currentPage = req.searchParams['p'] ? req.searchParams['p'] : 1;
  const ctx = requestContextFrom(headers());
  const url = buildUrl(api.url, 'articles', true);
  const queryParams = buildQueryParams(null, { page: currentPage, limit: 10 });
  const response: Response = await fetchFromApi(url, queryParams, ctx, null);
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
      count: articlesResponseWithCount.count,
      currentPage: currentPage,
      articles: articles
    }
  }
}
