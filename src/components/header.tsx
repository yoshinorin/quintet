import styles from "../styles/navigation.module.scss";
import { NavigationComponent } from "./navigation";

export const HeaderComponent: React.FunctionComponent<{
  items: Array<any>;
}> = ({ items }) => {
  return (
    <header className={styles["nav-root"]}>
      <NavigationComponent items={items} />
    </header>
  );
};
