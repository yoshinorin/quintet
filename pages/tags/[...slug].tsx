// TODO: refactor
import Error from 'next/error';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { getArticlesByTagName } from '../api/articles';
import { convertUnixtimeToDate } from '../../utils/time';
import { Article, ArticleResponseWithCount } from '../../types/article';
import { defaultRobotsMeta } from '../../config';

export default function Page({ statusCode, tagName, currentPage, count, articles }) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath={`tags/${tagName}`}
          current={currentPage}
          total={count}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const tagName = ctx.query.slug[0];
  const currentPage = ctx.query.slug[1] ? ctx.query.slug[1] : 1;
  const response: Response = await getArticlesByTagName(tagName, currentPage)
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
