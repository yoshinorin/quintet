import ContentComponent from '../../../components/content';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import HeadMetaComponent from '../../../components/headmeta';
import MainBottomCodesComponent from '../../../components/mainBottomCodes';
import {
  Content,
  Insight,
  ScriptCode
} from '../../../models/models';
import { getScriptCodes } from '../../../utils/scriptTags';
import { externalResources as externalResourcesConfig } from '../../../../config';

export const Renderer: React.FunctionComponent<{
  content: Content,
  insight: Insight
}> = ({ content, insight }) => {

  let externalResourceCodes: Array<ScriptCode> = [];
  const hasExternalResources = (content.externalResources && externalResourcesConfig);
  if (hasExternalResources) {
    externalResourceCodes = getScriptCodes(content.externalResources, externalResourcesConfig)
  }
  return (
    <>
      <HeadMetaComponent
        robotsMeta={content.robotsAttributes}
        externalResources={content.externalResources}
        content={content}
      />
      <CoverWithNavigationComponent
        contentCover={{
          title: content.title,
          tags: content.tags,
          publishedAt: content.publishedAt,
        }}
      />
      <main>
        <ContentComponent
          content={content}
          insight={insight}
        />
        <MainBottomCodesComponent
          scriptCodes={externalResourceCodes}
        />
      </main>
    </>
  )
}
