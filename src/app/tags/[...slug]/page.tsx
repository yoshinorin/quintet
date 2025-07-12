"use server";

import { headers } from "next/headers";
import { fetchTag } from "../../../api";
import { getValidOrder, Order } from "../../../api/order";
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
  const order = getValidOrder(queryString.order);
  const randomness = order === Order.RANDOM;
  const currentPage = queryString.p ? queryString.p : 1;
  const response: Response = await fetchTag(
    await headers(),
    tagName,
    currentPage,
    randomness ? 5 : 10,
    order
  );
  const articlesResponseWithCount =
    await parseOrThrow<ArticleResponseWithCount>(response);
  const articles: Array<Article> = articlesResponseWithCount.articles.map(
    (article) => {
      return article;
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
      articles: articles,
      order: order
    }
  };
}
