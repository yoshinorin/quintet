'use server';

import { headers } from 'next/headers';

import { getStatus } from '../../api/status';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page() {
  const { props } = await get();
  return <Renderer {...props} />
}

async function get() {
  const response: Response = await getStatus(getRequestContext(headers()));

  return {
    props: {
      statusCode: response.status
    }
  }
}
