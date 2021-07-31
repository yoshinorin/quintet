import Navigation from './navigation';
import styles from '../styles/navigation.module.scss';
import { headerItems } from '../config';

export default function Header({}) {
  return(
    <header className={styles['nav-root']}>
      <Navigation
        items={headerItems}
      />
    </header>
  )
}
