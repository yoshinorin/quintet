import { url } from '../../config';

export function fullUrl(slug: string, trailingSlash: boolean = false): string {
  let s = slug;
  if (trailingSlash) {
    s = slug === undefined ? '' : slug + "/"
  }
  return new URL(s, url).href
}
