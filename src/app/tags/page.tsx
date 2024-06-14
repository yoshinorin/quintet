"use server";

import { headers } from "next/headers";
import { Tag } from "../../models/models";
import { fetchFromApi } from "../../api/request";
import { requestContextFrom } from "../../utils/requestContext";
import { Renderer } from "./renderer";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { api } from "../../../config";
import { buildUrl, sluggize } from "../../utils/url";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "tags"]), true);
  const response: Response = await fetchFromApi(url, null, ctx, null);
  throwIfError(response);

  return {
    props: {
      tags: (await response.json()) as Array<Tag>
    }
  };
}
