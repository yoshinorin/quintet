import {
  Activity,
  ActivityBuckets,
  Archive,
  ContributionCalendar,
  ContributionDay,
  Series,
  Statistics,
  Tag,
  TagRank,
  YearlyActivity,
  YearlyStackedCounts
} from "../models/models";
import { splittedBy, toDate } from "../utils/time";

/* NOTE:
  Day-of-week and hour buckets are meaningless unless they are calculated in the
  timezone the author actually writes in, so bucketing uses a fixed timezone
  (configurable via `statisticsPage.timeZone` in config.js) instead of the
  runtime's local timezone.

  All aggregation functions take `Array<number>` (publishedAt unix times) and are
  isomorphic: the statistics page runs them in the browser so that the timezone
  can be switched without a server round-trip.
*/
export const STATISTICS_TIME_ZONE = "Asia/Tokyo";

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const WEEKDAY_INDEXES: { [key: string]: number } = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6
};

// same logic as the archives page (`ArchivesComponent`)
function yearMonthOf(
  unixTime: number,
  timeZone: string
): { year: string; monthIndex: number } {
  const d = splittedBy(unixTime, "ja-JP", "/", timeZone);
  return { year: d[0], monthIndex: parseInt(d[1], 10) - 1 };
}

function makeDayHourExtractor(
  timeZone: string
): (date: Date) => { dayIndex: number; hourIndex: number } {
  const format = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23"
  });
  return (date: Date) => {
    const parts: { [key: string]: string } = {};
    for (const p of format.formatToParts(date)) {
      parts[p.type] = p.value;
    }
    return {
      dayIndex: WEEKDAY_INDEXES[parts["weekday"]],
      hourIndex: parseInt(parts["hour"], 10)
    };
  };
}

function emptyBuckets(): ActivityBuckets {
  return {
    months: Array.from({ length: 12 }, (_, i) => {
      return { month: String(i + 1).padStart(2, "0"), count: 0 };
    }),
    daysOfWeek: WEEKDAY_KEYS.map((day) => {
      return { day, count: 0 };
    }),
    hours: Array.from({ length: 24 }, (_, i) => {
      return { hour: String(i).padStart(2, "0"), count: 0 };
    }),
    punchCard: Array.from({ length: 7 }, () => new Array(24).fill(0))
  };
}

// NOTE: years are judged in the given timezone, same as the activity bucketing.
export function excludeByYears(
  publishedAt: Array<number>,
  years: Array<string>,
  timeZone: string = STATISTICS_TIME_ZONE
): Array<number> {
  if (
    !publishedAt ||
    publishedAt.length === 0 ||
    !years ||
    years.length === 0
  ) {
    return publishedAt ?? [];
  }
  return publishedAt.filter(
    (unixTime) => !years.includes(yearMonthOf(unixTime, timeZone).year)
  );
}

export function aggregateActivity(
  publishedAt: Array<number>,
  timeZone: string = STATISTICS_TIME_ZONE
): Activity {
  if (!publishedAt || publishedAt.length === 0) {
    return { all: emptyBuckets(), byYear: [] };
  }

  const dayHourOf = makeDayHourExtractor(timeZone);
  const all = emptyBuckets();
  // NOTE: years are the ones which have at least one post, in order of
  // appearance in the archives response (same logic as the archives page).
  const byYear = new Map<string, ActivityBuckets>();

  for (const unixTime of publishedAt) {
    const { year, monthIndex } = yearMonthOf(unixTime, timeZone);
    const { dayIndex, hourIndex } = dayHourOf(toDate(unixTime));

    if (!byYear.has(year)) {
      byYear.set(year, emptyBuckets());
    }
    for (const buckets of [all, byYear.get(year)]) {
      buckets.months[monthIndex].count += 1;
      buckets.daysOfWeek[dayIndex].count += 1;
      buckets.hours[hourIndex].count += 1;
      buckets.punchCard[dayIndex][hourIndex] += 1;
    }
  }

  return {
    all,
    byYear: Array.from(byYear.entries()).map(([year, buckets]) => {
      return { year, buckets };
    })
  };
}

