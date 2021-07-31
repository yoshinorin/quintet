import Error from 'next/error';
import HeadMeta from '../components/headmeta';
import CoverWithNavigation from '../components/cover/withNavigation';
import ArticlesComponent from '../components/articles';
import Pagination from '../components/pagination';
import { getArticles } from './api/articles';
import { convertUnixtimeToDate } from '../utils/time';
import { Article, ArticleResponseWithCount } from '../types/article';

export default function Home({ statusCode, count, articles}) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  return (
    <>
      <HeadMeta/>
      <CoverWithNavigation />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <Pagination
          basePath='articles'
          current={1}
          total={count}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArticles()
  ctx.res.statusCode = response.status;

  let articlesResponseWithCount: ArticleResponseWithCount = null;
  let articles: Array<Article> = [];
  if (response.status === 200) {
    articlesResponseWithCount = await response.json() as ArticleResponseWithCount;
    articles = articlesResponseWithCount.articles.map(article => {
      return {
        path: article.path,
        title: article.title,
        content: `${article.content} ...`,
        publishedAt: convertUnixtimeToDate(article.publishedAt).toLocaleString(),
        updatedAt: convertUnixtimeToDate(article.updatedAt).toLocaleString()
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
