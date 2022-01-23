import Link from 'next/link';
import { ContentCover } from '../../types/content';
import styles from '../../styles/components/cover.module.scss';
import contentStyles from '../../styles/components/content.module.scss';
import { title, subTitle } from '../../config';

const CoverComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return(
    <div className={styles['cover']}>
      <div className={`${styles['content-header']} ${contentStyles['content-main']}`}>
        {
          (() => {
            if (contentCover) {
              return(
                <div>
                  <h1 className={`${styles['content-title']}`}>
                    {contentCover.title}
                  </h1>
                  <span className={`${styles['content-meta']}`}>
                    {contentCover.publishedAt}
                  </span>
                  {/* TODO: add tags & them link */}
                </div>
              )
            } else {
              return (
                <div>
                  <div className={`${styles['site-title']}`}>
                    <Link href="/">
                      <a dangerouslySetInnerHTML={{ __html: title }}>
                      </a>
                    </Link>
                  </div>
                  <span className={`${styles['site-meta']}`}
                    dangerouslySetInnerHTML={{ __html: subTitle }}>
                  </span>
                </div>
              )
            }
          })()
        }
      </div>
    </div>
  )
}

export default CoverComponent;
