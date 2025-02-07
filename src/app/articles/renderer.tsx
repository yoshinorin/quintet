import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../components/components";
import articlesStyles from "../../styles/articles.module.scss";
import styles from "../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  count;
  currentPage;
  articles;
}> = ({ count, currentPage, articles }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <section className={`${styles.container} ${articlesStyles.group}`}>
          <ArticlesComponent articles={articles} />
          <PaginationComponent
            basePath="articles"
            current={currentPage}
            total={count}
          />
        </section>
      </main>
    </>
  );
};
