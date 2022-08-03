import Error from 'next/error';
import HeadMetaComponent from '../components/headmeta';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import RecentArticlesComponent from '../components/recentArticles';
import RecentCommitsComponent from '../components/recentCommits';
import styles from '../styles/home.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import { getArticles } from './api/articles';
import { Article, ArticleResponseWithCount } from '../types/article';
import {
  viewOnGithub,
  defaultRobotsMeta
} from '../config';
import { getRequestContext } from '../utils/requestContext';
import { getCommit } from './api/commit';
import { Commit } from '../types/commit';

const Home: React.FunctionComponent<{
  statusCode: number,
  count: number,
  articles: Array<Article>,
  enableGitHubCommits: boolean,
  commits: Array<Commit> | undefined
}> = ({ statusCode, articles, enableGitHubCommits, commits }) => {
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
        <div className={`${containerStyles.container} ${styles.wrap}`} >
          <RecentArticlesComponent
            articles={articles}
          />
          {
            (() => {
              if(enableGitHubCommits) {
                return(
                  <>
                    <hr></hr>
                    <RecentCommitsComponent
                      commits={commits}
                    />
                  </>
                )
              }
            })()
          }
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

  let enableGitHubCommits = false;
  let commits = [];
  if (viewOnGithub.enable) {
    try {
      // TOOD: impl cache or request to github with access token
      const response: Response = await getCommit();
      if (response.status === 200) {
        const responseJson = await response.json();
        commits = responseJson.map(commit => {
          return {
            sha: commit['sha'],
            url: commit['html_url'],
            message: commit['commit']['message']
          } as Commit
        });
        enableGitHubCommits = true;
      }
    } catch {
      // Nothing to do
    } finally {
      enableGitHubCommits = commits.length > 0;
    }
  }

  return {
    props: {
      statusCode: response.status,
      articles: articles,
      enableGitHubCommits,
      commits
    }
  }
}

export default Home;
