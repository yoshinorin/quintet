"use server";

import { headers } from "next/headers";
import { fetchTag } from "../../../api";
import { Article, ArticleResponseWithCount } from "../../../models/models";
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
  const tagName = decodeURI(req.params.slug[0]);
  const currentPage = req.searchParams["p"] ? req.searchParams["p"] : 1;
  const response: Response = await fetchTag(headers(), tagName, currentPage);
  const articlesResponseWithCount =
    await parseOrThrow<ArticleResponseWithCount>(response);
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
