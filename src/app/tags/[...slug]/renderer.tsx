import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../../components/components";

export const Renderer: React.FunctionComponent<{
  tagName;
  currentPage;
  count;
  articles;
}> = ({ tagName, currentPage, count, articles }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: tagName,
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <ArticlesComponent articles={articles} />
        <PaginationComponent
          basePath={`tags/${tagName}`}
          current={currentPage}
          total={count}
        />
      </main>
    </>
  );
};
