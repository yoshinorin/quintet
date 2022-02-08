import Link from 'next/link';
import TagComponent from '../tag';
import { ContentCover } from '../../types/content';
import { Tag } from '../../types/tag';
import styles from '../../styles/components/cover.module.scss';
import contentStyles from '../../styles/components/content.module.scss';
import { title, subTitle } from '../../config';
import { convertUnixTimeToISODateSrting } from '../../utils/time';

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
                    { convertUnixTimeToISODateSrting(contentCover.publishedAt) }
                  </span>
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
