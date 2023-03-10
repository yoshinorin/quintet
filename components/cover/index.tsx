import Link from 'next/link';
import TagComponent from '../tag';
import { ContentCover } from '../../models/content';
import { Tag } from '../../models/tag';
import styles from '../../styles/components/cover.module.scss';
import contentStyles from '../../styles/components/content.module.scss';
import { title, subTitle } from '../../config';
import { convertUnixtimeToDate } from '../../utils/time';

const CoverComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return (
    <div className={styles['cover']}>
      <div className={`${styles['content-header']} ${contentStyles['content-main']}`}>
        {
          (() => {
            if (contentCover) {
              return(
                <>
                  <h1 className={`${styles['content-title']}`}>
                    {contentCover.title}
                  </h1>
                  {
                    (() => {
                      if (contentCover.publishedAt) {
                        return(
                          <span className={`${styles['content-meta']}`}>
                            { convertUnixtimeToDate(contentCover.publishedAt).toUTCString() }
                          </span>
                        )
                      }
                    })()
                  }
                  {
                    (() => {
                      if (contentCover.tags) {
                        return(
                          <section className={`${styles['tags']}`}>
                            {contentCover.tags.map((tag: Tag) => {
                              return(
                                <TagComponent
                                  tag={tag}
                                  className={null}
                                  key={tag.id}
                                />
                              )
                            })}
                          </section>
                        )
                      }
                    })()
                  }
                </>
              )
            } else {
              return <>
                <div className={`${styles['site-title']}`}>
                  <Link href="/" prefetch={false} dangerouslySetInnerHTML={{ __html: title }}>
                  </Link>
                </div>
                <span className={`${styles['site-meta']}`}
                  dangerouslySetInnerHTML={{ __html: subTitle }}>
                </span>
              </>;
            }
          })()
        }
      </div>
    </div>
  );
}

export default CoverComponent;
