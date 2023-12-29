import ContentComponent from '../../components/content';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import HeadMetaComponent from '../../components/headmeta';
import MainBottomCodesComponent from '../../components/mainBottomCodes';
import { ContentResponse, Content } from '../../models/content';
import { Insight } from '../../models/insight';
import { ScriptCode } from '../../models/script';
import { isIgnoreRequest } from '../../utils/filterRequests';
import { findByPath } from '../../api/content';
import { getScriptCodes } from '../../utils/scriptTags';
import { externalResources as externalResourcesConfig } from '../../../config';
import { asInsight } from '../../utils/converters';
import PlanePage from '../../components/planePage';

const Article: React.FunctionComponent<{ statusCode: number, content: Content, insight: Insight }> = ({ statusCode, content, insight }) => {
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

export async function getServerSideProps(ctx: any) {
  const path = "/articles/" + ctx.params.slug.join("/");

  // avoid send request of images
  if (isIgnoreRequest(path)) {
    return {
      props: {
        statusCode: 404
      }
    }
  }

  const response: Response = await findByPath(ctx.req, path);
  ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
      id: contentResponse.id,
      title: contentResponse.title,
      robotsAttributes: contentResponse.robotsAttributes,
      externalResources: contentResponse.externalResources,
      tags: contentResponse.tags,
      description: contentResponse.description,
      content: contentResponse.content,
      length: contentResponse.length,
      authorName: contentResponse.authorName,
      publishedAt: contentResponse.publishedAt,
      updatedAt: contentResponse.updatedAt
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