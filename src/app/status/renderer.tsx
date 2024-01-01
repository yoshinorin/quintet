import HeadMetaComponent from '../../components/headmeta';
import PlanePage from '../../components/planePage';
import { defaultRobotsMeta } from '../../../config';

const Renderer: React.FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
  // TODO: improvement (add bc-color, style, statusCode, etc)
  return(
    <>
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
        {
          (() => {
            if (statusCode === 200) {
              return(
                <PlanePage
                  title="Operational"
                  content="API Server is operational."
                />
              )
            } else {
              return(
                <PlanePage
                   title="Down"
                    content="API Server is down."
                />
              )
            }
          })()
        }
    </>
  );
}

export default Renderer;
