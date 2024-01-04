import Script from 'next/script'
import { ScriptCode } from '../models/models';

const MainBottomCodesComponent: React.FunctionComponent<{ scriptCodes: Array<ScriptCode> }> = ({ scriptCodes }) => {
  if (!scriptCodes) {
    return (<></>);
  }

  return(
    <>
      {scriptCodes.map((code: ScriptCode, idx) => {
        return(
          // TODO: should fix Prop `dangerouslySetInnerHTML` did not match
          // NOTE: if use <Script> compnents provid from Next.js, Can not render MathJax
          <Script
            key={code.key + idx}
            type={code.type}
            dangerouslySetInnerHTML={{
              __html: code.code,
            }}
            strategy='lazyOnload'
          >
          </Script>
        )
      })}
    </>
  )
}

export default MainBottomCodesComponent;
