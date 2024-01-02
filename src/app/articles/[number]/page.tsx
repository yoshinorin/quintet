import { headers } from 'next/headers';

import { getArticles } from '../../../api/articles';
import { Article, ArticleResponseWithCount } from '../../../models/article';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

export async function get(req: any) {
  const response: Response = await getArticles(req.params.number, 10, getRequestContext(headers()));
  //ctx.res.statusCode = response.status;

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
  // TODO: use `new Response(<any>)`
  if (articles.length < 1) {
    return {
      props: {
        statusCode: 404,
        current: req.params.number,
        count: 0,
        articles: articles
      }
    }
  }

  return {
    props: {
      statusCode: response.status,
      current: req.params.number,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
