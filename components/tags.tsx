import Link from 'next/link';
import { Tag } from '../types/tag';
import containerStyles from '../styles/components/container.module.scss';
import style from '../styles/tags.module.scss';

const TagsComponent: React.FunctionComponent<{ tags: Array<Tag> }> = ({ tags }) => {
  return (
    <section className={`${containerStyles['flex-container']}`}>
      {tags.map((t: Tag) => {
        return (
          <Link href={`/tags/${t.name}`}>
            <a className={`${style.tag}`} data-tag={t.name.toLowerCase()}>{`${t.name}`}</a>
          </Link>
        )
      })}
    </section>
  )
}

export default TagsComponent;
