import { Content, ContentMeta, Attributes } from '../models/content';
import { Insight } from '../models/insight';
import containerStyles from '../styles/components/container.module.scss';
import contentStyles from '../styles/components/content.module.scss';
import Accordion from './accordion';

const ContentComponent: React.FunctionComponent<{ content: Content, insight: Insight | null }> = ({content, insight}) => {

  const meta: ContentMeta = {
    id: content.id,
    robots: content.robotsAttributes,
    tags: content.tags,
    words: content.length,
    shouldInjectResources: content.externalResources,
    authorName: content.authorName,
    publishedAt: content.publishedAt,
    updatedAt: content.updatedAt
  }

  const attr: Attributes = {
    attributes: meta,
    insight: insight
  }

  return(
    <article className={contentStyles.content}>
      <div className={containerStyles.container} >
        <div className={`${contentStyles['accordion-wrap']}`} >
          <Accordion
            title="Attributes / Insight ▼"
            content={attr}
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
