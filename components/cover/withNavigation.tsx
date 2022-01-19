import CoverComponent from './index';
import { ContentCover } from '../../types/content';
import NavigationComponent from '../navigation';
import { coverBottomItems } from '../../config';

const CoverWithNavigationComponent: React.FunctionComponent<{ contentCover: ContentCover | null }> = ({ contentCover }) => {
  return(
    <>
      <CoverComponent
        contentCover={contentCover}
      />
      {/* TODO: aboid inlins tyle */}
      <div style={{background: '#f7f7f7'}}>
        <NavigationComponent
          items={coverBottomItems}
        />
      </div>
    </>
  )
}

export default CoverWithNavigationComponent;
