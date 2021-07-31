import styles from '../../styles/components/cover.module.scss';
import contentStyles from '../../styles/components/content.module.scss';

const CoverComponent: React.FunctionComponent<{}> = ({}) => {
  return(
    <div className={styles['cover']}>
      <div className={`${styles['content-header']} ${contentStyles['content-main']}`}>
        {/* TODO */}
      </div>
    </div>
  )
}

export default CoverComponent;
