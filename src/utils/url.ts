import { url } from '../../config';

export function fullUrl(slug: string): string {
  const s = slug === undefined ? '' : slug + "/"
  return new URL(s, url).href
}

export function fullUrlWithoutTrailingSlash(slug: string): string {
  return new URL(slug, url).href
}
