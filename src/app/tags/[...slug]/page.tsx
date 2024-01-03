'use server';

import { getArticlesByTagName } from '../../../api/articles';
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

async function get(ctx: any) {
  const tagName = decodeURI(ctx.params.slug[0]);
  const currentPage = ctx.params.slug[1] ? ctx.params.slug[1] : 1;
  const response: Response = await getArticlesByTagName(tagName, currentPage, 10, getRequestContext(ctx));
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
