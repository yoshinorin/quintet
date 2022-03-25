import TagComponent from './tag';
import { Tag } from '../types/tag';
import containerStyles from '../styles/components/container.module.scss';
import style from '../styles/tags.module.scss';

const TagsComponent: React.FunctionComponent<{ tags: Array<Tag> }> = ({ tags }) => {
  return (
    <section className={`${containerStyles['container']}`}>
      <div className={containerStyles['flex-container']}>
        {tags.map((tag: Tag) => {
          return(
            <TagComponent
              tag={tag}
              className={`${style['tag']}`}
              key={tag.id}
            />
          )
        })}
      </div>
    </section>
  )
}

export default TagsComponent;
