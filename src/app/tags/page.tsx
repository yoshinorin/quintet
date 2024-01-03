'use server';

import { Tag } from '../../models/tag';
import { getTags } from '../../api/tags';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runOrHandleErrorIf, throwIfError } from "../handler";

export default async function Page(req: any) {
  return runOrHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await get(req);
  return <Renderer {...props} />;
}

async function get(req: any) {
  // TODO: check ctx is collect or not
  const response: Response = await getTags(getRequestContext(req));
  throwIfError(response);

  return {
    props: {
      tags: await response.json() as Array<Tag>
    }
  }
}
