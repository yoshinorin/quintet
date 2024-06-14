import { Tag } from "../models/models";

export const TagComponent: React.FunctionComponent<{
  tag: Tag;
  className: string | null;
}> = ({ tag, className }) => {
  {
    /*
    NOTE:
      The Next.js can not pass custom argument with <Link> component.
      So, I want to belows, but can not...

      Front-end visible URL: https://example.com/tags/{tagName}
      API call (when transition with <Link>):  https://example.com/tags/{tagId}

      But, it can not. So, I have to find the tagging contents with tagName.
    */
  }
  return (
    <a
      href={`/tags/${tag.name}`}
      className={className ? className : null}
      target="_blank"
      data-tag={tag.name.toLowerCase()}>
      {`${tag.name} ${tag.count ? `(${tag.count})` : ""}`}
    </a>
  );
};
