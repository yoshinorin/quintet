import ContentComponent from '../../../components/content';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import HeadMetaComponent from '../../../components/headmeta';
import MainBottomCodesComponent from '../../../components/mainBottomCodes';
import { Content } from '../../../models/content';
import { Insight } from '../../../models/insight';
import { ScriptCode } from '../../../models/script';
import { getScriptCodes } from '../../../utils/scriptTags';
import { externalResources as externalResourcesConfig } from '../../../../config';
import PlanePage from '../../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode: number,
  content: Content,
  insight: Insight
}> = ({ statusCode, content, insight }) => {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
  }

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
