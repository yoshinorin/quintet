"use server";

import { headers } from "next/headers";
import * as config from "../../config";
import { fetchArchives } from "../api";
import {
  ArchiveResponse,
  Article,
  ContributionCalendar
} from "../models/models";
import {
  STATISTICS_TIME_ZONE,
  buildRollingContributionCalendar
} from "../services/statistics";
import { parseOrThrow, runWithHandleError } from "./handler";
import { Renderer } from "./renderer";

const RECENT_ARTICLES_COUNT = 5;

export default async function Page(req: any) {
  const fn = async (r: any): Promise<any> => {
    const { props } = await handler(r);
    return <Renderer {...props} />;
  };
  return runWithHandleError(await fn(req));
}

async function handler(req: any) {
  const h = await headers();
  const archivesResponse = await fetchArchives(h);
  const archives = await parseOrThrow<Array<ArchiveResponse>>(archivesResponse);

  // NOTE: /v1/archives is ordered by publishedAt desc and the home page shows
  // only the date and the title, so the articles API is not needed here.
  const articles: Array<Article> = archives
    .slice(0, RECENT_ARTICLES_COUNT)
    .map((archive) => {
      return {
        path: archive.path,
        title: archive.title,
        publishedAt: archive.publishedAt
      } as Article;
    });

  // GitHub like: the past 365 days. `excludeYears` is not applied here
  // because the dummy-dated posts can never fall into the window.
  const statisticsPage = (config as any).statisticsPage ?? {};
  const contributions: ContributionCalendar = buildRollingContributionCalendar(
    archives.map((archive) => archive.publishedAt),
    new Date(),
    statisticsPage.timeZone ?? STATISTICS_TIME_ZONE
  );

  return {
    props: {
      articles: articles,
      contributions: contributions
    }
  };
}
