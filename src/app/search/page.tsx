'use server';

import { headers } from 'next/headers';
import { requestContextFrom } from '../../utils/requestContext';
import { SearchResponse, SearchResponseWithCount } from '../../models/models';
import { fetchFromApi } from '../../api/request';
import { Renderer } from './renderer';
import { api } from '../../../config';
import { buildQueryParams, buildUrl, sluggize } from '../../utils/url';

const emptyResult = {
  count: 0,
  contents: []
} as SearchResponseWithCount;

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  // TODO: refactor
  // TODO: assert query params before POST to server
  try {
    if (req.searchParams['q'] === undefined) {
      return {
        props: {
          statusCode: req.res.statusCode,
          hits: 0,
          count: 0,
          contents: [],
          queryStrings: [],
        }
      }
    }
    const qs = req.searchParams['q'] instanceof Array ? req.searchParams['q'] : [req.searchParams['q']]
    if (qs.length > 0) {
      const result = await execute(req, qs);
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

async function execute(req, words: Array<string>) {
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(['v1', 'search']), false);
  const queryParams = buildQueryParams( { params: { key: 'q', values: words }})
  const response = await fetchFromApi(url, queryParams, ctx, null);

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

