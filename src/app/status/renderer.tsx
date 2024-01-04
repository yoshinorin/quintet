import HeadMetaComponent from '../../components/headmeta';
import PlanePage from '../../components/planePage';
import { defaultRobotsMeta } from '../../../config';

export const Renderer: React.FunctionComponent<{
  slug: string,
  statusCode: number
}> = ({ slug, statusCode }) => {
  // TODO: improvement (add bc-color, style, statusCode, etc)
  return(
    <>
      <HeadMetaComponent
        slug={slug}
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
