export function sluggize(
    slug: any,  // NOTE: Next.js request context is any.
    prefix: string | undefined = undefined,
    fallback: string | undefined = undefined
  ) {
    try {
      console.log()
      if (slug instanceof Array) {
        const p = prefix === undefined ? undefined : '/' + prefix;
        const s = slug as Array<string>;
        const arr = [p].concat(s);
        return arr.join('/');
       } else {
        return fallback;
      }
    } catch {
      return fallback;
    }
}

