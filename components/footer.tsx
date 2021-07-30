import Link from 'next/link';
import styles from '../styles/footer.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import { footerItems, copyrights } from '../config';

export default function Footer() {
  return(
    <footer id={styles['footer']}>
      <div className={containerStyles['container']}>
        <div className={styles['flex-container']}>
          {footerItems.map((item) => {
            return(
              <Link href={`${item.url}`}>
                <a className={`${styles['footer-item']} unstyled`}>{`${item.text}`}</a>
              </Link>
            )
          })}
        </div>
      </div>
      <div className={styles['copyrights']} dangerouslySetInnerHTML={{ __html: copyrights }}>
      </div>
    </footer>
  )
}
