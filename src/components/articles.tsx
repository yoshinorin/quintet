import Link from "next/link";
import { Article } from "../models/models";
import styles from "../styles/articles.module.scss";
import articlesInSection from "../styles/articlesInSection.module.scss";
import buttonStyles from "../styles/components/button.module.scss";
import containerStyles from "../styles/components/container.module.scss";
import flexStyles from "../styles/components/flex.module.scss";
import homeStyles from "../styles/home.module.scss";
import { splittedBy } from "../utils/time";

export const ArticlesComponent: React.FunctionComponent<{
  articles: Array<Article>;
}> = ({ articles }) => {
  return (
    <section className={`${containerStyles.container} ${styles["group"]}`}>
      {articles.map((article: Article, idx) => {
        return (
          <article className={styles["article"]} key={idx}>
            <div className={styles["wrap"]}>
              <time
                dateTime={`${article.publishedAt}`}
                className={`${styles["time"]}`}>
                {`${splittedBy(article.publishedAt, "ja-JP", "/").join(",").replaceAll(",", ".")}`}
              </time>
              <Link
                href={`${article.path}`}
                prefetch={false}
                className="unstyled">
                <h2 className={`${styles["header"]} ${styles["title"]}`}>
                  {`${article.title}`}
                </h2>
                <p className={styles["excerpt"]}>{`${article.content}`}</p>
                <div className={`${buttonStyles["continue-read-button-wrap"]}`}>
                  <div
                    className={`'unstyled' ${buttonStyles["menu-button"]} ${buttonStyles["continue-read-button"]}`}>
                    続きを読む
                  </div>
                </div>
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export const RecentArticlesComponent: React.FunctionComponent<{
  articles: Array<Article>;
}> = ({ articles }) => {
  return (
    <>
      <div className={flexStyles["flex-row"]}>
        <div className={flexStyles["col-25"]}>
          <span className={homeStyles["cat-title"]}>
            {(() => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9" />
                </svg>
              );
            })()}
            &nbsp; Recent articles:
          </span>
        </div>
        <div className={flexStyles["col-75"]}>
          <ArticlesSection articles={articles} />
        </div>
      </div>
      <div
        className={`${flexStyles["flex-right"]} ${homeStyles["external-link"]}`}>
        <Link
          href={`/articles`}
          prefetch={false}
          className={`unstyled ${homeStyles["read-more"]}`}>
          Read more →
        </Link>
      </div>
    </>
  );
};

const ArticlesSection: React.FunctionComponent<{
  articles: Array<Article>;
}> = ({ articles }) => {
  return (
    <section className={articlesInSection["articles-wrap"]}>
      {articles.map((article: Article, idx) => {
        return (
          <article className={articlesInSection["article"]} key={idx}>
            <div className={articlesInSection["wrap"]}>
              <div className={articlesInSection["title"]}>
                <Link
                  href={`${article.path}`}
                  prefetch={false}
                  className="unstyled">
                  <time
                    dateTime={`${article.publishedAt}`}
                    className={articlesInSection["time"]}>
                    {`${splittedBy(article.publishedAt, "ja-JP", "/").join(",").replaceAll(",", ".")}`}{" "}
                    - &nbsp;
                  </time>
                  {`${article.title}`}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};
