'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../api/request';
import { Article, ArticleResponseWithCount } from '../models/models';
import { requestContextFrom } from '../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "./handler";
import { api } from '../../config';

const API_URL = `${api.url}/articles/`

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(API_URL, ctx, {
    interceptIfContainsIgnorePaths: false,
    queryParams: null,
    pagenation: {
      page: 1,
      limit: 5
    }
  });
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
      articles: articles
    }
  }
}
