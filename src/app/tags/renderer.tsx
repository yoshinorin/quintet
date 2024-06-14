"use client";

import { CoverComponent, TagsComponent } from "../../components/components";
import { Tag } from "../../models/models";

export const Renderer: React.FunctionComponent<{
  tags: Array<Tag>;
}> = ({ tags }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: "Tags",
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <TagsComponent tags={tags} />
      </main>
    </>
  );
};
