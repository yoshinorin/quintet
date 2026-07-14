"use server";

import { headers } from "next/headers";
import * as config from "../../../config";
import { fetchAllSeries, fetchAllTags, fetchArchives } from "../../api";
import {
  ArchiveResponse,
  SeriesResponse,
  Statistics,
  Tag
} from "../../models/models";
import {
  STATISTICS_TIME_ZONE,
  aggregateStatistics
} from "../../services/statistics";
import { parseOrThrow, runWithHandleError } from "../handler";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleError(await fn(req));
}

async function handler(req: any) {
  const h = await headers();
  const [archivesResponse, tagsResponse, seriesResponse] = await Promise.all([
    fetchArchives(h),
    fetchAllTags(h),
    fetchAllSeries(h)
  ]);
  const [archives, tags, series] = await Promise.all([
    parseOrThrow<Array<ArchiveResponse>>(archivesResponse),
    parseOrThrow<Array<Tag>>(tagsResponse),
    parseOrThrow<Array<SeriesResponse>>(seriesResponse)
  ]);

  // NOTE: all optional configs. The first timezone is the default selection.
  const statisticsPage = (config as any).statisticsPage ?? {};
  const statistics: Statistics = aggregateStatistics(
    archives,
    tags,
    series,
    statisticsPage.topTags ?? 15
  );
  const timeZones: Array<string> = Array.from(
    new Set([
      statisticsPage.timeZone ?? STATISTICS_TIME_ZONE,
      ...(statisticsPage.timeZones ?? [])
    ])
  );
  const excludeYears: Array<string> = statisticsPage.excludeYears ?? [];

  return {
    props: {
      statistics: statistics,
      timeZones: timeZones,
      excludeYears: excludeYears
    }
  };
}
