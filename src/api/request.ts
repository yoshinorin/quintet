import { RequestContext } from "../models/models";
import { emit } from "../otel/logger";
import { injectPropagation } from "../otel/propagation";
import { makeInstance } from "../utils/logger";
import { isMatch } from "../utils/match";

export type RequestOptions = {
  headers?: HeadersInit;
  queryParams?: string;
  blockIgnoredPaths?: boolean;
};

const logger = makeInstance(emit);

// TODO: write test code
// TODO: more simply
export async function fetchFromApi(
  endpoint: string,
  {
    headers = {},
    queryParams = "",
    blockIgnoredPaths = false
  }: RequestOptions = {}
): Promise<Response> {
  if (blockIgnoredPaths) {
    if (!endpoint || (endpoint && isMatch(endpoint))) {
      return new Response(null, { status: 404 });
    }
  }

  const url = buildRequestUrl(endpoint, queryParams);
  const startTime = Date.now();
  const method = "GET";

  const response = await fetch(url, {
    method: method,
    cache: "no-cache",
    headers
  });

  const duration = Date.now() - startTime;
  logger.httpResponse(
    "HTTP Response",
    method,
    url,
    response.status,
    duration,
    maskHeaders(headers)
  );

  return response;
}

// NOTE: internal use only but export for testing.
export function buildRequestUrl(url: string, queryParams: string): string {
  const u = queryParams.length > 0 ? `${url}?${queryParams}` : url;
  return new URL(u).href;
}

// RFC 9110 Section 7.6.1 hop-by-hop headers, plus headers fetch recomputes.
const EXCLUDED_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-connection",
  "te",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length"
];

const MASKED_HEADERS = ["cookie", "authorization"];

// NOTE: internal use only but export for testing.
export function forwardableHeaders(incoming: Headers): Headers {
  const h = new Headers(incoming);
  const connectionTokens = (incoming.get("connection") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  [...EXCLUDED_HEADERS, ...connectionTokens].forEach((k) => h.delete(k));
  return h;
}

// NOTE: internal use only but export for testing.
export function maskHeaders(headers: HeadersInit): Record<string, string> {
  const masked: Record<string, string> = {};
  new Headers(headers).forEach((v, k) => {
    masked[k] = MASKED_HEADERS.includes(k) ? "***" : v;
  });
  return masked;
}

export function makeRequestHeader(
  incoming: Headers,
  rq: RequestContext
): Headers {
  const h = forwardableHeaders(incoming);
  h.set("Content-Type", "application/json");
  if (rq.ipAddress) {
    h.set("x-forwarded-for", rq.ipAddress);
  }
  if (rq.requestId) {
    h.set("x-request-id", rq.requestId);
  }
  Object.entries(injectPropagation()).forEach(([k, v]) => h.set(k, v));
  return h;
}
