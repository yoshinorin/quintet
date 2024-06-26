import {
  CoverComponent,
  SeriesWithArticlesComponent
} from "../../../components/components";

export const Renderer: React.FunctionComponent<{
  seriresWithArticles;
}> = ({ seriresWithArticles }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: seriresWithArticles.title,
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <SeriesWithArticlesComponent
          seriresWithArticles={seriresWithArticles}
        />
      </main>
    </>
  );
};