// GitHub contribution graph like calendar for the given year
export function buildContributionCalendar(
  publishedAt: Array<number>,
  year: string,
  timeZone: string = STATISTICS_TIME_ZONE
): ContributionCalendar {
  const counts = new Map<string, number>();
  let total = 0;
  for (const unixTime of publishedAt ?? []) {
    const [y, m, d] = splittedBy(unixTime, "ja-JP", "/", timeZone);
    if (y !== year) {
      continue;
    }
    const date = `${y}-${m}-${d}`;
    counts.set(date, (counts.get(date) ?? 0) + 1);
    total += 1;
  }

  // weekday (Monday = 0) of a calendar date; pure calendar math, no timezone involved
  const dayIndexOf = (utcMillis: number) =>
    (new Date(utcMillis).getUTCDay() + 6) % 7;

  const yearNum = parseInt(year, 10);
  const weeks: Array<Array<ContributionDay | null>> = [];
  let week: Array<ContributionDay | null> = new Array(
    dayIndexOf(Date.UTC(yearNum, 0, 1))
  ).fill(null);

  const end = Date.UTC(yearNum, 11, 31);
  // NOTE: iterating in UTC, so adding 24h per step is safe (no DST)
  for (let t = Date.UTC(yearNum, 0, 1); t <= end; t += 24 * 60 * 60 * 1000) {
    const dt = new Date(t);
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    const date = `${year}-${mm}-${dd}`;
    week.push({ date, count: counts.get(date) ?? 0 });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return { year, total, weeks };
}

export type StackableBucketKind = "months" | "daysOfWeek" | "hours";

function labelOf(kind: StackableBucketKind, item: any): string {
  if (kind === "months") {
    return item.month;
  }
  if (kind === "daysOfWeek") {
    return item.day;
  }
  return item.hour;
}

// restructures per-year buckets into rows for a year-stacked bar chart
export function stackByYear(
  byYear: Array<YearlyActivity>,
  kind: StackableBucketKind
): YearlyStackedCounts {
  if (!byYear || byYear.length === 0) {
    return { years: [], rows: [] };
  }

  const sorted = [...byYear].sort((a, b) => a.year.localeCompare(b.year));
  const template = sorted[0].buckets[kind];
  const rows = template.map((item, idx) => {
    const row: { [key: string]: string | number } = {
      label: labelOf(kind, item)
    };
    for (const y of sorted) {
      row[y.year] = y.buckets[kind][idx].count;
    }
    return row;
  });

  return { years: sorted.map((y) => y.year), rows };
}

export function rankTags(tags: Array<Tag>, limit: number): Array<TagRank> {
  if (!tags || tags.length === 0) {
    return [];
  }
  return [...tags]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, Math.max(0, limit))
    .map((tag) => {
      return { name: tag.name, path: tag.path, count: tag.count };
    });
}

export function calcYearsActive(
  publishedAt: Array<number>,
  now: Date,
  timeZone: string = STATISTICS_TIME_ZONE
): number {
  if (!publishedAt || publishedAt.length === 0) {
    return 0;
  }
  const yearOf = (unixTime: number) =>
    parseInt(yearMonthOf(unixTime, timeZone).year, 10);
  const firstYear = Math.min(...publishedAt.map(yearOf));
  const nowYear = yearOf(Math.floor(now.getTime() / 1000));
  return Math.max(1, nowYear - firstYear + 1);
}

export function aggregateStatistics(
  archives: Array<Archive>,
  tags: Array<Tag>,
  series: Array<Series>,
  topTagsLimit: number = 15
): Statistics {
  const a = archives ?? [];
  const t = tags ?? [];
  const s = series ?? [];
  const topTags = rankTags(t, topTagsLimit);
  const totalTagCount = t.reduce((acc, tag) => acc + tag.count, 0);
  const topTagCount = topTags.reduce((acc, tag) => acc + tag.count, 0);
  return {
    publishedAt: a.map((archive) => archive.publishedAt),
    totalTags: t.length,
    totalSeries: s.length,
    topTags: topTags,
    otherTagsCount: totalTagCount - topTagCount
  };
}
