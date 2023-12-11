import { headers } from 'next/headers'

import Renderer from './render';
import { getArchives } from '../../api/archives';
import { Archive, ArchiveResponse } from '../../models/archive';
import { getRequestContext } from '../../utils/requestContext';

export default async function Page() {
  const { props } = await get();
  return <Renderer {...props} />
}

export async function get() {
  const response: Response = await getArchives(getRequestContext(headers()));
  // ctx.res.statusCode = response.status;    // TODO

  let archiveResponse: Array<ArchiveResponse> = null;
  let archives: Array<Archive> = [];
  if (response.status === 200) {
    archiveResponse = await response.json() as Array<ArchiveResponse>;
    archives = archiveResponse.map(article => {
      return {
        path: article.path,
        title: article.title,
        publishedAt: article.publishedAt
      } as Archive
    });
  }

  return {
    props: {
      statusCode: response.status,
      archives: archives
    }
  }
}
