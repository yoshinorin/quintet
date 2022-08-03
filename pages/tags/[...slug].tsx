// TODO: refactor
import Error from 'next/error';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { getArticlesByTagName } from '../api/articles';
import { Article, ArticleResponseWithCount } from '../../types/article';
import { ContentCover } from '../../types/content';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../../utils/requestContext';

export default function Page({ statusCode, tagName, currentPage, count, articles }) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  const contentCover = {
    title: "Tags",
    tags: null,
    publishedAt: null,
  } as ContentCover;

  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent
        contentCover={contentCover}
      />
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
  const response: Response = await getArticlesByTagName(tagName, currentPage, 10, getRequestContext(ctx.req))
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
