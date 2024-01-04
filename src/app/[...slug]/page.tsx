'use server';

import { permanentRedirect } from "next/navigation";

import { ContentResponse, Content } from '../../models/models';
import { findByPath } from '../../api/content';
import { asInsight } from '../../utils/converters';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
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
  throwIfError(response);

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
      slug: req.params.slug,
      content: content,
      insight: asInsight(response)
    }
  }
}
