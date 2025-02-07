import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../../components/components";
import articlesStyles from "../../../styles/articles.module.scss";
import styles from "../../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  tagName;
  currentPage;
  count;
  articles;
}> = ({ tagName, currentPage, count, articles }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: tagName,
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <section className={`${styles.container} ${articlesStyles.group}`}>
          <ArticlesComponent articles={articles} />
          <PaginationComponent
            basePath={`tags/${tagName}`}
            current={currentPage}
            total={count}
          />
        </section>
      </main>
    </>
  );
};
