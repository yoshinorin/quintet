// TODO: refactor
import Error from 'next/error';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import SeriesWithArticlesComponent from '../../components/seriesWithArticles';
import { getSeriesBySeriesName } from '../../api/series';
import { SeriresWithArticlesResponse, SeriresWithArticles } from '../../models/series';
import { Article } from '../../models/article';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../../utils/requestContext';

export default function Page({ statusCode, seriresWithArticles }) {
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
        contentCover={{
          title: seriresWithArticles.title,
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <SeriesWithArticlesComponent
           seriresWithArticles={seriresWithArticles}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const seriesName = ctx.query.slug[0];
  const response: Response = await getSeriesBySeriesName(seriesName, getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  let seriresWithArticlesResponse: SeriresWithArticlesResponse = null;
  let seriresWithArticles: SeriresWithArticles = null;
  if (response.status === 200) {
    seriresWithArticlesResponse = await response.json() as SeriresWithArticlesResponse;
    seriresWithArticles = {
      id: seriresWithArticlesResponse.id,
      name: seriresWithArticlesResponse.name,
      title: seriresWithArticlesResponse.title,
      description: seriresWithArticlesResponse.description,
      articles: seriresWithArticlesResponse.articles.map(article => {
        return {
          path: article.path,
          title: article.title,
          content: `${article.content} ...`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt
        } as Article
      })
    };
  }

  return {
    props: {
      statusCode: response.status,
      seriresWithArticles: seriresWithArticles
    }
  }
}
