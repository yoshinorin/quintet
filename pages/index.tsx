import Head from 'next/head';
import Link from 'next/link'
import { getArticles } from './api/articles';
import { convertUnixtimeToDate } from '../utils/time';
import styles from '../styles/Home.module.scss'
import { Article, ArticleResponse } from '../types/article';

// @ts-ignore
export default function Home({articles}) {
  return (
    <div className={styles.container}>
      <Head>
      </Head>
      <main className={styles.main}>
        {articles.map((article) => {
          return (
            <article>
              <h2>
                <Link href={`${article.path}`}>
                  <a>{`${article.title}`}</a>
                </Link>
              </h2>
            </article>
          )
        })}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const articleResponses: Array<ArticleResponse> = await getArticles()
  const articles = articleResponses.map(article => {
    return {
      path: article.path,
      title: article.title,
      content: article.content,
      publishedAt: convertUnixtimeToDate(article.publishedAt).toLocaleString(),
      updatedAt: convertUnixtimeToDate(article.updatedAt).toLocaleString()
    } as Article
  });

  return {
    props: { articles }
  }
}
