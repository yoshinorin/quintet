"use client";

import React, { useState } from "react";
import { ContributionCalendar } from "../models/models";
import styles from "../styles/statistics.module.scss";

/* NOTE:
  Used only by the /statistics page (the home page renders the lightweight
  `ContributionCalendarSvgComponent` instead), but kept separate from
  ./statistics so that it never pulls in recharts via ./statisticsChart.
*/
export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

interface CellTooltip {
  x: number;
  y: number;
  text: string;
}

export function useCellTooltip() {
  const [tooltip, setTooltip] = useState<CellTooltip | null>(null);
  const show = (e: React.MouseEvent, text: string) =>
    setTooltip({ x: e.clientX, y: e.clientY, text });
  const hide = () => setTooltip(null);
  return { tooltip, show, hide };
}

export const CellTooltipView: React.FunctionComponent<{
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

// month label ("Mar") for the week which contains the first day of a month
function monthLabelOf(week: Array<{ date: string } | null>): string {
  for (const day of week) {
    if (day && parseInt(day.date.slice(8), 10) === 1) {
      return MONTH_LABELS[parseInt(day.date.slice(5, 7), 10) - 1];
    }
  }
  return "";
}

export const ContributionCalendarView: React.FunctionComponent<{
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
