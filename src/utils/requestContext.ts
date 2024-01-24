import { headers } from 'next/headers';
import { RequestContext } from '../models/models';
import { uuid4 } from './uuid';

// FIXME: fix types
export function getRequestContext(h: Headers = headers()): RequestContext {
  // FIXME: fix types
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
