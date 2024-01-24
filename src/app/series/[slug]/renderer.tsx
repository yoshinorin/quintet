import { CoverWithNavigationComponent } from '../../../components/cover/withNavigation';
import { SeriesWithArticlesComponent } from '../../../components/seriesWithArticles';

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
