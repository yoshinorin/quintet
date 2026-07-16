import styles from "../styles/statistics.module.scss";

/* NOTE:
  This component is rendered on both the home page and the /statistics page.
  It must NOT import ./statistics or ./statisticsChart, otherwise recharts
  would be bundled for every route which renders it.
*/
export const StatCard: React.FunctionComponent<{
  value: number;
  label: string;
  href?: string;
}> = ({ value, label, href }) => {
  const body = (
    <>
      <div className={styles["stat-value"]}>{value}</div>
      <div className={styles["stat-label"]}>{label}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${styles["stat-card"]} ${styles["stat-card-link"]}`}>
        {body}
      </a>
    );
  }
  return <div className={styles["stat-card"]}>{body}</div>;
};
