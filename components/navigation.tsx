import Link from 'next/link';
import styles from '../styles/navigation.module.scss';

const NavigationComponent: React.FunctionComponent<{ items: Array<any> }> = ({ items} ) => {
  return(
    <div className={styles['nav-wrap']}>
      <nav className={styles['navbar']} role="navigation" aria-label="main navigation">
        <div className={styles['navbar-menu']}>
          <div className={styles['navbar-start']}>
            <div className={styles['navbar-item']}>
              {items.filter(item => item.position == 'left').map((item, idx) => {
                return(
                  <Link href={item.url} key={idx}>
                    <a className={`${styles['nav-icon']}`} title={item.title}
                      dangerouslySetInnerHTML={{ __html: item.content }}>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className={styles['navbar-end']}>
            <div className={styles['navbar-item']}>
              {items.filter(item => item.position == 'right').map((item, idx) => {
                  return(
                    <Link href={item.url} key={idx}>
                      <a className={`${styles['nav-icon']}`} title={item.title}
                        dangerouslySetInnerHTML={{ __html: item.content }}>
                      </a>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationComponent;
