"use client";

import React, { useEffect, useState } from "react";
import { tagsPage } from "../../config";
import { Tag } from "../models/models";
import containerStyles from "../styles/components/container.module.scss";
import style from "../styles/tags.module.scss";
import { TagComponent } from "./tag";

export const TagsComponent: React.FunctionComponent<{ tags: Array<Tag> }> = ({
  tags
}) => {
  const [keyword, setKeyword] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    if (keyword === "") {
      setFilteredTags(tags);
      return;
    }

    const searchKeywords = keyword.trim().toLowerCase();
    if (searchKeywords.length == 0) {
      setFilteredTags(tags);
      return;
    }

    const result = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchKeywords)
    );
    setFilteredTags(result);
  }, [keyword]);

  return (
    <section className={`${containerStyles["container"]}`}>
      <form>
        <input
          placeholder={tagsPage.titlePlaceholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <FilterdItems tags={filteredTags} />
    </section>
  );
};

const FilterdItems: React.FunctionComponent<{ tags: Array<Tag> }> = ({
  tags
}) => {
  return (
    <>
      <div className={style["found"]}>
        {tags.length} {tagsPage.found}
      </div>
      <div className={containerStyles["flex-container"]}>
        {tags.map((tag: Tag) => {
          return (
            <TagComponent
              tag={tag}
              className={`${style["tag"]}`}
              key={tag.id}
            />
          );
        })}
      </div>
    </>
  );
};
