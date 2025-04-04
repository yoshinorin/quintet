"use server";

import { headers } from "next/headers";
import { fetchSearch } from "../../api";
import {
  SearchResponseWithCount,
  SearchSuccessResult
} from "../../models/models";
import { ProblemDetails, isProblemDetails } from "../../models/problemDetails";
import { Renderer } from "./renderer";

const emptyResult = {
  count: 0,
  contents: []
} as SearchResponseWithCount;

export default async function Page(req: any) {
  const queryString = await req.searchParams;
  if (queryString.q === undefined) {
    const err = {
      title: "Unknown Error",
      status: 422,
      detail: "Unknown Error",
      instance: "Unknown Error",
      errors: [] as Array<string>
    } as ProblemDetails;
    return <Renderer props={err} qs={[]} />;
  }

  let qs = queryString.q instanceof Array ? queryString.q : [queryString.q];

  qs = qs.map((x) => x.trim()).filter((x) => x.length !== 0);

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
  const response = await fetchSearch(await headers(), words);
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
      return content;
    }
  );

  return {
    count: searchResponseWithCount.count,
    contents: contents
  } as SearchResponseWithCount;
}
