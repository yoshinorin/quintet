'use server';

import { headers } from 'next/headers';
import { Tag } from '../../models/models';
import { fetchFromApi } from '../../api/request';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { api } from '../../../config';

const API_URL = `${api.url}/tags/`;

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(API_URL, ctx);
  throwIfError(response);

  return {
    props: {
      tags: await response.json() as Array<Tag>
    }
  }
}
