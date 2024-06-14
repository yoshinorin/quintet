"use server";

import { headers } from "next/headers";
import { api } from "../../../config";
import { fetchFromApi } from "../../api/request";
import { Series, SeriesResponse } from "../../models/models";
import { requestContextFrom } from "../../utils/requestContext";
import { buildUrl, sluggize } from "../../utils/url";
import { runWithHandleErrorIf, throwIfError } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const ctx = requestContextFrom(headers());
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "series"]), true);
  const response: Response = await fetchFromApi(url, null, ctx, null);
  throwIfError(response);

  const seriesResponse: Array<SeriesResponse> =
    (await response.json()) as Array<SeriesResponse>;
  const series: Array<Series> = seriesResponse.map((series) => {
    return {
      id: series.id,
      name: series.name,
      title: series.title,
      description: series.description
    } as Series;
  });

  return {
    props: {
      series: series
    }
  };
}
