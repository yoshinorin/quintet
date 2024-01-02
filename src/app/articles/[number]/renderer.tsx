import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import ArticlesComponent from '../../../components/articles';
import PaginationComponent from '../../../components/pagination';
import { Article } from '../../../models/article';
import PlanePage from '../../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode: number,
  current: number,
  count: number,
  articles: Array<Article>
}> = ({ statusCode, current, count, articles }) => {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
  }

  return (
    <>
      <HeadMetaComponent />
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath='articles'
          current={current}
          total={count}
        />
      </main>
    </>
  )
}
