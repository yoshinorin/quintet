'use server';

import { getSeriesBySeriesName } from '../../../api/series';
import {
  Article,
  SeriresWithArticlesResponse,
  SeriresWithArticles
} from '../../../models/models';
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
async function get(req: any) {
  const seriesName = req.params.slug;
  const response: Response = await getSeriesBySeriesName(seriesName, getRequestContext());
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
      slug: req.params.slug,
      seriresWithArticles: seriresWithArticles
    }
  }
}
