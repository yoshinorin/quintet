import PlanePage from '../../components/planePage';

export const Renderer: React.FunctionComponent<{
  statusCode: number
}> = ({ statusCode }) => {
  // TODO: improvement (add bc-color, style, statusCode, etc)
  return(
    <>
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
