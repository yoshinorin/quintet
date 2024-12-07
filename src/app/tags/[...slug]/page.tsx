"use server";

import { headers } from "next/headers";
import { fetchTag } from "../../../api";
import { Article, ArticleResponseWithCount } from "../../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleErrorIf(await fn(req));
}

async function handler(req: any) {
  const { slug } = await req.params;
  const tagName = decodeURI(slug[0]);

  const queryString = await req.searchParams;
  const currentPage = queryString.p ? queryString.p : 1;
  const response: Response = await fetchTag(
    await headers(),
    tagName,
    currentPage
  );
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
