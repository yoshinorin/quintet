import HeadMeta from '../../components/headmeta';
import Header from '../../components/header';
import Cover from '../../components/cover';
import ArticlesComponent from '../../components/articles';
import Pagination from '../../components/pagination';
import { getArticles } from '../api/articles';
import { convertUnixtimeToDate } from '../../utils/time';
import { Article, ArticleResponseWithCount } from '../../types/article';

export default function Page({ current, count, articles }) {
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
          current={current}
          total={count}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  const articlesResponseWithCount: ArticleResponseWithCount = await getArticles(ctx.params.number)
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
    props: { 'current': ctx.params.number, 'count': articlesResponseWithCount.count, 'articles': articles }
  }
}
