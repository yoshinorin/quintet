import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  slug: string,
  count,
  articles
}> = ({ slug, count, articles }) => {
  return (
    <>
      <HeadMetaComponent
        slug={slug}
        robotsMeta={defaultRobotsMeta}
      />
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
