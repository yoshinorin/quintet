export function convertUnixtimeToDate(unixTime: number): Date {
  return new Date(unixTime * 1000);
}

export function convertUnixTimeToISODateSrting(unixTime: number): string {
  return new Date(unixTime * 1000).toISOString();
}

// TODO: refactor naming
// 2022/2/8 22:59:10 -> 2022.2.8
export function toDottedDateString(date: Date): string {
  return date.toLocaleString().split(' ')[0].replace(/\//g,".");
}
