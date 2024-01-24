import { CoverComponent } from './index';
import { ContentCover } from '../../models/models';
import { NavigationComponent } from '../navigation';
import styles from '../../styles/navigation.module.scss';
import { coverBottomItems } from '../../../config';

export const CoverWithNavigationComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
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
