// import Script from 'next/script'
import Script from 'next/script'
import { ScriptSrc } from '../models/models';

const HeaderScriptSrcsComponent: React.FunctionComponent<{ scriptSrcs: Array<ScriptSrc> }> = ({ scriptSrcs }) => {
  if (!scriptSrcs) {
    return;
  }

  return(
    <>
      {scriptSrcs.map((tag: ScriptSrc, idx) => {
        return(
          <Script
            key={tag.key + idx}
            src={tag.src}
            strategy='lazyOnload'
          >
          </Script>
        )
      })}
    </>
  )
}

export default HeaderScriptSrcsComponent;
