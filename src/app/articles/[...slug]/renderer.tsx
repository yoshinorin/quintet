import ContentComponent from '../../../components/content';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import HeadMetaComponent from '../../../components/headmeta';
import MainBottomCodesComponent from '../../../components/mainBottomCodes';
import {
  Content,
  Insight,
  InjectScript
} from '../../../models/models';
import { getScripts } from '../../../utils/scriptTags';
import { externalResources as externalResourcesConfig } from '../../../../config';
import { InjectScriptComponent } from '../../../components/injectScriptComponent';

export const Renderer: React.FunctionComponent<{
  slug: string,
  content: Content,
  insight: Insight
}> = ({ slug, content, insight }) => {

  let externalResourceSrc: Array<InjectScript> = [];
  const hasExternalResources = (content.externalResources && externalResourcesConfig);
  if (hasExternalResources) {
    externalResourceSrc = getScripts(content.externalResources, externalResourcesConfig);
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
          tags: content.tags,
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
                  <InjectScriptComponent
                    injectScript={externalResourceSrc}
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
