'use server';

// TODO: refactor
import { getSeriesBySeriesName } from '../../../api/series';
import { SeriresWithArticlesResponse, SeriresWithArticles } from '../../../models/series';
import { Article } from '../../../models/article';
import { getRequestContext } from '../../../utils/requestContext';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}
async function get(ctx: any) {
  const seriesName = ctx.params.slug;
  const response: Response = await getSeriesBySeriesName(seriesName, getRequestContext(ctx));
  throwIfError(response);

  const seriresWithArticlesResponse: SeriresWithArticlesResponse = await response.json() as SeriresWithArticlesResponse;
  const seriresWithArticles: SeriresWithArticles = {
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
  }

  return {
    props: {
      seriresWithArticles: seriresWithArticles
    }
  }
}
