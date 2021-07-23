import ContentComponent from '../components/content';
import Cover from '../components/cover';
import HeadMeta from '../components/headmeta'
import Header from '../components/header'
import { convertUnixtimeToDate } from '../utils/time';
import { ContentResponse, Content } from '../types/content';
import { findByPath } from './api/content';

export default function Article({content}) {
  return (
    <div>
      <HeadMeta />
      <Header/>
      <Cover />
      <main>
        <ContentComponent
          content={content}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  const contentResponse: ContentResponse = await findByPath(ctx.params.slug.join("/"))
  const content: Content = {
    title: contentResponse.title,
    content: contentResponse.content,
    publishedAt: convertUnixtimeToDate(contentResponse.publishedAt).toLocaleString()
  } as Content
  return {
    props: { content }
  }
}
