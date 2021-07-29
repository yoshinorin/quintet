import Error from 'next/error'
import ContentComponent from '../components/content';
import Cover from '../components/cover';
import HeadMeta from '../components/headmeta'
import { convertUnixtimeToDate } from '../utils/time';
import { ContentResponse, Content } from '../types/content';
import { findByPath } from './api/content';

export default function Article({ statusCode, content }) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={statusCode} />
  }
  return (
    <>
      <HeadMeta />
      <Cover />
      <main>
        <ContentComponent
          content={content}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await findByPath(ctx.resolvedUrl);
  ctx.res.statusCode = response.status;

  let content: Content = null;
  if (response.status === 200) {
    const contentResponse: ContentResponse = await response.json() as ContentResponse;
    content = {
      title: contentResponse.title,
      content: contentResponse.content,
      publishedAt: convertUnixtimeToDate(contentResponse.publishedAt).toLocaleString()
    } as Content
  }
  return {
    props: {
      statusCode: response.status,
      content: content
    }
  }
}
