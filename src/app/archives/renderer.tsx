import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArchivesComponent from '../../components/archives';
import { Archive } from '../../models/models';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  slug: string,
  archives: Array<Archive>
}> = ({ slug, archives }) => {
  return (
    <>
      <HeadMetaComponent
        slug={slug}
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
