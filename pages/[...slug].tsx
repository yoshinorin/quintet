import ContentComponent from '../components/content';
import Cover from '../components/cover';
import HeadMeta from '../components/headmeta'
import { convertUnixtimeToDate } from '../utils/time';
import { ContentResponse, Content } from '../types/content';
import { findByPath } from './api/content';

export default function Article({content}) {
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
  const contentResponse: ContentResponse = await findByPath(ctx.resolvedUrl)
  const content: Content = {
    title: contentResponse.title,
    content: contentResponse.content,
    publishedAt: convertUnixtimeToDate(contentResponse.publishedAt).toLocaleString()
  } as Content
  return {
    props: { content }
  }
}
