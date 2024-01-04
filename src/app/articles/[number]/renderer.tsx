import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import ArticlesComponent from '../../../components/articles';
import PaginationComponent from '../../../components/pagination';
import { Article } from '../../../models/models';

export const Renderer: React.FunctionComponent<{
  slug: string,
  current: number,
  count: number,
  articles: Array<Article>
}> = ({ slug, current, count, articles }) => {
  return (
    <>
      <HeadMetaComponent
        slug={slug}
      />
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
