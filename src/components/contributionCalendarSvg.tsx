import Link from "next/link";
import { ContributionCalendar } from "../models/models";
import flexStyles from "../styles/components/flex.module.scss";
import homeStyles from "../styles/home.module.scss";
import styles from "../styles/statistics.module.scss";

/* NOTE:
  A lightweight variant of `ContributionCalendarView` for the home page:
  a server component (no hydration, no RSC payload) which renders a single
  inline SVG. Tooltips are native SVG <title> elements, only on days which
  have posts. It must NOT import ./statistics or ./statisticsChart,
  otherwise recharts would be bundled for every route which renders it.
*/
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

const CELL_SIZE = 10;
const CELL_GAP = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const MONTH_LABEL_HEIGHT = 15;

// month label ("Mar") for the week which contains the first day of a month
function monthLabelOf(week: Array<{ date: string } | null>): string {
  for (const day of week) {
    if (day && parseInt(day.date.slice(8), 10) === 1) {
      return MONTH_LABELS[parseInt(day.date.slice(5, 7), 10) - 1];
    }
  }
  return "";
}

export const RecentContributionsComponent: React.FunctionComponent<{
  calendar: ContributionCalendar;
}> = ({ calendar }) => {
  return (
    <>
      <div className={styles["contrib-svg-total"]}>
        {calendar.total} posts in the last year
      </div>
      <Link
        href={`/statistics`}
        prefetch={false}
        className="unstyled"
        aria-label="Contribution calendar">
        <ContributionCalendarSvgComponent calendar={calendar} />
      </Link>
      <div
        className={`${flexStyles["flex-right"]} ${homeStyles["external-link"]}`}>
        <Link
          href={`/statistics`}
          prefetch={false}
          className={`unstyled ${homeStyles["read-more"]}`}>
          Show more →
        </Link>
      </div>
    </>
  );
};

export const ContributionCalendarSvgComponent: React.FunctionComponent<{
  calendar: ContributionCalendar;
}> = ({ calendar }) => {
  const weeks = calendar.weeks;
  const width = weeks.length * CELL_STEP - CELL_GAP;
  const height = MONTH_LABEL_HEIGHT + 7 * CELL_STEP - CELL_GAP;
  const max = Math.max(...weeks.flat().map((day) => (day ? day.count : 0)));

  // NOTE: cells are grouped by fill (class on the parent <g>) and sized via
  // CSS geometry properties, keeping each <rect> as small as possible:
  // the whole SVG is embedded twice in the page (HTML + RSC flight payload)
  const zeroCells = [];
  const filledCells = [];
  weeks.forEach((week, wi) => {
    week.forEach((day, di) => {
      if (!day) {
        return;
      }
      const x = wi * CELL_STEP;
      const y = MONTH_LABEL_HEIGHT + di * CELL_STEP;
      if (day.count > 0 && max > 0) {
        filledCells.push(
          <rect
            key={day.date}
            x={x}
            y={y}
            fillOpacity={0.25 + 0.75 * (day.count / max)}>
            <title>{`${day.date} - ${day.count} posts`}</title>
          </rect>
        );
      } else {
        zeroCells.push(<rect key={day.date} x={x} y={y} />);
      }
    });
  });

  return (
    <svg
      className={styles["contrib-svg"]}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true">
      <g className={styles["contrib-svg-month-label"]}>
        {weeks.map((week, wi) => {
          const label = monthLabelOf(week);
          if (!label) {
            return null;
          }
          return (
            <text key={wi} x={wi * CELL_STEP} y={CELL_SIZE}>
              {label}
            </text>
          );
        })}
      </g>
      <g className={styles["contrib-svg-cell"]}>{zeroCells}</g>
      <g className={styles["contrib-svg-cell-fill"]}>{filledCells}</g>
    </svg>
  );
};
