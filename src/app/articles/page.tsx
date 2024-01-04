'use server';

import { getArticles } from '../../api/articles';
import { Article, ArticleResponseWithCount } from '../../models/models';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  const response: Response = await getArticles(1, 10, getRequestContext());
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
      slug: req.params.slug.join('/'),
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
