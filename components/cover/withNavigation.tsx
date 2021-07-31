import CoverComponent from './index';
import NavigationComponent from '../navigation';
import { coverBottomItems } from '../../config';

const CoverWithNavigationComponent: React.FunctionComponent<{}> = ({}) => {
  return(
    <>
      <CoverComponent />
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
