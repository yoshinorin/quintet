'use server';

import { headers } from 'next/headers';
import { getStatus } from '../../api/status';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />
}

async function handler(req: any) {
  const response: Response = await getStatus(requestContextFrom(headers()));

  return {
    props: {
      statusCode: response.status
    }
  }
}
