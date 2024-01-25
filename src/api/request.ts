import { RequestContext } from '../models/models';
import { requestHeaderFrom } from "./utils/header"
import { isIgnoreRequest } from '../utils/filterRequests';

// TODO: write test code
export async function fetchFromApi(
  endpoint: string,
  ctx: RequestContext | null,
  options: {
    interceptIfContainsIgnorePaths: boolean,
    queryParams: Array<string>,
    pagenation: {
      page: number,
      limit: number
    },
  } | null = null
): Promise<Response> {

  // TODO: extract to function & write test code
  if (options) {
    if (options.interceptIfContainsIgnorePaths) {
      if (!endpoint || (endpoint && isIgnoreRequest(endpoint))) {
        return new Response(null, { "status" : 404 });
      }
    }
    let queryParams = '';
    let pagenationParams = '';
    if (options.queryParams) {
      queryParams = options.queryParams.map(q => `q=${q}`).join('&');
    }
    if (options.pagenation) {
      pagenationParams = `page=${options.pagenation.page}&limit=${options.pagenation.limit}`;
    }
    endpoint = endpoint + '?' + queryParams + pagenationParams;
  }

  const header = ctx ? { header: requestHeaderFrom(ctx) } : {};

  return fetch(
    endpoint,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: header as any
    }
  )
}
