
import ContentComponent from '../../components/content';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import {
  Content,
  Insight,
  InjectScript
} from '../../models/models';
import { getScripts } from '../../utils/injectScript';
import { externalResources as externalResourcesConfig } from '../../../config';
import { InjectScriptComponent } from '../../components/injectScript';

export const Renderer: React.FunctionComponent<{
  content: Content,
  insight: Insight
}> = ({ content, insight }) => {
  let externalResourceSrc: Array<InjectScript> = [];
  const hasExternalResources = (content.externalResources && externalResourcesConfig);
  if (hasExternalResources) {
    externalResourceSrc = getScripts(content.externalResources, externalResourcesConfig);
  }
  return (
    <>
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
                  <InjectScriptComponent
                    injectScripts={externalResourceSrc}
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
