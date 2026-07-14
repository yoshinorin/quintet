export interface MonthlyCount {
  // "01".."12"
  month: string;
  count: number;
}

export interface DayOfWeekCount {
  // "mon".."sun"
  day: string;
  count: number;
}

export interface HourCount {
  // "00".."23"
  hour: string;
  count: number;
}

export interface ActivityBuckets {
  // always 12 elements ("01".."12"), zero-filled
  months: Array<MonthlyCount>;
  // always 7 elements, Monday first, zero-filled
  daysOfWeek: Array<DayOfWeekCount>;
  // always 24 elements ("00".."23"), zero-filled
  hours: Array<HourCount>;
  // 7 rows (Monday first) x 24 columns ("00".."23")
  punchCard: Array<Array<number>>;
}

export interface YearlyActivity {
  year: string;
  buckets: ActivityBuckets;
}

export interface Activity {
  // aggregation over all years
  all: ActivityBuckets;
  // ascending by year, consecutive years through the current year
  byYear: Array<YearlyActivity>;
}

export interface ContributionDay {
  // "2023-12-20"
  date: string;
  count: number;
}

export interface ContributionCalendar {
  year: string;
  // total posts in the year
  total: number;
  // columns = weeks; each week has 7 cells (Monday first); null = out of the year
  weeks: Array<Array<ContributionDay | null>>;
}

export interface YearlyStackedCounts {
  // ascending by year
  years: Array<string>;
  // one row per bucket: { label: "01", "2022": 3, "2023": 1, ... }
  rows: Array<{ [key: string]: string | number }>;
}

export interface TagRank {
  name: string;
  path: string;
  count: number;
}

/* NOTE:
  Timezone-dependent values (total posts, years active, activity) are calculated
  on the client from `publishedAt` so that the timezone can be switched in the
  browser without a server round-trip.
*/
export interface Statistics {
  // publishedAt (unix time) of all posts
  publishedAt: Array<number>;
  totalTags: number;
  totalSeries: number;
  // descending by count
  topTags: Array<TagRank>;
  // sum of the counts of all tags not included in topTags
  otherTagsCount: number;
}
