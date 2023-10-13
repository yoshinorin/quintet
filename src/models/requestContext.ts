export interface RequestContext {
  ipAddress: string,
  // NOT referrer
  // https://datatracker.ietf.org/doc/html/rfc7231#section-5.5.2
  referer: string | null,
  ua: string | null,
  requestId: string | null
}
