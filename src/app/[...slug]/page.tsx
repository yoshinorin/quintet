'use server';

import { ContentResponse, Content } from '../../models/content';
import { findByPath } from '../../api/content';
import { asInsight } from '../../utils/converters';
import { Renderer } from './renderer';

export default async function Page(req: any) {
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
    return {
      redirect: {
        permanent: true,
        destination: `/articles${path}`
      }
    }
  }

  const response: Response = await findByPath(path);
  // ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
      title: contentResponse.title,
      robotsAttributes: contentResponse.robotsAttributes,
      externalResources: contentResponse.externalResources,
      content: contentResponse.content,
      length: contentResponse.length,
      publishedAt: contentResponse.publishedAt
    } as Content
  }
  return {
    props: {
      statusCode: response.status,
      content: content,
      insight: asInsight(response)
    }
  }
}
