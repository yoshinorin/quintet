import styles from "../styles/precontent.module.scss";

export const PreContent: React.FunctionComponent<{
  content: string;
}> = ({ content }) => {
  return <pre className={styles.content}>{content}</pre>;
};
