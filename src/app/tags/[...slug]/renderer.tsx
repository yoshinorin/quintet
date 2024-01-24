import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import ArticlesComponent from '../../../components/articles';
import PaginationComponent from '../../../components/pagination';

export const Renderer: React.FunctionComponent<{
  tagName,
  currentPage,
  count,
  articles
}> = ({ tagName, currentPage, count, articles }) => {
  return (
    <>
      <CoverWithNavigationComponent
        contentCover={{
          title: "Tags",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath={`tags/${tagName}`}
          current={currentPage}
          total={count}
        />
      </main>
    </>
  )
}
