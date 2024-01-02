'use client';

import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import TagsComponent from '../../components/tags';
import { defaultRobotsMeta } from '../../../config';
import PlanePage from '../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode,
  tags
}> = ({ statusCode, tags }) => {
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
