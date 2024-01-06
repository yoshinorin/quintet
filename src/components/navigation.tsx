import Link from 'next/link';
import styles from '../styles/navigation.module.scss';

const NavigationComponent: React.FunctionComponent<{ items: Array<any> }> = ({ items} ) => {
  return (
    <div className={styles['nav-wrap']}>
      <nav className={styles['navbar']} role="navigation" aria-label="main navigation">
        <div className={styles['navbar-menu']}>
          <div className={styles['navbar-start']}>
            <div className={styles['navbar-item']}>
              {items.filter(item => item.position == 'left').map((item, idx) => {
                return(
                  <NavbarItem
                    key = {idx}
                    item = {item}
                    idx = {idx}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles['navbar-end']}>
            <div className={styles['navbar-item']}>
              {items.filter(item => item.position == 'right').map((item, idx) => {
                return(
                  <NavbarItem
                    key = {idx}
                    item = {item}
                    idx = {idx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const NavbarItem: React.FunctionComponent<{ item, idx }> = ({ item, idx }) => {
  return (
    <Link
      href={item.url}
      prefetch={false}
      key={idx}
      className={`${styles['nav-icon']}`}
      title={item.title}
      dangerouslySetInnerHTML={{ __html: item.content }}>
    </Link>
  );
}

export default NavigationComponent;
