import { expect, test } from "vitest";
import { Archive, Series, Tag } from "../../../src/models/models";
import {
  aggregateActivity,
  aggregateStatistics,
  buildContributionCalendar,
  calcYearsActive,
  excludeByYears,
  rankTags,
  stackByYear
} from "../../../src/services/statistics";
import { toDate } from "../../../src/utils/time";

/* NOTE:
  Activity bucketing defaults to JST (Asia/Tokyo), so the expected values below
  are deterministic regardless of the runtime's local timezone (local / CI).
*/
const epoch20220315 = 1647345600; // 2022-03-15T12:00:00Z = 2022-03-15 21:00 JST (Tue)
const epoch20220315Boundary = 1647374400; // 2022-03-15T20:00:00Z = 2022-03-16 05:00 JST (Wed)
const epoch20220320 = 1647777600; // 2022-03-20T12:00:00Z = 2022-03-20 21:00 JST (Sun)
const epoch20221110 = 1668081600; // 2022-11-10T12:00:00Z = 2022-11-10 21:00 JST (Thu)
const epoch20240615 = 1718452800; // 2024-06-15T12:00:00Z = 2024-06-15 21:00 JST (Sat)
const epoch19840615 = 456148800; // 1984-06-15T12:00:00Z = 1984-06-15 21:00 JST
const epoch19841231Boundary = 473371200; // 1984-12-31T20:00:00Z = 1985-01-01 05:00 JST

const publishedAt: Array<number> = [
  epoch20240615,
  epoch20220315,
  epoch20220315Boundary,
  epoch20221110,
  epoch20220320
];

const tags: Array<Tag> = [
  { id: "1", name: "scala", path: "scala", count: 30 },
  { id: "2", name: "rust", path: "rust", count: 5 },
  { id: "3", name: "typescript", path: "typescript", count: 12 },
  { id: "4", name: "java", path: "java", count: 12 }
];

const series: Array<Series> = [
  { id: "1", name: "seriesA", path: "seriesA", title: 1, description: "a" },
  { id: "2", name: "seriesB", path: "seriesB", title: 2, description: "b" }
];

function sumOf(buckets) {
  return {
    months: buckets.months.reduce((acc, m) => acc + m.count, 0),
    daysOfWeek: buckets.daysOfWeek.reduce((acc, d) => acc + d.count, 0),
    hours: buckets.hours.reduce((acc, h) => acc + h.count, 0),
    punchCard: buckets.punchCard.flat().reduce((acc, c) => acc + c, 0)
  };
}

test("aggregateActivity: years are the ones which have posts, in order of appearance (same as archives page)", () => {
  const result = aggregateActivity(publishedAt);

  // fixture order: 2024 post first, then 2022 posts. no zero-filled 2023.
  expect(result.byYear.map((y) => y.year)).toEqual(["2024", "2022"]);
});

test("aggregateActivity: bucket shapes are fixed (12 months, 7 days, 24 hours, 7x24 punch card)", () => {
  const result = aggregateActivity(publishedAt);

  for (const buckets of [result.all, ...result.byYear.map((y) => y.buckets)]) {
    expect(buckets.months.map((m) => m.month)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ]);
    expect(buckets.daysOfWeek.map((d) => d.day)).toEqual([
      "mon",
      "tue",
      "wed",
      "thu",
      "fri",
      "sat",
      "sun"
    ]);
    expect(buckets.hours.length).toEqual(24);
    expect(buckets.hours[0].hour).toEqual("00");
    expect(buckets.hours[23].hour).toEqual("23");
    expect(buckets.punchCard.length).toEqual(7);
    buckets.punchCard.forEach((row) => expect(row.length).toEqual(24));
  }
});

test("aggregateActivity: buckets months in JST by default", () => {
  const result = aggregateActivity(publishedAt);

  const y2022 = result.byYear.find((y) => y.year === "2022").buckets;
  expect(y2022.months[2].count).toEqual(3); // Mar: 15th, 16th(JST boundary), 20th
  expect(y2022.months[10].count).toEqual(1); // Nov
  const y2024 = result.byYear.find((y) => y.year === "2024").buckets;
  expect(y2024.months[5].count).toEqual(1); // Jun
});

