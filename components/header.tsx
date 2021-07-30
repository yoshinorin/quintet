import Link from 'next/link';
import styles from '../styles/navigation.module.scss';

export default function Header({}) {
  return(
    <header className={styles['nav-root']}>
      <div className={styles['nav-wrap']}>
        <nav className={styles['navbar']} role="navigation" aria-label="main navigation">
          <div className={styles['navbar-menu']}>
            <div className={styles['navbar-start']}>
              <div className={styles['navbar-item']}>
                <Link href="/">
                  <a className={`${styles['nav-left-pictur']}`} title="Home">Home</a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
