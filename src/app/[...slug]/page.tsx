'use server';

import { permanentRedirect, notFound } from "next/navigation";

import { ContentResponse, Content } from '../../models/content';
import { findByPath } from '../../api/content';
import { asInsight } from '../../utils/converters';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  try {
    const { props } = await get(req);
    return <Renderer {...props} />;
  } catch(e) {
    // @ts-ignore
    if (e.cause === 404) {
      return notFound();
    }
    // FIXME: I don't want to re-throw
    // @ts-ignore
    throw new Error(response.statusText, { cause: response.status });
  }
}

async function get(req: any) {
  let path = req.params.slug.join("/");
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

  const response: Response = await findByPath(path);

  if (response.status !== 200) {
    // TODO: use custom Error class
    throw new Error(response.statusText, { cause: response.status });
  }

  const contentResponse: ContentResponse = await response.json() as ContentResponse;
  const content: Content = {
    title: contentResponse.title,
    robotsAttributes: contentResponse.robotsAttributes,
    externalResources: contentResponse.externalResources,
    content: contentResponse.content,
    length: contentResponse.length,
    publishedAt: contentResponse.publishedAt
  } as Content

  return {
    props: {
      content: content,
      insight: asInsight(response)
    }
  }
}
