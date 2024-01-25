import { RequestContext } from '../models/models';
import { requestHeaderFrom } from "./utils/header"

export async function fetchFromApi(
  endpoint: string,
  ctx: RequestContext | null
): Promise<Response> {

  // TODO: build query paramas etc...

  const header = ctx ? { header: requestHeaderFrom(ctx) } : {};
  return fetch(
    endpoint,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: header as any
    }
  )
}
