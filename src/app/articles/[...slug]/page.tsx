'use server';

import { cache } from 'react'
import { Metadata } from 'next'
import { ContentResponse, Content } from '../../../models/models';
import { isIgnoreRequest } from '../../../utils/filterRequests';
import { findByPath } from '../../../api/content';
import { asInsight } from '../../../utils/converters';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../../handler";
import { defaultRobotsMeta } from '../../../../config';

const cachedFindByPath = cache(async (path: string) => {
  const response = await findByPath(path);
  throwIfError(response);
  return response;
});

// TODO: use cache
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
export async function generateMetadata({ params: { slug }}: { params: { slug: Array<string> }}): Promise<Metadata> {
  const response = await cachedFindByPath("/articles/" + slug.join("/"));
  // @ts-ignore
  const content = response.json as ContentResponse;

  const robotsAttributes = content.robotsAttributes === undefined ? defaultRobotsMeta : content.robotsAttributes;
  return {
    title: content.title,
    authors: [{ name: content.authorName }],
    description: content.description,
    robots: {
      noarchive: robotsAttributes.includes('noarchive'),
      follow: !robotsAttributes.includes('nofollow'),
      noimageindex: robotsAttributes.includes('noimageindex'),
      index: !robotsAttributes.includes('noindex'),
    }
    /*
    openGraph: {
      type: 'article',
      publishedTime: convertUnixTimeToISODateSrting(content.publishedAt),
      modifiedTime: convertUnixTimeToISODateSrting(content.updatedAt)
    },
    */
  };
}

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  // NOTE: avoid send request of images
  if (isIgnoreRequest(req.params.slug.join("/"))) {
    throw new Error('Not found', { cause: 404 });
  }
  const path = "/articles/" + req.params.slug.join("/");
  const response: Response = await cachedFindByPath(path);

  // @ts-ignore
  const contentResponse: ContentResponse = await response.json() as ContentResponse;
  const content: Content = {
    id: contentResponse.id,
    title: contentResponse.title,
    robotsAttributes: contentResponse.robotsAttributes,
    externalResources: contentResponse.externalResources,
    tags: contentResponse.tags,
    description: contentResponse.description,
    content: contentResponse.content,
    length: contentResponse.length,
    authorName: contentResponse.authorName,
    publishedAt: contentResponse.publishedAt,
    updatedAt: contentResponse.updatedAt
  } as Content

  return {
    props: {
      content: content,
      insight: asInsight(response)
    }
  }
}
