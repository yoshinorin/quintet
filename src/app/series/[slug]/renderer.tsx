import { CoverWithNavigationComponent, SeriesWithArticlesComponent } from '../../../components/components';

export const Renderer: React.FunctionComponent<{
  seriresWithArticles
}> = ({ seriresWithArticles }) => {
  return (
    <>
      <CoverWithNavigationComponent
        contentCover={{
          title: seriresWithArticles.title,
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <SeriesWithArticlesComponent
           seriresWithArticles={seriresWithArticles}
        />
      </main>
    </>
  )
}
