import { NavigationComponent } from "./navigation";
import styles from "../styles/navigation.module.scss";

export const HeaderComponent: React.FunctionComponent<{
  items: Array<any>;
}> = ({ items }) => {
  return (
    <header className={styles["nav-root"]}>
      <NavigationComponent items={items} />
    </header>
  );
};
