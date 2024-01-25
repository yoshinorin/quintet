'use server';

import { getStatus } from '../../api/status';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />
}

async function handler(req: any) {
  const response: Response = await getStatus(getRequestContext());

  return {
    props: {
      statusCode: response.status
    }
  }
}
