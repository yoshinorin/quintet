"use server";

import { headers } from "next/headers";
import { fetchAllTags } from "../../api";
import { Tag } from "../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await fetchAllTags(headers());
  const tags = await parseOrThrow<Array<Tag>>(response);

  return {
    props: {
      tags: tags
    }
  };
}
