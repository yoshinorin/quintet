'use server';

import { cache } from 'react'
import { headers } from 'next/headers';
import { Metadata } from 'next'
import { notFound } from "next/navigation";
import { ContentResponse, Content, ContentResponseWithFetchResponse } from '../../../models/models';
import { isIgnoreRequest } from '../../../utils/filterRequests';
import { fetchFromApi } from '../../../api/request';
import { asInsight } from '../../../utils/insight';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../../handler";
import { generateForArticleOrPage } from '../../metadata';
import { buildUrl, sluggize } from '../../../utils/url';
import { requestContextFrom } from '../../../utils/requestContext';
import { api } from '../../../../config';

const PREFIX_URL = 'articles';

// TODO: move somewhere if possible
const cachedFindByPath = cache(async (path: string) => {
  const ctx = requestContextFrom(headers());
  const slug = sluggize(['contents', path]);
  const url = buildUrl(api.url, slug, true);
  const response = await fetchFromApi(url, null, ctx, {
    interceptIfContainsIgnorePaths: true
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
  const sluggized = await sluggize(slug, PREFIX_URL);
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
  // NOTE: avoid send request of images
  if (isIgnoreRequest(req.params.slug.join("/"))) {
    return notFound();
  }
  const sluggized = await sluggize(req.params.slug, PREFIX_URL);
  const response: ContentResponseWithFetchResponse = await cachedFindByPath(sluggized);

  const content: Content = {
    id: response.body.id,
    title: response.body.title,
    robotsAttributes: response.body.robotsAttributes,
    externalResources: response.body.externalResources,
    tags: response.body.tags?? [],
    description: response.body.description,
    content: response.body.content,
    length: response.body.length,
    authorName: response.body.authorName,
    publishedAt: response.body.publishedAt,
    updatedAt: response.body.updatedAt
  } as Content

  return {
    props: {
      content: content,
      insight: asInsight(response.res)
    }
  }
}
