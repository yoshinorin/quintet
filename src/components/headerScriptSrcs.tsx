// import Script from 'next/script'
import { ScriptSrc } from '../models/script';

const HeaderScriptSrcsComponent: React.FunctionComponent<{ scriptSrcs: Array<ScriptSrc> }> = ({ scriptSrcs }) => {
  if (!scriptSrcs) {
    return;
  }

  return(
    <>
      {scriptSrcs.map((tag: ScriptSrc, idx) => {
        return(
          <script
            key={tag.key + idx}
            src={tag.src}
          >
          </script>
        )
      })}
    </>
  )
}

export default HeaderScriptSrcsComponent;
