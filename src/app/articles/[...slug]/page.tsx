import { ContentResponse, Content } from '../../../models/content';
import { isIgnoreRequest } from '../../../utils/filterRequests';
import { findByPath } from '../../../api/content';
import { asInsight } from '../../../utils/converters';
import Renderer from './renderer';

export default async function Page(req: any) {
  const { props } = await get(req);
  // @ts-ignore I don't know why ts check error occured.
  return <Renderer {...props} />;
}

export async function get(req: any) {
  const path = "/articles/" + req.params.slug.join("/");

  // avoid send request of images
  // TODO
  if (isIgnoreRequest(path)) {
    return {
      props: {
        statusCode: 404
      }
    }
  }

  // const response: Response = await findByPath(ctx.req, path);
  const response: Response = await findByPath(path);
  // ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
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
  }
  return {
    props: {
      statusCode: response.status,
      content: content,
      insight: asInsight(response)
    }
  }
}
