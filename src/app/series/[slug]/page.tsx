"use server";

import { headers } from "next/headers";
import { fetchSeries } from "../../../api";
import {
  Article,
  SeriresWithArticles,
  SeriresWithArticlesResponse
} from "../../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}
async function handler(req: any) {
  const seriesName = req.params.slug;
  const response: Response = await fetchSeries(headers(), seriesName);
  const seriresWithArticlesResponse =
    await parseOrThrow<SeriresWithArticlesResponse>(response);
  const seriresWithArticles: SeriresWithArticles = {
    id: seriresWithArticlesResponse.id,
    name: seriresWithArticlesResponse.name,
    title: seriresWithArticlesResponse.title,
    description: seriresWithArticlesResponse.description,
    articles: seriresWithArticlesResponse.articles.map((article) => {
      return {
        path: article.path,
        title: article.title,
        content: `${article.content} ...`,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt
      } as Article;
    })
  };

  return {
    props: {
      seriresWithArticles: seriresWithArticles
    }
  };
}
