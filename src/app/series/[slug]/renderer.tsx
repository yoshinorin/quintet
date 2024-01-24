import { CoverWithNavigationComponent } from '../../../components/cover';
import { SeriesWithArticlesComponent } from '../../../components/series';

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
