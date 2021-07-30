import Error from 'next/error';
import HeadMeta from '../../components/headmeta';
import Cover from '../../components/cover';
import ArticlesComponent from '../../components/articles';
import Pagination from '../../components/pagination';
import { getArticles } from '../api/articles';
import { convertUnixtimeToDate } from '../../utils/time';
import { Article, ArticleResponseWithCount } from '../../types/article';

export default function Page({ statusCode, current, count, articles }) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  return (
    <>
      <HeadMeta />
      <Cover />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <Pagination
          basePath='articles'
          current={current}
          total={count}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArticles(ctx.params.number)
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
      current: ctx.params.number,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  }
}
