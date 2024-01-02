'use server';

import { notFound } from 'next/navigation';

import { Tag } from '../../models/tag';
import { getTags } from '../../api/tags';
import { getRequestContext } from '../../utils/requestContext';
import { Renderer } from './renderer';

export default async function Page(req: any) {
  try {
    const { props } = await get(req);
    return <Renderer {...props} />;
  } catch(e) {
    // @ts-ignore
    if (e.cause === 404) {
      return notFound();
    }
    // FIXME: I don't want to re-throw
    // @ts-ignore
    throw new Error(response.statusText, { cause: response.status });
  }
}

async function get(req: any) {
  // TODO: check ctx is collect or not
  const response: Response = await getTags(getRequestContext(req));

  if (response.status !== 200) {
    // TODO: use custom Error class
    throw new Error(response.statusText, { cause: response.status });
  }

  return {
    props: {
      tags: await response.json() as Array<Tag>
    }
  }
}
