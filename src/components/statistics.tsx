"use client";

import React, { useMemo, useState } from "react";
import {
  ActivityBuckets,
  ContributionCalendar,
  Statistics,
  TagRank
} from "../models/models";
import {
  aggregateActivity,
  buildContributionCalendar,
  calcYearsActive,
  excludeByYears,
  stackByYear
} from "../services/statistics";
import containerStyles from "../styles/components/container.module.scss";
import styles from "../styles/statistics.module.scss";
import { KeyValueDropdownComponent } from "./dropdown";
import {
  CountBarChartComponent,
  StackedCountBarChartComponent,
  TagShare,
  TagsPieChartComponent,
  tagShareColor
} from "./statisticsChart";

const ALL_YEARS = "all";
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const StatisticsComponent: React.FunctionComponent<{
  statistics: Statistics;
  timeZones: Array<string>;
  excludeYears: Array<string>;
}> = ({ statistics, timeZones, excludeYears }) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const [selectedYear, setSelectedYear] = useState(ALL_YEARS);

  // NOTE: timezone-dependent values are (re-)aggregated in the browser
  const { totalPosts, yearsActive, activity, filteredPublishedAt } =
    useMemo(() => {
      const publishedAt = excludeByYears(
        statistics.publishedAt,
        excludeYears,
        selectedTimeZone
      );
      return {
        totalPosts: publishedAt.length,
        yearsActive: calcYearsActive(publishedAt, new Date(), selectedTimeZone),
        activity: aggregateActivity(publishedAt, selectedTimeZone),
        filteredPublishedAt: publishedAt
      };
    }, [statistics.publishedAt, excludeYears, selectedTimeZone]);

  const years = activity.byYear.map((y) => y.year);
  // keep the year selection when switching timezones, unless it disappeared
  const effectiveYear =
    selectedYear === ALL_YEARS || years.includes(selectedYear)
      ? selectedYear
      : ALL_YEARS;
  const buckets: ActivityBuckets =
    effectiveYear === ALL_YEARS
      ? activity.all
      : activity.byYear.find((y) => y.year === effectiveYear)?.buckets;
  // when ALL is selected, bar charts are stacked by year
  const isStacked = effectiveYear === ALL_YEARS && activity.byYear.length > 1;
  // the contribution calendar shows the latest year when ALL is selected
  const calendarYear =
    effectiveYear === ALL_YEARS
      ? years.length !== 0
        ? [...years].sort().pop()
        : null
      : effectiveYear;
  const calendar =
    calendarYear !== null
      ? buildContributionCalendar(
          filteredPublishedAt,
          calendarYear,
          selectedTimeZone
        )
      : null;

  return (
    <section className={containerStyles["container"]}>
      <div className={styles["stat-cards"]}>
        <StatCard value={totalPosts} label="posts" href="/archives" />
        <StatCard value={statistics.totalTags} label="tags" href="/tags" />
        <StatCard
          value={statistics.totalSeries}
          label="series"
          href="/series"
        />
        <StatCard value={yearsActive} label="years" />
      </div>

      {buckets && years.length !== 0 && (
        <>
          <div className={styles["section-title"]}>Posts Activity</div>
          <div className={styles["chart-controls"]}>
            <KeyValueDropdownComponent
              options={[
                { value: ALL_YEARS, label: "ALL" },
                ...years.map((year) => {
                  return { value: year, label: year };
                })
              ]}
              defaultValue={effectiveYear}
              onChange={setSelectedYear}
            />
            {timeZones.length > 1 && (
              <KeyValueDropdownComponent
                options={timeZones.map((timeZone) => {
                  return { value: timeZone, label: timeZone };
                })}
                defaultValue={selectedTimeZone}
                onChange={setSelectedTimeZone}
              />
            )}
          </div>

          {calendar && (
            <>
              <div className={styles["chart-title"]}>
                Contributions ({calendar.year}, {selectedTimeZone})
              </div>
              <ContributionCalendarView calendar={calendar} />
            </>
          )}

          <div className={styles["chart-title"]}>
            Punch Card ({selectedTimeZone})
          </div>
          <PunchCard punchCard={buckets.punchCard} />

          <div className={styles["chart-title"]}>Monthly Posts</div>
          {isStacked ? (
            <StackedCountBarChartComponent
              stacked={stackByYear(activity.byYear, "months")}
            />
          ) : (
            <CountBarChartComponent
              data={buckets.months.map((m) => {
                return { label: m.month, count: m.count };
              })}
            />
          )}

          <div className={styles["chart-row"]}>
            <div>
              <div className={styles["chart-title"]}>Posts by Day of Week</div>
              {isStacked ? (
                <StackedCountBarChartComponent
                  stacked={withWeekdayLabels(
                    stackByYear(activity.byYear, "daysOfWeek")
                  )}
                />
              ) : (
                <CountBarChartComponent
                  data={buckets.daysOfWeek.map((d, i) => {
                    return { label: WEEKDAY_LABELS[i], count: d.count };
                  })}
                />
              )}
            </div>
            <div>
              <div className={styles["chart-title"]}>
                Posts by Hour ({selectedTimeZone})
              </div>
              {isStacked ? (
                <StackedCountBarChartComponent
                  stacked={stackByYear(activity.byYear, "hours")}
                />
              ) : (
                <CountBarChartComponent
                  data={buckets.hours.map((h) => {
                    return { label: h.hour, count: h.count };
                  })}
                />
              )}
            </div>
          </div>
        </>
      )}

      {statistics.topTags.length !== 0 && (
        <>
          <div className={styles["section-title"]}>Top Tags (All years)</div>
          <TopTags
            tags={statistics.topTags}
            otherTagsCount={statistics.otherTagsCount}
          />
        </>
      )}
    </section>
  );
};

