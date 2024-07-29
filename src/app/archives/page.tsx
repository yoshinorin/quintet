"use server";

import { headers } from "next/headers";
import { Archive, ArchiveResponse } from "../../models/models";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { Renderer } from "./renderer";
import { fetchArchives } from "../../api";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await fetchArchives(headers());
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
