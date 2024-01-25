import { RequestContext } from '../models/models';
import { requestHeaderFrom } from "./utils/header"

// TODO: write test code
export async function fetchFromApi(
  endpoint: string,
  ctx: RequestContext | null,
  options: {
    queryParams: Array<string>
  } | null = null
): Promise<Response> {

  const header = ctx ? { header: requestHeaderFrom(ctx) } : {};
  if (options) {
    if (options.queryParams) {
      endpoint = endpoint + '?' + options.queryParams.map(q => `q=${q}`).join('&');
    }
  }

  return fetch(
    endpoint,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: header as any
    }
  )
}
