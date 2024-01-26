'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../../api/request';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { api } from '../../../config';
import { buildUrl, sluggize } from '../../utils/url';

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const url = buildUrl(api.url, sluggize(['system', 'health']), false);
  const response: Response = await fetchFromApi(url, null, ctx, null);

  return {
    props: {
      statusCode: response.status
    }
  }
}
