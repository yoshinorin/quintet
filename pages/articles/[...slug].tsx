import Error from 'next/error';
import ContentComponent from '../../components/content';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import HeadMetaComponent from '../../components/headmeta';
import { convertUnixtimeToDate } from '../../utils/time';
import { ContentResponse, Content } from '../../types/content';
import { ContentCover } from '../../types/content';
import { findByPath } from '../api/content';

const Article: React.FunctionComponent<{ statusCode: number, content: Content }> = ({ statusCode, content }) => {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  const contentCover = {
    title: content.title,
    tags: content.tags,
    publishedAt: content.publishedAt,
  } as ContentCover;

  return (
    <>
      <HeadMetaComponent
        robotsMeta={content.robotsAttributes}
        content={content}
      />
      <CoverWithNavigationComponent
        contentCover={contentCover}
      />
      <main>
        <ContentComponent
          content={content}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const path = ctx.params.slug.join("/");
  const response: Response = await findByPath(path);
  ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
      title: contentResponse.title,
      robotsAttributes: contentResponse.robotsAttributes,
      externalResources: contentResponse.externalResources,
      tags: contentResponse.tags,
      description: contentResponse.description,
      content: contentResponse.content,
      authorName: contentResponse.authorName,
      publishedAt: convertUnixtimeToDate(contentResponse.publishedAt).toLocaleString(),
      updatedAt: convertUnixtimeToDate(contentResponse.updatedAt).toLocaleString()
    } as Content
  }
  return {
    props: {
      statusCode: response.status,
      content: content
    }
  }
}

export default Article;
