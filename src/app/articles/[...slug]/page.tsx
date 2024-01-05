'use server';

import { Metadata } from 'next'
import { ContentResponse, Content } from '../../../models/models';
import { isIgnoreRequest } from '../../../utils/filterRequests';
import { findByPath } from '../../../api/content';
import { asInsight } from '../../../utils/converters';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../../handler";
import { defaultRobotsMeta } from '../../../../config';

export async function generateMetadata (content?: Content): Promise<Metadata> {
  const c = content;
  const robotsAttributes = content.robotsAttributes === undefined ? defaultRobotsMeta : content.robotsAttributes;
  return {
    /*
     NOT WORK???
    title: c.title,
    authors: [{ name: c.authorName }],
    description: c.description,
    */
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
  await generateMetadata(
    // sluggize(req.params.slug, 'articles'),
    props.content
  )
  return <Renderer {...props} />;
}

async function get(req: any) {
  const path = "/articles/" + req.params.slug.join("/");

  // NOTE: avoid send request of images
  if (isIgnoreRequest(path)) {
    throw new Error('Not found', { cause: 404 });
  }

  // const response: Response = await findByPath(ctx.req, path);
  const response: Response = await findByPath(path);
  throwIfError(response);

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
