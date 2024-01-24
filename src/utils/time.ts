export function toDate(unixTime: number): Date {
  try {
    return new Date(unixTime * 1000);
  } catch {
    return new Date();
  }
}

export function toLocalDateSrting(unixTime: number): String {
  try {
    return new Date(unixTime * 1000).toLocaleDateString();
  } catch {
    return new Date().toLocaleDateString();
  }
}

export function toISODateSrting(unixTime: number): string {
  try {
    return new Date(unixTime * 1000).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// TODO: refactor naming
// 2022/2/8 22:59:10 -> 2022.2.8
export function toJaJpDottedDateString(date: Date): string {
  return date.toLocaleString('ja-JP').split(' ')[0].replace(/\//g,".");
}
