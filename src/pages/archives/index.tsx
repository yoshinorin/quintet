import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import ArchivesComponent from '../../components/archives';
import { getArchives } from '../../api/archives';
import { Archive, ArchiveResponse } from '../../models/archive';
import { defaultRobotsMeta } from '../../../config';
import { getRequestContext } from '../../utils/requestContext';
import PlanePage from '../../components/planePage';

const Page: React.FunctionComponent<{ statusCode: number, archives: Array<Archive> }> = ({ statusCode, archives }) => {
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

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArchives(getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  let archiveResponse: Array<ArchiveResponse> = null;
  let archives: Array<Archive> = [];
  if (response.status === 200) {
    archiveResponse = await response.json() as Array<ArchiveResponse>;
    archives = archiveResponse.map(article => {
      return {
        path: article.path,
        title: article.title,
        publishedAt: article.publishedAt
      } as Archive
    });
  }

  return {
    props: {
      statusCode: response.status,
      archives: archives
    }
  }
}

export default Page;
