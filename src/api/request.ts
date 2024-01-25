import { RequestContext } from '../models/models';
import { requestHeaderFrom } from "./utils/header"

// TODO: write test code
export async function fetchFromApi(
  endpoint: string,
  ctx: RequestContext | null,
  options: {
    queryParams: Array<string>,
    pagenation: {
      page: number,
      limit: number
    }
  } | null = null
): Promise<Response> {

  const header = ctx ? { header: requestHeaderFrom(ctx) } : {};
  // TODO: extract to function & write test code
  if (options) {
    let queryParams = '';
    let pagenationParams = '';
    if (options.queryParams) {
      queryParams = options.queryParams.map(q => `q=${q}`).join('&');
    }
    if (options.pagenation) {
      pagenationParams = `page=${options.pagenation.page}&limit=${options.pagenation.limit}`;
    }
    endpoint = endpoint + '?' + queryParams + pagenationParams;
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
