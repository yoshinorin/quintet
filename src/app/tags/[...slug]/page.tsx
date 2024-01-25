'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../../../api/request';
import { Article, ArticleResponseWithCount } from '../../../models/models';
import { requestContextFrom } from '../../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../../handler";
import { api } from '../../../../config';

const API_BASE_URL = `${api.url}/tags`;

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const tagName = decodeURI(req.params.slug[0]);
  const currentPage = req.params.slug[1] ? req.params.slug[1] : 1;

  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(
    `${API_BASE_URL}/${encodeURI(tagName)}`,
    ctx,
    {
      interceptIfContainsIgnorePaths: false,
      queryParams: null,
      pagenation: {
        page: currentPage,
        limit: 10
      }
    }
  );
  throwIfError(response);

  const articlesResponseWithCount: ArticleResponseWithCount = await response.json();
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
      tagName: tagName,
      currentPage: currentPage,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
