'use server';

import { getArchives } from '../../api/archives';
import { Archive, ArchiveResponse } from '../../models/models';
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
  const response: Response = await getArchives(getRequestContext());
  throwIfError(response);

  const archiveResponse: Array<ArchiveResponse> = await response.json() as Array<ArchiveResponse>;
  const archives: Array<Archive> = archiveResponse.map(article => {
    return {
      path: article.path,
      title: article.title,
      publishedAt: article.publishedAt
    } as Archive
  });

  return {
    props: {
      slug: 'archives',
      archives: archives
    }
  }
}
