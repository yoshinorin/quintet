"use server";

import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { api } from "../../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../../api/request";
import {
  Content,
  ContentResponse,
  ContentResponseWithFetchResponse
} from "../../../models/models";
import { asInsight } from "../../../utils/insight";
import { isMatch } from "../../../utils/match";
import { requestContextFrom } from "../../../utils/requestContext";
import { buildUrl, sluggize } from "../../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../../handler";
import { generateForArticleOrPage } from "../../metadata";
import { Renderer } from "./renderer";

const PREFIX_URL = "articles";

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  // TODO: devide into another `function` and move `api` dir.
  const slug = sluggize(["v1", "contents", path]);
  const url = buildUrl(api.url, slug, true);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx),
    interceptIfContainsIgnorePaths: true
  };
  const response = await fetchFromApi(url, options);
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
