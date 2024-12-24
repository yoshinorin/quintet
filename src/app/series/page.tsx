"use server";

import { headers } from "next/headers";
import { fetchAllSeries } from "../../api";
import { Series, SeriesResponse } from "../../models/models";
import { parseOrThrow, runWithHandleErrorIf } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleErrorIf(await fn(req));
}

async function handler(req: any) {
  const response: Response = await fetchAllSeries(await headers());
  const seriesResponse = await parseOrThrow<Array<SeriesResponse>>(response);
  const series: Array<Series> = seriesResponse.map((series) => {
    return series;
  });

  return {
    props: {
      series: series
    }
  };
}