// stackByYear returns "mon".."sun" labels; display them in Japanese
function withWeekdayLabels(stacked: {
  years: Array<string>;
  rows: Array<{ [key: string]: string | number }>;
}) {
  return {
    years: stacked.years,
    rows: stacked.rows.map((row, i) => {
      return { ...row, label: WEEKDAY_LABELS[i] };
    })
  };
}

const StatCard: React.FunctionComponent<{
  value: number;
  label: string;
  href?: string;
}> = ({ value, label, href }) => {
  const body = (
    <>
      <div className={styles["stat-value"]}>{value}</div>
      <div className={styles["stat-label"]}>{label}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${styles["stat-card"]} ${styles["stat-card-link"]}`}>
        {body}
      </a>
    );
  }
  return <div className={styles["stat-card"]}>{body}</div>;
};

interface CellTooltip {
  x: number;
  y: number;
  text: string;
}

function useCellTooltip() {
  const [tooltip, setTooltip] = useState<CellTooltip | null>(null);
  const show = (e: React.MouseEvent, text: string) =>
    setTooltip({ x: e.clientX, y: e.clientY, text });
  const hide = () => setTooltip(null);
  return { tooltip, show, hide };
}

const CellTooltipView: React.FunctionComponent<{
  tooltip: CellTooltip | null;
}> = ({ tooltip }) => {
  if (!tooltip) {
    return null;
  }
  return (
    <div
      className={styles["punch-tooltip"]}
      style={{ left: tooltip.x + 12, top: tooltip.y - 36 }}>
      {tooltip.text}
    </div>
  );
};

const PunchCard: React.FunctionComponent<{
  punchCard: Array<Array<number>>;
}> = ({ punchCard }) => {
  const max = Math.max(...punchCard.flat());
  const { tooltip, show, hide } = useCellTooltip();

  return (
    <div className={styles["punch-wrap"]}>
      <div className={styles["punch"]}>
        {punchCard.map((row, d) => {
          return (
            <React.Fragment key={WEEKDAY_LABELS[d]}>
              <div className={styles["punch-row-label"]}>
                {WEEKDAY_LABELS[d]}
              </div>
              {row.map((count, h) => {
                const hour = String(h).padStart(2, "0");
                const label = `${WEEKDAY_LABELS[d]} ${hour}:00 - ${count} posts`;
                return (
                  <div
                    key={hour}
                    className={styles["punch-cell"]}
                    aria-label={label}
                    data-count={count}
                    onMouseMove={(e) => show(e, label)}
                    onMouseLeave={hide}>
                    {count > 0 && max > 0 && (
                      <div
                        className={styles["punch-cell-fill"]}
                        style={{ opacity: 0.25 + 0.75 * (count / max) }}
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <div />
        {Array.from({ length: 24 }, (_, h) => {
          return (
            <div key={h} className={styles["punch-col-label"]}>
              {h % 3 === 0 ? String(h).padStart(2, "0") : ""}
            </div>
          );
        })}
      </div>
      <CellTooltipView tooltip={tooltip} />
    </div>
  );
};

// month label ("Mar") for the week which contains the first day of a month
function monthLabelOf(week: Array<{ date: string } | null>): string {
  for (const day of week) {
    if (day && parseInt(day.date.slice(8), 10) === 1) {
      return MONTH_LABELS[parseInt(day.date.slice(5, 7), 10) - 1];
    }
  }
  return "";
}

const ContributionCalendarView: React.FunctionComponent<{
  calendar: ContributionCalendar;
}> = ({ calendar }) => {
  const max = Math.max(
    ...calendar.weeks.flat().map((day) => (day ? day.count : 0))
  );
  const { tooltip, show, hide } = useCellTooltip();

  return (
    <div className={styles["contrib-wrap"]}>
      <div className={styles["contrib"]}>
        <div className={styles["contrib-daylabels"]}>
          {WEEKDAY_LABELS.map((label) => {
            return <div key={label}>{label}</div>;
          })}
        </div>
        {calendar.weeks.map((week, wi) => {
          return (
            <div className={styles["contrib-week"]} key={wi}>
              <div className={styles["contrib-month-label"]}>
                {monthLabelOf(week)}
              </div>
              {week.map((day, di) => {
                if (!day) {
                  return (
                    <div
                      key={di}
                      className={`${styles["contrib-cell"]} ${styles["contrib-cell-empty"]}`}
                    />
                  );
                }
                const label = `${day.date} - ${day.count} posts`;
                return (
                  <div
                    key={day.date}
                    className={styles["contrib-cell"]}
                    aria-label={label}
                    data-date={day.date}
                    onMouseMove={(e) => show(e, label)}
                    onMouseLeave={hide}>
                    {day.count > 0 && max > 0 && (
                      <div
                        className={styles["contrib-cell-fill"]}
                        style={{ opacity: 0.25 + 0.75 * (day.count / max) }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <CellTooltipView tooltip={tooltip} />
    </div>
  );
};

const TopTags: React.FunctionComponent<{
  tags: Array<TagRank>;
  otherTagsCount: number;
}> = ({ tags, otherTagsCount }) => {
  const shares: Array<TagShare> = [
    ...tags.map((tag) => {
      return { name: tag.name, count: tag.count };
    }),
    ...(otherTagsCount > 0
      ? [{ name: "Others", count: otherTagsCount, isOthers: true }]
      : [])
  ];

  return (
    <div className={styles["chart-row"]}>
      <div>
        <TagsPieChartComponent data={shares} />
      </div>
      <div className={styles["tag-legend"]}>
        {tags.map((tag, i) => {
          return (
            <div className={styles["tag-legend-item"]} key={tag.path}>
              <span
                className={styles["tag-legend-chip"]}
                style={{ background: tagShareColor(i, false) }}
              />
              <a href={`/tags${tag.path}`} data-tag={tag.name.toLowerCase()}>
                {tag.name}
              </a>
              <span className={styles["tag-legend-count"]}>{tag.count}</span>
            </div>
          );
        })}
        {otherTagsCount > 0 && (
          <div className={styles["tag-legend-item"]}>
            <span
              className={styles["tag-legend-chip"]}
              style={{ background: tagShareColor(0, true) }}
            />
            <span>Others</span>
            <span className={styles["tag-legend-count"]}>{otherTagsCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
