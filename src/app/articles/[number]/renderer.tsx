import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import ArticlesComponent from '../../../components/articles';
import PaginationComponent from '../../../components/pagination';
import { Article } from '../../../models/models';

export const Renderer: React.FunctionComponent<{
  current: number,
  count: number,
  articles: Array<Article>
}> = ({ current, count, articles }) => {
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
