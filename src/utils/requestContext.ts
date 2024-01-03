import { RequestContext } from '../models/models';
import { uuid4 } from './uuid';

// FIXME: fix types
export function getRequestContext(headers: any): RequestContext {

  // FIXME: fix types
  if (headers instanceof Headers) {
    return {
      ipAddress: headers.get('x-forwarded-for'),
      referer: headers.get('referer'),
      ua: headers.get('user-agent'),
      requestId: uuid4()
    } as RequestContext
  }
  let xff = headers['x-forwarded-for'];
  return {
    ipAddress: xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1',
    referer: headers['referer'],
    ua: headers['user-agent'],
    requestId: uuid4()
  } as RequestContext
}
