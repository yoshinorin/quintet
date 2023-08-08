import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { getArticlesByTagName } from '../../api/articles';
import { Article, ArticleResponseWithCount } from '../../models/article';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../../utils/requestContext';
import PlanePage from '../../components/planePage';

export default function Page({ statusCode, tagName, currentPage, count, articles }) {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
  }

  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
      <CoverWithNavigationComponent
        contentCover={{
          title: "Tags",
          tags: null,
          publishedAt: null,
        }}
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
