import Error from 'next/error';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { getArticles } from '../api/articles';
import { Article, ArticleResponseWithCount } from '../../types/article';
import { extractIp } from '../../utils/ip';

const Page: React.FunctionComponent<{ statusCode: number, current: number, count: number, articles: Array<Article> }> = ({ statusCode, current, count, articles }) => {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }

  return (
    <>
      <HeadMetaComponent />
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath='articles'
          current={current}
          total={count}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArticles(ctx.params.number, 10, extractIp(ctx.req))
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
        current: ctx.params.number,
        count: 0,
        articles: articles
      }
    }
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

export default Page;
