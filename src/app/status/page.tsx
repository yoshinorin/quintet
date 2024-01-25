'use server';

import { headers } from 'next/headers';
import { fetchFromApi } from '../../api/request';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { api } from '../../../config';

const API_URL = `${api.url}/system/health`;

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(API_URL, ctx);

  return {
    props: {
      statusCode: response.status
    }
  }
}
