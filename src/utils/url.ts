import { url } from "../../config";

export function fullUrl(slug: string, trailingSlash: boolean = false): string {
  let s = slug;
  if (trailingSlash) {
    s = slug === undefined ? "" : slug + "/";
  }
  return new URL(s, url).href;
}

// FIXME
export function sluggize(
  slug: Array<string> | string // NOTE: Next.js request context seems <any>.
) {
  if (slug instanceof Array) {
    return slug.join("/").replace(/\/{2,}/g, "/");
  } else {
    return slug;
  }
}

export function buildUrl(
  baseUrl: string,
  slug: string,
  trailingSlash: boolean
): string {
  baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  slug = slug.startsWith("/") ? slug.slice(1) : slug;
  if (trailingSlash) {
    slug = slug.endsWith("/") ? slug : `${slug}/`;
  } else {
    slug = slug.endsWith("/") ? slug.slice(0, -1) : slug;
  }
  return new URL(slug, baseUrl).href;
}

export type QueryParams = {
  params?: {
    key: string;
    values: Array<string>;
  };
  pagination?: {
    page: number;
    limit: number;
    order: string;
  };
};

export function buildQueryParams(params: QueryParams = {}): string {
  const queryParams = params.params;
  const pagenation = params.pagination;

  let q = "";
  let p = "";
  if (queryParams) {
    q = queryParams.values.map((q) => `${queryParams.key}=${q}`).join("&");
  }
  if (pagenation) {
    if (pagenation.order === "random") {
      return `order=random`;
    }
    p = `page=${pagenation.page}&limit=${pagenation.limit}`;
  }

  if (q.length > 0) {
    if (p.length === 0) {
      return q;
    }
    return `${q}&${p}`;
  }
  return p;
}
