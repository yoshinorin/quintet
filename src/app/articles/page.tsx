"use server";

import { headers } from "next/headers";
import { api } from "../../../config";
import { fetchFromApi } from "../../api/request";
import { Article, ArticleResponseWithCount } from "../../models/models";
import { requestContextFrom } from "../../utils/requestContext";
import { buildQueryParams, buildUrl } from "../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const currentPage = req.searchParams["p"] ? req.searchParams["p"] : 1;
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, "v1/articles", true);
  const queryParams = buildQueryParams({
    pagination: { page: currentPage, limit: 10 }
  });
  const response: Response = await fetchFromApi(url, queryParams, ctx, null);
  throwIfError(response);

  const articlesResponseWithCount: ArticleResponseWithCount =
    (await response.json()) as ArticleResponseWithCount;
  const articles: Array<Article> = articlesResponseWithCount.articles.map(
    (article) => {
      return {
        path: article.path,
        title: article.title,
        content: `${article.content} ...`,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt
      } as Article;
    }
  );

  return {
    props: {
      count: articlesResponseWithCount.count,
      currentPage: currentPage,
      articles: articles
    }
  };
}
