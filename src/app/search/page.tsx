"use server";

import { headers } from "next/headers";
import { api } from "../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../api/request";
import {
  SearchResponse,
  SearchResponseWithCount,
  SearchSuccessResult
} from "../../models/models";
import { ProblemDetails, isProblemDetails } from "../../models/problemDetails";
import { requestContextFrom } from "../../utils/requestContext";
import { buildQueryParams, buildUrl, sluggize } from "../../utils/url";
import { Renderer } from "./renderer";

const emptyResult = {
  count: 0,
  contents: []
} as SearchResponseWithCount;

export default async function Page(req: any) {
  if (req.searchParams["q"] === undefined) {
    const err = {
      title: "Unknown Error",
      status: 422,
      detail: "Unknown Error",
      instance: "Unknown Error",
      errors: [] as Array<string>
    } as ProblemDetails;
    return <Renderer props={err} qs={[]} />;
  }

  const qs =
    req.searchParams["q"] instanceof Array
      ? req.searchParams["q"]
      : [req.searchParams["q"]];

  const result: SearchSuccessResult | ProblemDetails = await handler(req, qs);
  return <Renderer props={result} qs={qs} />;
}

async function handler(
  req: any,
  qs: Array<string>
): Promise<SearchSuccessResult | ProblemDetails> {
  // TODO: refactor
  // TODO: assert query params before POST to server
  try {
    const result: SearchResponseWithCount | ProblemDetails = await execute(
      req,
      qs
    );
    if (isProblemDetails(result)) {
      return {
        title: result.title,
        status: result.status,
        detail: result.detail,
        instance: result.instance,
        errors: result.errors
      };
    }
    return {
      statusCode: 200,
      hits: result.count,
      count: result.contents.length,
      contents: result.contents,
      queryStrings: qs
    } as SearchSuccessResult;
  } catch (e) {
    return {
      title: "Unknown Error",
      status: 500,
      detail: "Unknown Error",
      instance: "Unknown Error",
      errors: [] as Array<string>
    } as ProblemDetails;
  }
}

async function execute(
  req,
  words: Array<string>
): Promise<SearchResponseWithCount | ProblemDetails> {
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "search"]), false);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx),
    queryParams: buildQueryParams({
      params: { key: "q", values: words }
    })
  };

  const response = await fetchFromApi(url, options);
  const responseBody = await response.json();

  if (response.status !== 200) {
    return responseBody as ProblemDetails;
  }

  const searchResponseWithCount = responseBody as SearchResponseWithCount;
  if (searchResponseWithCount.count === 0) {
    return emptyResult;
  }
  let contents = [];
  contents = (searchResponseWithCount as SearchResponseWithCount).contents.map(
    (content) => {
      return {
        path: content.path,
        title: content.title,
        content: content.content,
        publishedAt: content.publishedAt
      } as SearchResponse;
    }
  );

  return {
    count: searchResponseWithCount.count,
    contents: contents
  } as SearchResponseWithCount;
}
