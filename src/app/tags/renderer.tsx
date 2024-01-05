'use client';

import { Tag } from '../../models/models';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import TagsComponent from '../../components/tags';

export const Renderer: React.FunctionComponent<{
  tags: Array<Tag>
}> = ({ tags }) => {
  return (
    <>
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
