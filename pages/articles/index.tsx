// TODO: refactor
import HeadMeta from '../../components/headmeta';
import Header from '../../components/header';
import Cover from '../../components/cover';
import ArticlesComponent from '../../components/articles';
import Pagination from '../../components/pagination';
import { getArticles } from '../api/articles';
import { convertUnixtimeToDate } from '../../utils/time';
import { Article, ArticleResponseWithCount } from '../../types/article';

export default function Page({ count, articles }) {
  return (
    <div>
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
    </div>
  )
}

export async function getServerSideProps() {
  const articlesResponseWithCount: ArticleResponseWithCount = await getArticles(1)
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
