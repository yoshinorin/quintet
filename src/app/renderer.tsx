import { pinned } from "../../config";
import {
  CoverComponent,
  RecentArticlesComponent
} from "../components/components";
import { Pinned } from "../components/pinned";
import { Article } from "../models/models";
import containerStyles from "../styles/components/container.module.scss";
import styles from "../styles/home.module.scss";

export const Renderer: React.FunctionComponent<{
  articles: Array<Article>;
}> = ({ articles }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <div className={`${containerStyles.container} ${styles.wrap}`}>
          <RecentArticlesComponent articles={articles} />
          <hr />
          <Pinned items={pinned} />
        </div>
      </main>
    </>
  );
};
