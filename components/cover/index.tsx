import Link from 'next/link';
import { ContentCover } from '../../types/content';
import { Tag } from '../../types/tag';
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
                  {
                    (() => {
                      if (contentCover.tags) {
                        return(
                          <section className={`${styles['tags']}`}>
                          {contentCover.tags.map((t: Tag) => {
                            {/*
                            NOTE:
                              The Next.js can not pass custom argument with <Link> component.
                              So, I want to belows, but can not...

                              Front-end visible URL: https://example.com/tags/{tagName}
                              API call (when transition with <Link>):  https://example.com/tags/{tagId}

                              But, it can not. So, I have to find the tagging contents with tagName.
                            */}
                            return (
                              <Link
                                href={`/tags/${t.name}`}
                                key={t.id}
                              >
                                <a
                                  target="_blank"
                                  data-tag={t.name.toLowerCase()}
                                >
                                  {`${t.name}`}
                                </a>
                              </Link>
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
