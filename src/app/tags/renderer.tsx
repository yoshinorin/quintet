'use client';

import { Tag } from '../../models/models';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import TagsComponent from '../../components/tags';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  slug: string,
  tags: Array<Tag>
}> = ({ slug, tags }) => {
  return (
    <>
      <HeadMetaComponent
        slug={slug}
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
