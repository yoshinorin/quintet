'use server';

import { getRequestContext } from '../../utils/requestContext';
import { SearchResponse, SearchResponseWithCount } from '../../models/search';
import { search } from '../../api/search';
import { Renderer } from './renderer';

const emptyResult = {
  count: 0,
  contents: []
} as SearchResponseWithCount;

export default async function Page(ctx: any) {
  const { props } = await get(ctx);
  return <Renderer {...props} />;
}

// TODO: fix (can't fetch and redirect )
async function get(ctx: any) {
  // TODO: refactor
  // TODO: assert query params
  try {
    console.log(ctx.searchParams['q'])
    if (ctx.searchParams['q'] === undefined) {
      return {
        props: {
          statusCode: ctx.res.statusCode,
          hits: 0,
          count: 0,
          contents: [],
          queryStrings: [],
        }
      }
    }
    const qs = ctx.searchParams['q'] instanceof Array ? ctx.searchParams['q'] : [ctx.searchParams['q']]
    if (qs.length > 0) {
      const result = await execute(ctx, qs);
      return {
        props: {
          statusCode: 422,  // TODO
          hits: result.count,
          count: result.contents.length,
          contents: result.contents,
          queryStrings: qs,
        }
      }
    } else {
      return {
        props: {
          statusCode: 422,  // TODO
          hits: 0,
          count: 0,
          contents: [],
          queryStrings: qs,
        }
      }
    }
  } catch {
    return {
      props: {
        statusCode: 422,  // TODO
        hits: 0,
        count: 0,
        contents: [],
        queryStrings: [],
      }
    }
  }

}

async function execute(ctx, words: Array<string>) {
  console.log(words);
  const response = await search(getRequestContext(ctx.req), words);
  console.log(response);
  // ctx.res.statusCode = response.status;
  if (response.status !== 200) {
    return emptyResult;
  }
  const sr = await response.json() as SearchResponseWithCount;
  if (sr.count === 0) {
    return emptyResult;
  }
  let contents = [];
  contents = sr.contents.map(content => {
    return {
      path: content.path,
      title: content.title,
      content: content.content,
      publishedAt: content.publishedAt
    } as SearchResponse});

  return {
    count: sr.count,
    contents: contents
  } as SearchResponseWithCount
  // TODO: Error handling
}
