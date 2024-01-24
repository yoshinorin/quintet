import { CoverWithNavigationComponent } from '../../components/cover/withNavigation';
import { ArticlesComponent } from '../../components/articles';
import { PaginationComponent } from '../../components/pagination';

export const Renderer: React.FunctionComponent<{
  count,
  articles
}> = ({ count, articles }) => {
  return (
    <>
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath='articles'
          current={1}
          total={count}
        />
      </main>
    </>
  )
}
