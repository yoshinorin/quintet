
import ContentComponent from '../../components/content';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import HeadMetaComponent from '../../components/headmeta';
import MainBottomCodesComponent from '../../components/mainBottomCodes';
import {
  Content,
  ScriptCode,
  Insight,
  ScriptSrc
} from '../../models/models';
import { getScriptCodes, getScriptTags } from '../../utils/scriptTags';
import { externalResources as externalResourcesConfig } from '../../../config';
import HeaderScriptSrcsComponent from '../../components/headerScriptSrcs';

export const Renderer: React.FunctionComponent<{
  slug: string,
  content: Content,
  insight: Insight
}> = ({ slug, content, insight }) => {
  let externalResourceCodes: Array<ScriptCode> = [];
  let externalResourceSrc: Array<ScriptSrc> = [];
  const hasExternalResources = (content.externalResources && externalResourcesConfig);
  if (hasExternalResources) {
    externalResourceCodes = getScriptCodes(content.externalResources, externalResourcesConfig);
    externalResourceSrc = getScriptTags(content.externalResources, externalResourcesConfig);
  }
  return (
    <>
      <HeadMetaComponent
        slug={slug}
        robotsMeta={content.robotsAttributes}
        externalResources={content.externalResources}
        content={content}
      />
      <CoverWithNavigationComponent
        contentCover={{
          title: content.title,
          tags: null,
          publishedAt: content.publishedAt,
        }}
      />
      <main>
        <ContentComponent
          content={content}
          insight={insight}
        />
        {
          (() => {
            // TODO: DRY with (`/articles/[...slug]/renderer.tsx`)
            if (hasExternalResources) {
              return(
                <>
                  <MainBottomCodesComponent
                    scriptCodes={externalResourceCodes}
                  />
                  <HeaderScriptSrcsComponent
                    scriptSrcs={externalResourceSrc}
                  />
                </>
              );
            }
          })()
        }
      </main>
    </>
  )
}
