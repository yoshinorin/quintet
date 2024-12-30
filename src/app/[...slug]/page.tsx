"use server";

import { Metadata } from "next";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { cache } from "react";
import { fetchContent } from "../../api";
import {
  ContentResponse,
  ContentResponseWithFetchResponse
} from "../../models/models";
import { asInsight } from "../../utils/insight";
import { sluggize } from "../../utils/url";
import { parseOrThrow, runWithHandleErrorIf } from "../handler";
import { generateForArticleOrPage } from "../metadata";
import { Renderer } from "./renderer";

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const response = await fetchContent(await headers(), path);
  const content = await parseOrThrow<ContentResponse>(response);
  return {
    res: response,
    body: content
  };
});

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
export async function generateMetadata(props: {
  params: Promise<{ slug: Array<string> }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const sluggized = await sluggize(slug);
  const content = await cachedFindByPath(sluggized);
  return generateForArticleOrPage(sluggized, content.body);
}

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleErrorIf(await fn(req));
}

async function handler(req: any) {
  const { slug } = await req.params;
  const path = sluggize(slug);

  // TODO move utils & write testcode
  if (`/${path}`.replace(/\/{2,}/g, "/").match(/^\/\d{4}\/\d{2}\/\d{2}\/*/)) {
    // https://nextjs.org/docs/app/api-reference/functions/permanentRedirect
    return permanentRedirect(`/articles/${path}`);
  }

  const response: ContentResponseWithFetchResponse =
    await cachedFindByPath(path);

  return {
    props: {
      content: response.body,
      insight: asInsight(response.res)
    }
  };
}
