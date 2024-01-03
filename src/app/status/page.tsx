'use server';

import { getStatus } from '../../api/status';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page() {
  const { props } = await get();
  return <Renderer {...props} />
}

async function get() {
  const response: Response = await getStatus(getRequestContext());

  return {
    props: {
      statusCode: response.status
    }
  }
}
