import Cover from './index';
import Navigation from '../navigation';
import { coverBottomItems } from '../../config';

export default function CoverWithNavigation({}) {
  return(
    <>
      <Cover />
      {/* TODO: aboid inlins tyle */}
      <div style={{background: '#f7f7f7'}}>
        <Navigation
          items={coverBottomItems}
        />
      </div>
    </>
  )
}
