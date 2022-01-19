import Error from 'next/error';
import HeadMetaComponent from '../components/headmeta';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import ArticlesComponent from '../components/articles';
import PaginationComponent from '../components/pagination';
import { getArticles } from './api/articles';
import { convertUnixtimeToDate } from '../utils/time';
import { Article, ArticleResponseWithCount } from '../types/article';
import { defaultRobotsMeta } from '../config';

const Home: React.FunctionComponent<{ statusCode: number, count: number, articles: Array<Article> }> = ({ statusCode, count, articles }) => {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }

  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
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

export default Home;
