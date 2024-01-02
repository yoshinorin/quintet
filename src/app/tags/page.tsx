import { Tag } from '../../models/tag';
import { getTags } from '../../api/tags';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(ctx: any) {
  const { props } = await get(ctx);
  return <Renderer {...props} />;
}

export async function get(ctx: any) {
  const response: Response = await getTags(getRequestContext(ctx));
  // ctx.res.statusCode = response.status;

  let tags: Array<Tag> = [];
  if (response.status === 200) {
    tags = await response.json() as Array<Tag>;
  }

  return {
    props: {
      statusCode: response.status,
      tags: tags
    }
  }
}
