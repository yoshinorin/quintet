import HeadMetaComponent from '../../../components/headmeta';
import CoverWithNavigationComponent from '../../../components/cover/withNavigation';
import ArticlesComponent from '../../../components/articles';
import PaginationComponent from '../../../components/pagination';
import { defaultRobotsMeta } from '../../../../config';
import PlanePage from '../../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode,
  tagName,
  currentPage,
  count,
  articles
}> = ({ statusCode, tagName, currentPage, count, articles }) => {
  if (statusCode !== 200) {
    return <PlanePage
      title={statusCode.toString()}
      content="Something went to wrong..."
    />
  }

  return (
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
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
