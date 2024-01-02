'use server';

import { getArticlesByTagName } from '../../../api/articles';
import { Article, ArticleResponseWithCount } from '../../../models/article';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(ctx: any) {
  const { props } = await get(ctx);
  return <Renderer {...props} />;
}

async function get(ctx: any) {
  const tagName = decodeURI(ctx.params.slug[0]);
  const currentPage = ctx.params.slug[1] ? ctx.params.slug[1] : 1;
  const response: Response = await getArticlesByTagName(tagName, currentPage, 10, getRequestContext(ctx));
  // ctx.res.statusCode = response.status;

  let articlesResponseWithCount: ArticleResponseWithCount = null;
  let articles: Array<Article> = [];
  if (response.status === 200) {
    articlesResponseWithCount = await response.json() as ArticleResponseWithCount;
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

  // TODO: maybe can improve...
  if (articles.length < 1) {
    return {
      props: {
        statusCode: 404,
        tagName: tagName,
        currentPage: 1,
        count: 0,
        articles: articles
      }
    }
  }

  return {
    props: {
      statusCode: response.status,
      tagName: tagName,
      currentPage: currentPage,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