test("aggregateActivity: buckets days of week and hours in JST by default", () => {
  const result = aggregateActivity(publishedAt);

  const all = result.all;
  // 12:00 UTC = 21:00 JST (same day), 20:00 UTC = 05:00 JST next day
  expect(all.hours[21].count).toEqual(4);
  expect(all.hours[5].count).toEqual(1);

  const dayCount = (day: string) =>
    all.daysOfWeek.find((d) => d.day === day).count;
  expect(dayCount("tue")).toEqual(1); // 2022-03-15 21:00 JST
  expect(dayCount("wed")).toEqual(1); // 2022-03-16 05:00 JST (crossed the JST date boundary)
  expect(dayCount("thu")).toEqual(1);
  expect(dayCount("fri")).toEqual(0);
  expect(dayCount("sat")).toEqual(1);
  expect(dayCount("sun")).toEqual(1);
});

test("aggregateActivity: respects the given timezone", () => {
  const result = aggregateActivity(publishedAt, "UTC");

  const all = result.all;
  // in UTC the boundary post (2022-03-15T20:00:00Z) stays on Tuesday 20:00
  expect(all.hours[20].count).toEqual(1);
  expect(all.hours[12].count).toEqual(4);
  expect(all.hours[5].count).toEqual(0);
  expect(all.daysOfWeek.find((d) => d.day === "tue").count).toEqual(2);
  expect(all.daysOfWeek.find((d) => d.day === "wed").count).toEqual(0);
});

test("aggregateActivity: builds the punch card matrix", () => {
  const result = aggregateActivity(publishedAt);

  const all = result.all;
  expect(all.punchCard[1][21]).toEqual(1); // Tue 21:00
  expect(all.punchCard[2][5]).toEqual(1); // Wed 05:00
  expect(all.punchCard[3][21]).toEqual(1); // Thu 21:00
  expect(all.punchCard[5][21]).toEqual(1); // Sat 21:00
  expect(all.punchCard[6][21]).toEqual(1); // Sun 21:00
});

test("aggregateActivity: every bucket sums up to the total posts", () => {
  const result = aggregateActivity(publishedAt);

  expect(sumOf(result.all)).toEqual({
    months: publishedAt.length,
    daysOfWeek: publishedAt.length,
    hours: publishedAt.length,
    punchCard: publishedAt.length
  });
});

test("aggregateActivity: empty input returns empty activity", () => {
  const result = aggregateActivity([]);

  expect(result.byYear).toEqual([]);
  expect(sumOf(result.all)).toEqual({
    months: 0,
    daysOfWeek: 0,
    hours: 0,
    punchCard: 0
  });
});

test("stackByYear: builds year-stacked rows with years ascending", () => {
  const { byYear } = aggregateActivity(publishedAt);
  const result = stackByYear(byYear, "months");

  expect(result.years).toEqual(["2022", "2024"]);
  expect(result.rows.length).toEqual(12);
  expect(result.rows[2]).toEqual({ label: "03", "2022": 3, "2024": 0 });
  expect(result.rows[5]).toEqual({ label: "06", "2022": 0, "2024": 1 });
});

test("stackByYear: supports daysOfWeek and hours buckets", () => {
  const { byYear } = aggregateActivity(publishedAt);

  const daysOfWeek = stackByYear(byYear, "daysOfWeek");
  expect(daysOfWeek.rows.length).toEqual(7);
  expect(daysOfWeek.rows[1]).toEqual({ label: "tue", "2022": 1, "2024": 0 });

  const hours = stackByYear(byYear, "hours");
  expect(hours.rows.length).toEqual(24);
  expect(hours.rows[21]).toEqual({ label: "21", "2022": 3, "2024": 1 });
});

test("stackByYear: empty input returns empty result", () => {
  expect(stackByYear([], "months")).toEqual({ years: [], rows: [] });
});

test("buildContributionCalendar: builds Monday-first weeks covering the whole year", () => {
  const calendar = buildContributionCalendar(publishedAt, "2022");

  // 2022-01-01 is Saturday -> 5 leading empty cells in a Monday-first week
  expect(calendar.weeks.length).toEqual(53);
  expect(calendar.weeks[0].slice(0, 5)).toEqual([null, null, null, null, null]);
  expect(calendar.weeks[0][5].date).toEqual("2022-01-01");

  const days = calendar.weeks.flat().filter((d) => d !== null);
  expect(days.length).toEqual(365);
  expect(days[0].date).toEqual("2022-01-01");
  expect(days[days.length - 1].date).toEqual("2022-12-31");
});

