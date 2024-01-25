import {
  ArticlesComponent,
  CoverWithNavigationComponent,
  PaginationComponent
} from '../../components/components';

export const Renderer: React.FunctionComponent<{
  count,
  currentPage,
  articles
}> = ({ count, currentPage, articles }) => {
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
          current={currentPage}
          total={count}
        />
      </main>
    </>
  )
}
