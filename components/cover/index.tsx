import Link from 'next/link';
import styles from '../../styles/components/cover.module.scss';
import contentStyles from '../../styles/components/content.module.scss';
import { title, subTitle } from '../../config';

const CoverComponent: React.FunctionComponent<{}> = ({}) => {
  return(
    <div className={styles['cover']}>
      <div className={`${styles['content-header']} ${contentStyles['content-main']}`}>
        <div className={`${styles['content-title']}`}>
          <div className={`${styles['site-title']}`}>
            {/* TODO: add if condition */}
            <Link href="/">
              <a dangerouslySetInnerHTML={{ __html: title }}>
              </a>
            </Link>
          </div>
          <span className={`${styles['content-meta']}`}
            dangerouslySetInnerHTML={{ __html: subTitle }}>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CoverComponent;
