// TODO: refactor
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArticlesComponent from '../../components/articles';
import PaginationComponent from '../../components/pagination';
import { defaultRobotsMeta } from '../../../config';
import PlanePage from '../../components/planePage';

const Renderer: React.FunctionComponent<{
  statusCode,
  count,
  articles
}> = ({ statusCode, count, articles }) => {
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

export default Renderer;
