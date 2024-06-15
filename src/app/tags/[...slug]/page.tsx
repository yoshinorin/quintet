"use server";

import { headers } from "next/headers";
import { api } from "../../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../../api/request";
import { Article, ArticleResponseWithCount } from "../../../models/models";
import { requestContextFrom } from "../../../utils/requestContext";
import { buildQueryParams, buildUrl, sluggize } from "../../../utils/url";
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
  const tagName = decodeURI(req.params.slug[0]);
  const currentPage = req.searchParams["p"] ? req.searchParams["p"] : 1;
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(
    api.url,
    sluggize(["v1", "tags", encodeURI(tagName)]),
    false
  );
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx),
    queryParams: buildQueryParams({
      pagination: { page: currentPage, limit: 10 }
    })
  };
  const response: Response = await fetchFromApi(url, options);
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
