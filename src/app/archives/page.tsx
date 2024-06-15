"use server";

import { headers } from "next/headers";
import { api } from "../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../api/request";
import { Archive, ArchiveResponse } from "../../models/models";
import { requestContextFrom } from "../../utils/requestContext";
import { buildUrl } from "../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, "v1/archives", true);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx)
  };
  const response: Response = await fetchFromApi(url, options);
  throwIfError(response);

  const archiveResponse: Array<ArchiveResponse> =
    (await response.json()) as Array<ArchiveResponse>;
  const archives: Array<Archive> = archiveResponse.map((article) => {
    return {
      path: article.path,
      title: article.title,
      publishedAt: article.publishedAt
    } as Archive;
  });

  return {
    props: {
      archives: archives
    }
  };
}
