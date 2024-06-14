import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../components/components";

export const Renderer: React.FunctionComponent<{
  count;
  currentPage;
  articles;
}> = ({ count, currentPage, articles }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <ArticlesComponent articles={articles} />
        <PaginationComponent
          basePath="articles"
          current={currentPage}
          total={count}
        />
      </main>
    </>
  );
};
