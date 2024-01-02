// TODO: refactor
import { getSeriesBySeriesName } from '../../../api/series';
import { SeriresWithArticlesResponse, SeriresWithArticles } from '../../../models/series';
import { Article } from '../../../models/article';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(ctx: any) {
  const { props } = await get(ctx);
  return <Renderer {...props} />;
}

export async function get(ctx: any) {
  const seriesName = ctx.params.slug;
  const response: Response = await getSeriesBySeriesName(seriesName, getRequestContext(ctx));
  // ctx.res.statusCode = response.status;

  let seriresWithArticles: SeriresWithArticles = null;
  if (response.status === 200) {
    let seriresWithArticlesResponse: SeriresWithArticlesResponse = await response.json() as SeriresWithArticlesResponse;
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
