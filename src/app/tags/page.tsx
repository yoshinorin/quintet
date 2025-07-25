"use server";

import { headers } from "next/headers";
import { fetchAllTags } from "../../api";
import { Tag } from "../../models/models";
import { parseOrThrow, runWithHandleError } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleError(await fn(req));
}

async function handler(req: any) {
  const response: Response = await fetchAllTags(await headers());
  const tags = await parseOrThrow<Array<Tag>>(response);

  return {
    props: {
      tags: tags
    }
  };
}
