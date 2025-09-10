import { api, publicApi } from "../../config";
import { make as makeRequestContext } from "../utils/requestContext";
import { buildQueryParams, buildUrl, sluggize } from "../utils/url";
import { Order } from "./order";
import { RequestOptions, fetchFromApi, makeRequestHeader } from "./request";

export interface PaginationParams {
  page: number;
  limit: number;
  order: Order;
}

export function fetchArticles(
  headers: Headers,
  currentPage: number,
  limit: number,
  order: Order
): Promise<Response> {
  const url = buildUrl(api.url, "v1/articles", true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx),
    queryParams: buildQueryParams({
      pagination: { page: currentPage, limit, order } as PaginationParams
    })
  };
  return fetchFromApi(url, options);
}

export function fetchArchives(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, "v1/archives", true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchContent(
  headers: Headers,
  path: string
): Promise<Response> {
  const slug = sluggize(["v1", "contents", path]);
  const url = buildUrl(api.url, slug, true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx),
    blockIgnoredPaths: true
  };
  return fetchFromApi(url, options);
}

export function fetchAdjacentContent(
  headers: Headers | null = null,
  id: string
): Promise<Response> {
  const slug = sluggize(["v1", "contents", id, "adjacent"]);
  const url = buildUrl(publicApi.url, slug, true);

  if (headers) {
    const ctx = makeRequestContext(headers);
    const options: RequestOptions = {
      headers: makeRequestHeader(ctx),
      blockIgnoredPaths: true
    };
    return fetchFromApi(url, options);
  } else {
    return fetchFromApi(url);
  }
}

export function fetchFeeds(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "feeds", "index"]), false);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchSearch(
  headers: Headers,
  words: Array<string>
): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "search"]), false);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx),
    queryParams: buildQueryParams({
      params: { key: "q", values: words }
    })
  };
  return fetchFromApi(url, options);
}

export function fetchAllSeries(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "series"]), true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchSeries(
  headers: Headers,
  seriesPath: string
): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "series", seriesPath]), false);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchSitemap(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "sitemaps"]), true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchStatus(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "system", "health"]), false);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchAllTags(headers: Headers): Promise<Response> {
  const url = buildUrl(api.url, sluggize(["v1", "tags"]), true);
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx)
  };
  return fetchFromApi(url, options);
}

export function fetchTag(
  headers: Headers,
  tagName: string,
  currentPage: number,
  limit: number,
  order: Order
): Promise<Response> {
  const url = buildUrl(
    api.url,
    sluggize(["v1", "tags", encodeURI(tagName)]),
    false
  );
  const ctx = makeRequestContext(headers);
  const options: RequestOptions = {
    headers: makeRequestHeader(ctx),
    queryParams: buildQueryParams({
      pagination: { page: currentPage, limit, order } as PaginationParams
    })
  };
  return fetchFromApi(url, options);
}

export function fetchSystemMetadata(): Promise<Response> {
  const url = buildUrl(
    publicApi.url,
    sluggize(["v1", "system", "metadata"]),
    false
  );
  return fetchFromApi(url);
}
