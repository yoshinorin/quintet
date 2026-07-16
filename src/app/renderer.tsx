import { pinned } from "../../config";
import {
  CoverComponent,
  RecentArticlesComponent,
  RecentContributionsComponent
} from "../components/components";
import { Pinned } from "../components/pinned";
import { Article, ContributionCalendar } from "../models/models";
import containerStyles from "../styles/components/container.module.scss";
import styles from "../styles/home.module.scss";

export const Renderer: React.FunctionComponent<{
  articles: Array<Article>;
  contributions: ContributionCalendar;
}> = ({ articles, contributions }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <div className={`${containerStyles.container} ${styles.wrap}`}>
          <RecentArticlesComponent articles={articles} />
          <hr />
          {contributions && (
            <>
              <RecentContributionsComponent calendar={contributions} />
              <hr />
            </>
          )}
          <Pinned items={pinned} />
        </div>
      </main>
    </>
  );
};
