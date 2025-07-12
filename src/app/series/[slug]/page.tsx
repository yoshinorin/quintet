"use server";

import { headers } from "next/headers";
import { fetchSeries } from "../../../api";
import {
  Article,
  SeriresWithArticles,
  SeriresWithArticlesResponse
} from "../../../models/models";
import { parseOrThrow, runWithHandleError } from "../../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleError(await fn(req));
}

async function handler(req: any) {
  const { slug } = await req.params;
  const response: Response = await fetchSeries(await headers(), slug);
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
