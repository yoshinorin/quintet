'use server';

import { headers } from 'next/headers';
import { api } from '../../../config';
import { fetchFromApi } from '../../api/request';
import { Archive, ArchiveResponse } from '../../models/models';
import { requestContextFrom } from '../../utils/requestContext';
import { Renderer } from './renderer';
import { runWithHandleErrorIf, throwIfError } from "../handler";

const API_URL = `${api.url}/archives/`;

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  const response: Response = await fetchFromApi(API_URL, ctx);
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
      archives: archives
    }
  }
}
