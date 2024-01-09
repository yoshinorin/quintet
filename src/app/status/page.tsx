'use server';

import { getStatus } from '../../api/status';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  const { props } = await get(req);
  return <Renderer {...props} />
}

async function get(req: any) {
  const response: Response = await getStatus(getRequestContext());

  return {
    props: {
      // slug: sluggize(req.params.slug),
      statusCode: response.status
    }
  }
}