test("buildContributionCalendar: counts posts per date in JST by default", () => {
  const calendar = buildContributionCalendar(publishedAt, "2022");

  expect(calendar.total).toEqual(4);
  const countOf = (date: string) =>
    calendar.weeks.flat().find((d) => d && d.date === date).count;
  expect(countOf("2022-03-15")).toEqual(1);
  expect(countOf("2022-03-16")).toEqual(1); // 2022-03-15T20:00Z crosses to the next day in JST
  expect(countOf("2022-03-20")).toEqual(1);
  expect(countOf("2022-11-10")).toEqual(1);
  expect(countOf("2022-03-17")).toEqual(0);
});

test("buildContributionCalendar: respects the given timezone", () => {
  const calendar = buildContributionCalendar(publishedAt, "2022", "UTC");

  const countOf = (date: string) =>
    calendar.weeks.flat().find((d) => d && d.date === date).count;
  expect(countOf("2022-03-15")).toEqual(2); // both posts stay on the 15th in UTC
  expect(countOf("2022-03-16")).toEqual(0);
});

test("buildContributionCalendar: handles leap years", () => {
  const calendar = buildContributionCalendar([], "2024");

  const days = calendar.weeks.flat().filter((d) => d !== null);
  expect(days.length).toEqual(366);
  // 2024-01-01 is Monday -> no leading empty cells
  expect(calendar.weeks[0][0].date).toEqual("2024-01-01");
  expect(calendar.total).toEqual(0);
  expect(days.every((d) => d.count === 0)).toBe(true);
});

test("excludeByYears: excludes posts published in the given years", () => {
  const result = excludeByYears([epoch19840615, ...publishedAt], ["1984"]);

  expect(result).toEqual(publishedAt);
});

test("excludeByYears: judges years in the given timezone", () => {
  // 1984-12-31T20:00:00Z is 1985-01-01 05:00 in JST
  const boundary = [epoch19841231Boundary];

  expect(excludeByYears(boundary, ["1984"]).length).toEqual(1); // JST -> 1985
  expect(excludeByYears(boundary, ["1985"]).length).toEqual(0);
  expect(excludeByYears(boundary, ["1984"], "UTC").length).toEqual(0);
});

test("excludeByYears: empty years or posts return the input as is", () => {
  expect(excludeByYears(publishedAt, [])).toEqual(publishedAt);
  expect(excludeByYears([], ["1984"])).toEqual([]);
});

test("rankTags: sorts by count desc with name tie-break and caps at limit", () => {
  expect(rankTags(tags, 3)).toEqual([
    { name: "scala", path: "scala", count: 30 },
    { name: "java", path: "java", count: 12 },
    { name: "typescript", path: "typescript", count: 12 }
  ]);
});

test("rankTags: limit larger than input returns all tags", () => {
  expect(rankTags(tags, 20).length).toEqual(4);
});

test("rankTags: empty input returns empty array", () => {
  expect(rankTags([], 20)).toEqual([]);
});

test("calcYearsActive: counts calendar years from the oldest post", () => {
  expect(calcYearsActive(publishedAt, toDate(epoch20240615))).toEqual(3);
});

test("calcYearsActive: same year returns 1", () => {
  expect(calcYearsActive([epoch20220315], toDate(epoch20221110))).toEqual(1);
});

test("calcYearsActive: empty input returns 0", () => {
  expect(calcYearsActive([], toDate(epoch20240615))).toEqual(0);
});

test("aggregateStatistics: aggregates server-side statistics", () => {
  const archives: Array<Archive> = publishedAt.map((p) => {
    return { path: `/example/${p}`, title: "example", publishedAt: p };
  });
  const result = aggregateStatistics(archives, tags, series, 2);

  expect(result.publishedAt).toEqual(publishedAt);
  expect(result.totalTags).toEqual(4);
  expect(result.totalSeries).toEqual(2);
  expect(result.topTags).toEqual([
    { name: "scala", path: "scala", count: 30 },
    { name: "java", path: "java", count: 12 }
  ]);
  // typescript(12) + rust(5)
  expect(result.otherTagsCount).toEqual(17);
});

test("aggregateStatistics: no other tags when the limit covers all tags", () => {
  const result = aggregateStatistics([], tags, [], 20);

  expect(result.topTags.length).toEqual(4);
  expect(result.otherTagsCount).toEqual(0);
});

test("aggregateStatistics: empty inputs return zero values", () => {
  const result = aggregateStatistics([], [], []);

  expect(result.publishedAt).toEqual([]);
  expect(result.totalTags).toEqual(0);
  expect(result.totalSeries).toEqual(0);
  expect(result.topTags).toEqual([]);
  expect(result.otherTagsCount).toEqual(0);
});
