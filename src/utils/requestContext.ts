import { RequestContext } from '../models/models';
import { uuid4 } from './uuid';

export function requestContextFrom(h: Headers): RequestContext {
  if (h instanceof Headers) {
    return {
      ipAddress: h.get('x-forwarded-for'),
      referer: h.get('referer'),
      ua: h.get('user-agent'),
      requestId: uuid4()
    } as RequestContext
  }
  const xff = h['x-forwarded-for'];
  // @ts-ignore
  return {
    // @ts-ignore
    ipAddress: xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1',
    referer: h['referer'],
    ua: h['user-agent'],
    requestId: uuid4()
  } as RequestContext
}
