import ContentComponent from '../components/contents/content';
import { convertUnixtimeToDate } from '../utils/time';
import styles from '../styles/Home.module.scss'
import { ContentResponse, Content } from '../types/content';
import { findByPath } from './api/content';

// @ts-ignore
export default function Article({content}) {
  return (
    <div className={styles.container}>
      <ContentComponent
        content={content}
      />
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
