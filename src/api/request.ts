import { RequestContext } from '../models/models';
import { isMatch } from '../utils/match';

// TODO: write test code
// TODO: more simply
export async function fetchFromApi(
  endpoint: string,
  queryParams: string = '',
  ctx: RequestContext | null,
  options: {
    interceptIfContainsIgnorePaths: boolean,
  } | null = null
): Promise<Response> {

  // TODO: extract to function & write test code
  if (options) {
    if (options.interceptIfContainsIgnorePaths) {
      if (!endpoint || (endpoint && isMatch(endpoint))) {
        return new Response(null, { "status" : 404 });
      }
    }
  }

  const q = queryParams?? '';
  const url = buildRequestUrl(endpoint, q);
  const header = ctx ? { header: requestHeaderFrom(ctx) } : {};

  return fetch(
    url,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: header as any
    }
  )
}

// NOTE: internal use only but export for testing.
export function buildRequestUrl(url: string, queryParams: string): string {
  const u = queryParams.length > 0 ? `${url}?${queryParams}` : url;
  return new URL(u).href;
}

function requestHeaderFrom(rq: RequestContext): Object {
  return {
    'Content-Type': 'application/json',
    'x-forwarded-for': rq.ipAddress,
    'user-agent': rq.ua,
    'referer': rq.referer,
    'x-request-id': rq.requestId
  }
}
