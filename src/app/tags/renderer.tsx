'use client';

import { Tag } from '../../models/models';
import { CoverComponent, TagsComponent } from '../../components/components';

export const Renderer: React.FunctionComponent<{
  tags: Array<Tag>
}> = ({ tags }) => {
  return (
    <>
      <CoverComponent
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
