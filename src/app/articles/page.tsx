"use server";

import { headers } from "next/headers";
import { fetchArticles } from "../../api";
import { Article, ArticleResponseWithCount } from "../../models/models";
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
  const response: Response = await fetchArticles(headers(), currentPage, 10);
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
