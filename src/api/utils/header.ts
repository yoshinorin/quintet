import { RequestContext } from '../../models/requestContext';

export function generateRequestHeaderObject(rq: RequestContext): Object {
  return {
    'Content-Type': 'application/json',
    'x-forwarded-for': rq.ipAddress,
    'user-agent': rq.ua,
    'referer': rq.referer,
    'x-request-id': rq.requestId
  }
}
