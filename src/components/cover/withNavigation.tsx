import CoverComponent from './index';
import { ContentCover } from '../../models/content';
import NavigationComponent from '../navigation';
import styles from '../../styles/navigation.module.scss';
import { coverBottomItems } from '../../../config';

const CoverWithNavigationComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return(
    <>
      <CoverComponent
        contentCover={contentCover}
      />
      <div className={styles['cover-bottom-nav']}>
        <NavigationComponent
          items={coverBottomItems}
        />
      </div>
    </>
  )
}

export default CoverWithNavigationComponent;
