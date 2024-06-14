import Link from "next/link";
import { TagComponent } from "./tag";
import { NavigationComponent } from "./navigation";
import { Tag } from "../models/models";
import styles from "../styles/components/cover.module.scss";
import { toDate } from "../utils/time";
import { title, subTitle, coverBottomItems } from "../../config";

type Props = {
  title: string;
  tags?: Array<Tag>;
  publishedAt: number;
};

export const CoverComponent: React.FunctionComponent<{
  props: Props | null;
}> = ({ props }) => {
  return (
    <>
      <div className={styles["cover"]}>
        <div className={`${styles["content-header"]}`}>
          {(() => {
            if (props) {
              return (
                <>
                  <h1 className={`${styles["content-title"]}`}>
                    {props.title}
                  </h1>
                  {(() => {
                    if (props.publishedAt) {
                      return (
                        <span className={`${styles["content-meta"]}`}>
                          {toDate(props.publishedAt).toUTCString()}
                        </span>
                      );
                    }
                  })()}
                  {(() => {
                    if (props.tags) {
                      return (
                        <section className={`${styles["tags"]}`}>
                          {props.tags.map((tag: Tag) => {
                            return (
                              <TagComponent
                                tag={tag}
                                className={null}
                                key={tag.id}
                              />
                            );
                          })}
                        </section>
                      );
                    }
                  })()}
                </>
              );
            } else {
              return (
                <>
                  <div className={`${styles["site-title"]}`}>
                    <Link
                      href="/"
                      prefetch={false}
                      dangerouslySetInnerHTML={{
                        __html: title
                      }}></Link>
                  </div>
                  <span
                    className={`${styles["site-meta"]}`}
                    dangerouslySetInnerHTML={{
                      __html: subTitle
                    }}></span>
                </>
              );
            }
          })()}
        </div>
      </div>
      <div className={styles["cover-bottom-nav"]}>
        <NavigationComponent items={coverBottomItems} />
      </div>
    </>
  );
};
