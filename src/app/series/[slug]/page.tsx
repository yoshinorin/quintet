"use server";

import { headers } from "next/headers";
import { api } from "../../../../config";
import { fetchFromApi } from "../../../api/request";
import {
  Article,
  SeriresWithArticles,
  SeriresWithArticlesResponse
} from "../../../models/models";
import { requestContextFrom } from "../../../utils/requestContext";
import { buildUrl, sluggize } from "../../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../../handler";
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
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "series", seriesName]), false);
  const response: Response = await fetchFromApi(url, null, ctx);
  throwIfError(response);

  const seriresWithArticlesResponse: SeriresWithArticlesResponse =
    (await response.json()) as SeriresWithArticlesResponse;
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
