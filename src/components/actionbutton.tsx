import styles from "../styles/actionbutton.module.scss";

export const ActionButton: React.FunctionComponent<{
  title: string;
  onclick: () => void;
}> = ({ title, onclick }) => {
  return (
    <div>
      <span
        className={`'unstyled' ${styles["action-button"]}`}
        onClick={onclick}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
};
