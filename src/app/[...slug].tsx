import ContentComponent from '../components/content';
import CoverWithNavigationComponent from '../components/cover/withNavigation';
import HeadMetaComponent from '../components/headmeta';
import { InjectScriptComponent } from '../components/injectScripts';
import { ContentResponse, Content } from '../models/content';
import { InjectScript } from '../models/script';
import { findByPath } from '../api/content';
import { getScripts } from '../utils/injectScript';
import { externalResources as externalResourcesConfig } from '../../config';
import { Insight } from '../models/insight';
import { asInsight } from '../utils/converters';
import PlanePage from '../components/planePage';

const Article: React.FunctionComponent<{ statusCode: number, content: Content, insight: Insight }> = ({ statusCode, content, insight }) => {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
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
          // TODO: DRY with (`/articles/[...slug]/renderer.tsx`)
          (() => {
            if (content.externalResources && externalResourcesConfig) {
              const externalResourceSrc: Array<InjectScript> = getScripts(content.externalResources, externalResourcesConfig);
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

export async function getServerSideProps(ctx: any) {
  let path = ctx.params.slug.join("/");
  // TODO move utils & write testcode
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  // TODO move utils & write testcode
  if (path.match(/^\/\d{4}\/\d{2}\/\d{2}\/*/)) {
    if (!path.endsWith("/")) {
      path = `${path}/`
    }
    return {
      redirect: {
        permanent: true,
        destination: `/articles${path}`
      }
    }
  }

  const response: Response = await findByPath(ctx.req, path);
  ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
      title: contentResponse.title,
      robotsAttributes: contentResponse.robotsAttributes,
      externalResources: contentResponse.externalResources,
      content: contentResponse.content,
      length: contentResponse.length,
      publishedAt: contentResponse.publishedAt
    } as Content
  }
  return {
    props: {
      statusCode: response.status,
      content: content,
      insight: asInsight(response)
    }
  }
}

export default Article;
