"use server";

import { headers } from "next/headers";
import { fetchFromApi } from "../../../api/request";
import { Article, ArticleResponseWithCount } from "../../../models/models";
import { requestContextFrom } from "../../../utils/requestContext";
import { Renderer } from "./renderer";
import { runWithHandleErrorIf, throwIfError } from "../../handler";
import { api } from "../../../../config";
import { buildQueryParams, buildUrl, sluggize } from "../../../utils/url";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const tagName = decodeURI(req.params.slug[0]);
  const currentPage = req.searchParams["p"] ? req.searchParams["p"] : 1;
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(
    api.url,
    sluggize(["v1", "tags", encodeURI(tagName)]),
    false
  );
  const queryParams = buildQueryParams({
    pagination: { page: currentPage, limit: 10 }
  });
  const response: Response = await fetchFromApi(url, queryParams, ctx, null);
  throwIfError(response);

  const articlesResponseWithCount: ArticleResponseWithCount =
    await response.json();
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

  if (articles.length < 1) {
    throw new Error("Not Found", { cause: 404 });
  }

  return {
    props: {
      tagName: tagName,
      currentPage: currentPage,
      count: articlesResponseWithCount.count,
      articles: articles
    }
  };
}
