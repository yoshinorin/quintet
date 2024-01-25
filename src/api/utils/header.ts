import { RequestContext } from '../../models/models';

export function requestHeaderFrom(rq: RequestContext): Object {
  return {
    'Content-Type': 'application/json',
    'x-forwarded-for': rq.ipAddress,
    'user-agent': rq.ua,
    'referer': rq.referer,
    'x-request-id': rq.requestId
  }
}
