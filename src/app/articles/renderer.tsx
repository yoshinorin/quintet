import {
  ArticlesComponent,
  CoverWithNavigationComponent,
  PaginationComponent
} from '../../components/components';

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
