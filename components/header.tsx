import NavigationComponent from './navigation';
import styles from '../styles/navigation.module.scss';
import { headerItems } from '../config';

const HeaderComponent: React.FunctionComponent<{}> = () => {
  return(
    <header className={styles['nav-root']}>
      <NavigationComponent
        items={headerItems}
      />
    </header>
  )
}

export default HeaderComponent;
