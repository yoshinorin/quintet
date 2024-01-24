import Link from 'next/link';
import { TagComponent } from './tag';
import { NavigationComponent } from './navigation';
import { ContentCover, Tag } from '../models/models';
import styles from '../styles/components/cover.module.scss';
import { convertUnixtimeToDate } from '../utils/time';
import { title, subTitle, coverBottomItems } from '../../config';

export const CoverComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return (
    <div className={styles['cover']}>
      <div className={`${styles['content-header']}`}>
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

export const CoverWithNavigationComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return(
    <>
      <CoverComponent
        contentCover={contentCover}
      />
      <div className={styles['cover-bottom-nav']}>
        <NavigationComponent
          items={coverBottomItems}
        />
      </div>
    </>
  )
}
