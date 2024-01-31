
import {
  ContentComponent,
  CoverComponent,
  InjectScriptComponent
} from '../../components/components';
import {
  Content,
  Insight,
  InjectScript
} from '../../models/models';
import { getScripts } from '../../utils/injectScript';
import { externalResources as externalResourcesConfig } from '../../../config';

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
      <CoverComponent
        props={{
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
