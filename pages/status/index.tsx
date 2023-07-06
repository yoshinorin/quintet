import HeadMetaComponent from '../../components/headmeta';
import PlanePage from '../../components/planePage';
import { getStatus } from '../../api/status';
import { getRequestContext } from '../../utils/requestContext';
import { defaultRobotsMeta } from '../../config';

const Page: React.FunctionComponent<{ statusCode: number }> = ({ statusCode }) => {
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

export async function getServerSideProps(ctx: any) {
  const response: Response = await getStatus(getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  return {
    props: {
      statusCode: response.status
    }
  }
}

export default Page;
