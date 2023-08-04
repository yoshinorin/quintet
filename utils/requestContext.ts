import type { NextApiRequest } from 'next'
import { RequestContext } from '../models/requestContext'
import { uuid4 } from './uuid';

export function getRequestContext(request: NextApiRequest): RequestContext {

  if (request instanceof Request) {
    return {
      ipAddress: request.headers.get('x-forwarded-for'),
      referer: request.headers.get('referer'),
      ua: request.headers.get('user-agent'),
      requestId: uuid4()
    } as RequestContext
  }
  let xff = request.headers['x-forwarded-for'];
  let referer = request.headers['referer'];
  let ua = request.headers['user-agent'];
  return {
    ipAddress: xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1',
    referer: referer,
    ua: ua,
    requestId: uuid4()
  } as RequestContext
}
