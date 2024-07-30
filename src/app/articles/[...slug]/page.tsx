"use server";

import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { fetchContent } from "../../../api";
import {
  Content,
  ContentResponse,
  ContentResponseWithFetchResponse
} from "../../../models/models";
import { asInsight } from "../../../utils/insight";
import { isMatch } from "../../../utils/match";
import { sluggize } from "../../../utils/url";
import { parseOrThrow, runWithHandleErrorIf } from "../../handler";
import { generateForArticleOrPage } from "../../metadata";
import { Renderer } from "./renderer";

const PREFIX_URL = "articles";

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const response = await fetchContent(headers(), path);
  const content = await parseOrThrow<ContentResponse>(response);
  return {
    res: response,
    body: content
  };
});

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
export async function generateMetadata({
  params: { slug }
}: {
  params: { slug: Array<string> };
}): Promise<Metadata> {
  const sluggized = await sluggize([PREFIX_URL].concat(slug));
  const content = await cachedFindByPath(sluggized);
  return generateForArticleOrPage(sluggized, content.body);
}

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  // NOTE: avoid send request of images
  if (isMatch(req.params.slug.join("/"))) {
    return notFound();
  }
  const sluggized = await sluggize([PREFIX_URL].concat(req.params.slug));
  const response: ContentResponseWithFetchResponse =
    await cachedFindByPath(sluggized);

  const content: Content = {
    id: response.body.id,
    title: response.body.title,
    robotsAttributes: response.body.robotsAttributes,
    externalResources: response.body.externalResources,
    tags: response.body.tags ?? [],
    description: response.body.description,
    content: response.body.content,
    length: response.body.length,
    authorName: response.body.authorName,
    publishedAt: response.body.publishedAt,
    updatedAt: response.body.updatedAt
  } as Content;

  return {
    props: {
      content: content,
      insight: asInsight(response.res)
    }
  };
}
