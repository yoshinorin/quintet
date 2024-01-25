'use server';

import { headers } from 'next/headers';
import { Tag } from '../../models/models';
import { getTags } from '../../api/tags';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await getTags(getRequestContext(headers()));
  throwIfError(response);

  return {
    props: {
      tags: await response.json() as Array<Tag>
    }
  }
}
