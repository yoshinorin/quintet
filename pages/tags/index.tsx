import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import TagsComponent from '../../components/tags';
import { Tag } from '../../models/tag';
import { defaultRobotsMeta } from '../../config';
import { getTags } from '../../api/tags';
import { getRequestContext } from '../../utils/requestContext';
import PlanePage from '../../components/planePage';

export default function Page({ statusCode, tags }) {
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
        <TagsComponent
          tags={tags}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getTags(getRequestContext(ctx.req));
  ctx.res.statusCode = response.status;

  let tags: Array<Tag> = [];
  if (response.status === 200) {
    tags = await response.json() as Array<Tag>;
  }

  return {
    props: {
      statusCode: response.status,
      tags: tags
    }
  }
}
