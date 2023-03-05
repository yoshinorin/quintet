import { Content } from '../models/content';
import containerStyles from '../styles/components/container.module.scss';
import contentStyles from '../styles/components/content.module.scss';

const ContentComponent: React.FunctionComponent<{ content: Content }> = ({content}) => {
  return(
    <article className={contentStyles.content}>
      <div className={`${contentStyles['content-main']}`}>
        <div className={containerStyles.container} dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </article>
  )
}

export default ContentComponent;
