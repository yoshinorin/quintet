import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArchivesComponent from '../../components/archives';
import { Archive } from '../../models/archive';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{ archives: Array<Archive> }> = ({ archives }) => {
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
