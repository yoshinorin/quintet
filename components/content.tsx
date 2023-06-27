import { Content, ContentMeta } from '../models/content';
import containerStyles from '../styles/components/container.module.scss';
import contentStyles from '../styles/components/content.module.scss';
import Accordion from './accordion';

const ContentComponent: React.FunctionComponent<{ content: Content }> = ({content}) => {

  const meta: ContentMeta = {
    robots: content.robotsAttributes,
    tags: content.tags,
    shouldInjectResources: content.externalResources,
    authorName: content.authorName,
    publishedAt: content.publishedAt,
    updatedAt: content.updatedAt
  }

  return(
    <article className={contentStyles.content}>
      <div className={containerStyles.container} >
        <div className={`${contentStyles['accordion-wrap']}`} >
          <Accordion
            title="Show meta ▼"
            content={meta}
          />
        </div>
      </div>
      <div className={`${contentStyles['content-main']}`}>
        <div className={containerStyles.container} dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </article>
  )
}

export default ContentComponent;
