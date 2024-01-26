'use server';

import { headers } from 'next/headers';
import { Tag } from '../../models/models';
import { fetchFromApi } from '../../api/request';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { api } from '../../../config';
import { buildUrl } from '../../utils/url';
import { sluggize } from '../../utils/slug';

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const url = buildUrl(api.url, sluggize(['tags']), true);
  const response: Response = await fetchFromApi(url, null, ctx, null);
  throwIfError(response);

  return {
    props: {
      tags: await response.json() as Array<Tag>
    }
  }
}
