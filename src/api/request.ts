import { RequestContext } from "../models/models";
import { injectPropagation } from "../otel/propagation";
import { isMatch } from "../utils/match";

export type RequestOptions = {
  headers?: object;
  queryParams?: string;
  interceptIfContainsIgnorePaths?: boolean;
};

// TODO: write test code
// TODO: more simply
export async function fetchFromApi(
  endpoint: string,
  {
    headers = {},
    queryParams = "",
    interceptIfContainsIgnorePaths = false
  }: RequestOptions = {}
): Promise<Response> {
  if (interceptIfContainsIgnorePaths) {
    if (!endpoint || (endpoint && isMatch(endpoint))) {
      return new Response(null, { status: 404 });
    }
  }

  const url = buildRequestUrl(endpoint, queryParams);
  const header = headers ? { header: headers } : {};

  return fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: header as any
  });
}

// NOTE: internal use only but export for testing.
export function buildRequestUrl(url: string, queryParams: string): string {
  const u = queryParams.length > 0 ? `${url}?${queryParams}` : url;
  return new URL(u).href;
}

export function requestHeaderFrom(rq: RequestContext): Object {
  const baseHeaders = {
    "Content-Type": "application/json",
    "x-forwarded-for": rq.ipAddress,
    "user-agent": rq.ua,
    referer: rq.referer,
    "x-request-id": rq.requestId
  };
  const otelHeaders = injectPropagation();

  return {
    ...baseHeaders,
    ...otelHeaders
  };
}
