export function toDate(unixTime: number): Date {
  try {
    return new Date(unixTime * 1000);
  } catch {
    return new Date();
  }
}

export function toLocalDateString(unixTime: number): String {
  try {
    return new Date(unixTime * 1000).toLocaleDateString();
  } catch {
    return new Date().toLocaleDateString();
  }
}

export function toISODateString(unixTime: number): string {
  try {
    return new Date(unixTime * 1000).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export function splittedBy(
  unixTime: number,
  locale: string,
  delimiter: string
): Array<string> {
  return toDate(unixTime)
    .toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .split(delimiter);
}
