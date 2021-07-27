import HeadMeta from '../components/headmeta'
import Header from '../components/header'
import Cover from '../components/cover';
import ArticlesComponent from '../components/articles';
import Pagination from '../components/pagination';
import { getArticles } from './api/articles';
import { convertUnixtimeToDate } from '../utils/time';
import { Article, ArticleResponseWithCount } from '../types/article';

export default function Home({ count, articles}) {
  return (
    <>
      <HeadMeta/>
      <Header/>
      <Cover />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <Pagination
          basePath='articles'
          current={1}
          total={count}
        />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const articlesResponseWithCount: ArticleResponseWithCount = await getArticles()
  // TODO: redirect to 404 if articles count is zero.
  const articles = articlesResponseWithCount.articles.map(article => {
    return {
      path: article.path,
      title: article.title,
      content: `${article.content} ...`,
      publishedAt: convertUnixtimeToDate(article.publishedAt).toLocaleString(),
      updatedAt: convertUnixtimeToDate(article.updatedAt).toLocaleString()
    } as Article
  });

  return {
    props: { 'count': articlesResponseWithCount.count, 'articles': articles }
  }
}
