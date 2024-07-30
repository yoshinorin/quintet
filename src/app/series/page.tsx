"use server";

import { headers } from "next/headers";
import { fetchAllSeries } from "../../api";
import { Series, SeriesResponse } from "../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  return runWithHandleErrorIf(await run(req));
}

async function run(req: any): Promise<any> {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await fetchAllSeries(headers());
  const seriesResponse = await parseOrThrow<Array<SeriesResponse>>(response);
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
