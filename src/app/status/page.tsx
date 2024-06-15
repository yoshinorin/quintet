"use server";

import { headers } from "next/headers";
import { api } from "../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../api/request";
import { requestContextFrom } from "../../utils/requestContext";
import { buildUrl, sluggize } from "../../utils/url";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "system", "health"]), false);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx)
  };
  const response: Response = await fetchFromApi(url, options);

  return {
    props: {
      statusCode: response.status
    }
  };
}
