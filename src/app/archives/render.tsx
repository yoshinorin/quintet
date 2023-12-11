import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArchivesComponent from '../../components/archives';
import { Archive } from '../../models/archive';
import { defaultRobotsMeta } from '../../../config';
import PlanePage from '../../components/planePage';

const Renderer: React.FunctionComponent<{ statusCode: number, archives: Array<Archive> }> = ({ statusCode, archives }) => {
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
          title: "Archives",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        {/* TODO: implement search conditions component */}
        <ArchivesComponent
          archives={archives}
        />
      </main>
    </>
  )
}

export default Renderer;
