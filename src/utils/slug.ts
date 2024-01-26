
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

