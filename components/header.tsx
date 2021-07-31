import Link from 'next/link';
import styles from '../styles/navigation.module.scss';
import { headerItems } from '../config';

export default function Header({}) {
  return(
    <header className={styles['nav-root']}>
      <div className={styles['nav-wrap']}>
        <nav className={styles['navbar']} role="navigation" aria-label="main navigation">
          <div className={styles['navbar-menu']}>
            <div className={styles['navbar-start']}>
              <div className={styles['navbar-item']}>
                {headerItems.filter(item => item.position == 'left').map((item) => {
                  return(
                    <Link href={item.url}>
                      <a className={`${styles['nav-left-pictur']}`} title={item.title}
                        dangerouslySetInnerHTML={{ __html: item.content }}>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className={styles['navbar-end']}>
              <div className={styles['navbar-item']}>
                {headerItems.filter(item => item.position == 'right').map((item) => {
                    return(
                      <Link href={item.url}>
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
    </header>
  )
}
