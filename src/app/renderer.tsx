import {
  CoverComponent,
  RecentArticlesComponent
} from "../components/components";
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
        </div>
      </main>
    </>
  );
};
