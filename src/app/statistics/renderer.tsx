import { CoverComponent } from "../../components/components";
import { StatisticsComponent } from "../../components/statistics";
import { Statistics } from "../../models/models";

export const Renderer: React.FunctionComponent<{
  statistics: Statistics;
  timeZones: Array<string>;
  excludeYears: Array<string>;
}> = ({ statistics, timeZones, excludeYears }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: "Statistics",
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <StatisticsComponent
          statistics={statistics}
          timeZones={timeZones}
          excludeYears={excludeYears}
        />
      </main>
    </>
  );
};
