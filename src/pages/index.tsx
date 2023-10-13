import HeadMetaComponent from '../components/headmeta';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import RecentArticlesComponent from '../components/recentArticles';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import { getArticles } from '../api/articles';
import { Article, ArticleResponseWithCount } from '../models/article';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../utils/requestContext';
import PlanePage from '../components/planePage';

const Home: React.FunctionComponent<{
  statusCode: number,
  count: number,
  articles: Array<Article>
}> = ({ statusCode, articles }) => {
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
        contentCover={null}
      />
      <main>
        <div className={`${containerStyles.container} ${styles.wrap}`} >
          <RecentArticlesComponent
            articles={articles}
          />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArticles(1, 5, getRequestContext(ctx.req))
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

  return {
    props: {
      statusCode: response.status,
      articles: articles
    }
  }
}

export default Home;
