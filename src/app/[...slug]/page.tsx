"use server";

import { Metadata } from "next";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { cache } from "react";
import { fetchContent } from "../../api";
import {
  Content,
  ContentResponse,
  ContentResponseWithFetchResponse
} from "../../models/models";
import { asInsight } from "../../utils/insight";
import { sluggize } from "../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { generateForArticleOrPage } from "../metadata";
import { Renderer } from "./renderer";

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const response = await fetchContent(headers(), path);
  throwIfError(response);
  const content = (await response.json()) as ContentResponse;
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
  const sluggized = await sluggize(slug);
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
  const path = sluggize(req.params.slug);

  // TODO move utils & write testcode
  if (`/${path}`.replace(/\/{2,}/g, "/").match(/^\/\d{4}\/\d{2}\/\d{2}\/*/)) {
    // https://nextjs.org/docs/app/api-reference/functions/permanentRedirect
    return permanentRedirect(`/articles/${path}`);
  }

  const response: ContentResponseWithFetchResponse =
    await cachedFindByPath(path);
  const content: Content = {
    title: response.body.title,
    robotsAttributes: response.body.robotsAttributes,
    externalResources: response.body.externalResources,
    content: response.body.content,
    length: response.body.length,
    publishedAt: response.body.publishedAt
  } as Content;

  return {
    props: {
      content: content,
      insight: asInsight(response.res)
    }
  };
}
