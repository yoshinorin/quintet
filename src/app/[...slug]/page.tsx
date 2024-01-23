'use server';

import { cache } from 'react'
import { permanentRedirect } from "next/navigation";
import { ContentResponse, Content, ContentResponseWithFetchResponse } from '../../models/models';
import { findByPath } from '../../api/content';
import { asInsight } from '../../utils/converters';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../handler";
import { sluggize } from '../../utils/slug';
import { generateForArticleOrPage } from '../metadata';
import { Metadata } from 'next';

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const response = await findByPath(path);
  throwIfError(response);
  const content = await response.json() as ContentResponse;
  return {
    res: response,
    body: content
  }
});

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
export async function generateMetadata({ params: { slug }}: { params: { slug: Array<string> }}): Promise<Metadata> {
  const sluggized = await sluggize(slug);
  const content = await cachedFindByPath(sluggized);
  return generateForArticleOrPage(sluggized ,content.body);
}

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  let path = sluggize(req.params.slug);
  // TODO move utils & write testcode
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  // TODO move utils & write testcode
  if (path.match(/^\/\d{4}\/\d{2}\/\d{2}\/*/)) {
    if (!path.endsWith("/")) {
      path = `${path}/`
    }
    // https://nextjs.org/docs/app/api-reference/functions/permanentRedirect
    return permanentRedirect(`/articles${path}`);
  }

  const response: ContentResponseWithFetchResponse = await cachedFindByPath(path);
  const content: Content = {
    title: response.body.title,
    robotsAttributes: response.body.robotsAttributes,
    externalResources: response.body.externalResources,
    content: response.body.content,
    length: response.body.length,
    publishedAt: response.body.publishedAt
  } as Content

  return {
    props: {
      // slug: sluggize(req.params.slug),
      content: content,
      insight: asInsight(response.res)
    }
  }
}
