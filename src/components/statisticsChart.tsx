"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { YearlyStackedCounts } from "../models/models";
import styles from "../styles/statistics.module.scss";

/* NOTE:
  recharts must be imported only from the statistics page's components.
  Next.js splits client bundles per route, so it is not loaded on other pages.
*/
export const CountBarChartComponent: React.FunctionComponent<{
  data: Array<{ label: string; count: number }>;
}> = ({ data }) => {
  return (
    <div className={styles["chart"]}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} width={30} />
          <Tooltip cursor={{ fillOpacity: 0.3 }} />
          <Bar
            dataKey="count"
            fill="var(--color-basic-link)"
            fillOpacity={0.75}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// single-hue ramp for ordered series (years): older = lighter, newer = darker
export function yearColor(index: number, total: number): string {
  if (total <= 1) {
    return "hsl(211, 60%, 45%)";
  }
  const lightness = 72 - (index / (total - 1)) * 34;
  return `hsl(211, 60%, ${lightness}%)`;
}

export const StackedCountBarChartComponent: React.FunctionComponent<{
  stacked: YearlyStackedCounts;
}> = ({ stacked }) => {
  return (
    <div className={styles["chart"]}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stacked.rows}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} width={30} />
          <Tooltip cursor={{ fillOpacity: 0.3 }} />
          <Legend />
          {stacked.years.map((year, i) => {
            return (
              <Bar
                key={year}
                dataKey={year}
                stackId="year"
                fill={yearColor(i, stacked.years.length)}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export interface TagShare {
  name: string;
  count: number;
  isOthers?: boolean;
}

// NOTE: colorblind-safe categorical palette (Okabe-Ito); gray is reserved for "Others"
const TAG_COLORS = [
  "#0072b2",
  "#e69f00",
  "#009e73",
  "#56b4e9",
  "#d55e00",
  "#cc79a7",
  "#f0e442"
];
const OTHERS_COLOR = "#8b959e";

export function tagShareColor(index: number, isOthers: boolean): string {
  return isOthers ? OTHERS_COLOR : TAG_COLORS[index % TAG_COLORS.length];
}

export const TagsPieChartComponent: React.FunctionComponent<{
  data: Array<TagShare>;
}> = ({ data }) => {
  return (
    <div className={styles["pie-chart"]}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            stroke="none"
            isAnimationActive={false}>
            {data.map((entry, i) => {
              return (
                <Cell
                  key={entry.name}
                  fill={tagShareColor(i, entry.isOthers === true)}
                />
              );
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
