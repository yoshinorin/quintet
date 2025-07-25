"use server";

import { headers } from "next/headers";
import { fetchArchives } from "../../api";
import { Archive, ArchiveResponse } from "../../models/models";
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
  const response: Response = await fetchArchives(await headers());
  const archiveResponse = await parseOrThrow<Array<ArchiveResponse>>(response);
  const archives: Array<Archive> = archiveResponse.map((article) => {
    return article;
  });

  return {
    props: {
      archives: archives
    }
  };
}
