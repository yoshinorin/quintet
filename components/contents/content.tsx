import { Content } from '../../types/content';

const ContentComponent: React.FunctionComponent<{ content: Content }> = ({content}) => {
  return(
    <div dangerouslySetInnerHTML={{ __html: content.content }} />
  )
}

export default ContentComponent;
