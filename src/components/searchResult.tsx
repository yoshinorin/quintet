import Link from "next/link";
import React from "react";
import { SearchResponse } from "../models/models";
import styles from "../styles/search.module.scss";
import { splittedBy } from "../utils/time";

export const SearchResultComponent: React.FunctionComponent<{
  hits: number;
  count: number;
  contents: Array<SearchResponse>;
}> = ({ hits, count, contents }) => {
  return (
    <>
      <div className={styles["found"]}>
        {contents.length} / {hits}
      </div>
      <div id={styles["articles"]}>
        {contents.map((content: SearchResponse, idx) => {
          return (
            <article className={styles["result"]} key={idx}>
              <div className={styles["wrap"]}>
                <Link
                  href={`${content.path}`}
                  prefetch={false}
                  className="unstyled"
                  target="_blank">
                  <time
                    dateTime={`${content.publishedAt}`}
                    className={styles["time"]}>
                    {`${splittedBy(content.publishedAt, "ja-JP", "/").join(",").replaceAll(",", ".")}`}
                  </time>
                  <h4 className={styles["title"]}>{`${content.title}`}</h4>
                  <div className={styles["excerpt"]}>
                    {`${content.content}`}
                  </div>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
