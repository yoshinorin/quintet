import Link from 'next/link';
import { Tag } from '../types/tag';
import containerStyles from '../styles/components/container.module.scss';
import style from '../styles/tags.module.scss';


const TagsComponent: React.FunctionComponent<{ tags: Array<Tag> }> = ({ tags }) => {
  return (
    <section className={`${containerStyles['flex-container']}`}>
      {tags.map((t: Tag) => {
        {/*
        NOTE:
          The Next.js can not pass custom argument with <Link> component.
          So, I want to belows, but can not...

          Front-end visible URL: https://example.com/tags/{tagName}
          API call (when transition with <Link>):  https://example.com/tags/{tagId}

          But, it can not. So, I have to find the tagging contents with tagName.
        */}
        return (
          <Link
            href={`/tags/${t.name}`}
            key={t.id}
          >
            <a
              className={`${style.tag}`}
              target="_blank"
              data-tag={t.name.toLowerCase()}
            >
              {`${t.name}`}
            </a>
          </Link>
        )
      })}
    </section>
  )
}

export default TagsComponent;
