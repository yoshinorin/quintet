import Error from 'next/error';
import useSWR from 'swr';
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
import { extractIp } from '../utils/ip';
import { fetcher } from './api/fetcher';
import { Commit } from '../types/commit';

const GITHUB_COMMIT_URL = `${viewOnGithub.apiUrl}?per_page=5`

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

  const { data, error } = useSWR(GITHUB_COMMIT_URL, fetcher, {
    fallbackData: commits,
    refreshInterval: 3600000
  });

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
              if(enableGitHubCommits && !error) {
                return(
                  <>
                    <hr></hr>
                    <RecentCommitsComponent
                      commits={data.map(commit => {
                        return {
                          sha: commit['sha'],
                          url: commit['html_url'],
                          message: commit['commit']['message']
                        } as Commit
                      })}
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
  const response: Response = await getArticles(1, 5, extractIp(ctx.req))
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
      commits = await fetcher(GITHUB_COMMIT_URL);
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
