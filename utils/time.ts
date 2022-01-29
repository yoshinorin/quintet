export function convertUnixtimeToDate(unixTime: number): Date {
  return new Date(unixTime * 1000);
}

export function convertUnixTimeToISODateSrting(unixTime: number): string {
  return new Date(unixTime * 1000).toISOString();
}
