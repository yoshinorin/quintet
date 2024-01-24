'use client';

import { Tag } from '../../models/models';
import { CoverWithNavigationComponent, TagsComponent } from '../../components/components';

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
