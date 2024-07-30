"use server";

import { headers } from "next/headers";
import { fetchArticles } from "../../api";
import { Article, ArticleResponseWithCount } from "../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleErrorIf(await fn(req));
}

async function handler(req: any) {
  const currentPage = req.searchParams["p"] ? req.searchParams["p"] : 1;
  const response: Response = await fetchArticles(headers(), currentPage, 10);
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

  return {
    props: {
      count: articlesResponseWithCount.count,
      currentPage: currentPage,
      articles: articles
    }
  };
}
