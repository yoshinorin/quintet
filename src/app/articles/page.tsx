import { headers } from 'next/headers'

// TODO: refactor
import { getArticles } from '../../api/articles';
import { Article, ArticleResponseWithCount } from '../../models/article';
import { getRequestContext } from '../../utils/requestContext';
import Renderer from './renderer';

export default async function Page() {
  const { props } = await get();
  return <Renderer {...props} />;
}

export async function get() {
  const response: Response = await getArticles(1, 10, getRequestContext(headers()));

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

  return {
    props: {
      statusCode: response.status,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
