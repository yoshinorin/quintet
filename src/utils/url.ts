import { url } from '../../config';

export function fullUrl(slug: string, trailingSlash: boolean = false): string {
  let s = slug;
  if (trailingSlash) {
    s = slug === undefined ? '' : slug + "/"
  }
  return new URL(s, url).href
}

// FIXME: messy code (I'm tired to fight wiht TS type)
export function sluggize(
  slug: Array<string> | string,  // NOTE: Next.js request context seems <any>.
  prefix: string | undefined = undefined,
  fallback: string | undefined = undefined
) {
  try {
    if (slug instanceof Array) {
      const p = prefix === undefined ? undefined : '/' + prefix;
      const s = slug as Array<string>;
      const arr = [p].concat(s);
      return arr.join('/').replace(/\/{2,}/g, '/');
    } else {
      return slug;
    }
  } catch {
    return fallback;
  }
}

export function buildUrl(baseUrl: string, slug: string, trailingSlash: boolean): string {
  baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  slug = slug.startsWith('/') ? slug.slice(1) : slug;
  if (trailingSlash) {
    slug = slug.endsWith('/') ? slug : `${slug}/`;
  } else {
    slug = slug.endsWith('/') ? slug.slice(0, -1) : slug;
  }
  return new URL(slug, baseUrl).href
}

export function buildQueryParams(
  queryParams: {
    key: string,
    values: Array<string>,
  } = null,
  pagenation: {
    page: number,
    limit: number
  } = null): string {

  let q = '';
  let p = '';
  if (queryParams) {
    q = queryParams.values.map(q => `${queryParams.key}=${q}`).join('&');
  }
  if (pagenation) {
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
