'use server';

import { notFound } from 'next/navigation';

import { getArticlesByTagName } from '../../../api/articles';
import { Article, ArticleResponseWithCount } from '../../../models/article';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  try {
    const { props } = await get(req);
    return <Renderer {...props} />;
  } catch(e) {
    // @ts-ignore
    if (e.cause === 404) {
      return notFound();
    }
    // FIXME: I don't want to re-throw
    // @ts-ignore
    throw new Error(response.statusText, { cause: response.status });
  }
}

async function get(ctx: any) {
  const tagName = decodeURI(ctx.params.slug[0]);
  const currentPage = ctx.params.slug[1] ? ctx.params.slug[1] : 1;
  const response: Response = await getArticlesByTagName(tagName, currentPage, 10, getRequestContext(ctx));

  if (response.status !== 200) {
    // TODO: use custom Error class
    throw new Error(response.statusText, { cause: response.status });
  }

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
