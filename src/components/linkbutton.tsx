import styles from "../styles/actionbutton.module.scss";

export const LinkButton: React.FunctionComponent<{
  title: string;
  href: string;
}> = ({ title, href }) => {
  return (
    <div>
      <span className={`'unstyled' ${styles["action-button"]}`}>
        <a className="unstyled" href={href}>
          {title}
        </a>
      </span>
    </div>
  );
};
