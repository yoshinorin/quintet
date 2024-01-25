'use server';

import { cache } from 'react'
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { permanentRedirect } from "next/navigation";
import { ContentResponse, Content, ContentResponseWithFetchResponse } from '../../models/models';
import { fetchFromApi } from '../../api/request';
import { asInsight } from '../../utils/insight';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { sluggize } from '../../utils/slug';
import { requestContextFrom } from '../../utils/requestContext';
import { generateForArticleOrPage } from '../metadata';
import { api } from '../../../config';

const API_BASE_URL = `${api.url}/contents`;

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const ctx = requestContextFrom(headers());
  // TODO: cleanup
  if (path.startsWith("/")) {
    path = path.substr(1, path.length)
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }
  const response = await fetchFromApi(`${API_BASE_URL}/${path}`, ctx, {
    interceptIfContainsIgnorePaths: true,
    queryParams: null,
    pagenation: null
  });
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
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const path = sluggize(req.params.slug);

  // TODO move utils & write testcode
  if (path.match(/^\/\d{4}\/\d{2}\/\d{2}\/*/)) {
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
      content: content,
      insight: asInsight(response.res)
    }
  }
}
