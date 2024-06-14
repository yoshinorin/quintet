import Link from "next/link";
import containerStyles from "../styles/components/container.module.scss";
import styles from "../styles/footer.module.scss";

export const FooterComponent: React.FunctionComponent<{
  copyrights: string;
  items: Array<{
    url: string;
    text: string;
  }>;
}> = ({ copyrights, items }) => {
  return (
    <footer id={styles["footer"]}>
      <div className={containerStyles["container"]}>
        <div className={styles["flex-container"]}>
          {items.map((item, idx) => {
            return (
              <Link
                href={`${item.url}`}
                key={idx}
                prefetch={false}
                className={`${styles["footer-item"]} unstyled`}>
                {`${item.text}`}
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className={styles["copyrights"]}
        dangerouslySetInnerHTML={{ __html: copyrights }}></div>
    </footer>
  );
};
