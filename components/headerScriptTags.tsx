// import Script from 'next/script'
import { ScriptTag } from '../types/scriptTag';

const HeaderScriptTagsComponent: React.FunctionComponent<{ scriptTags: Array<ScriptTag> }> = ({ scriptTags }) => {
  if (!scriptTags) {
    return;
  }

  return(
    <>
      {scriptTags.map((tag: ScriptTag, idx) => {
        if (tag.src) {
          return(
            <script
              key={idx}
              src={tag.src}
            >
              {tag.code}
            </script>
          )
        } else {
          return(
            // TODO: should fix Prop `dangerouslySetInnerHTML` did not match
            // NOTE: if use <Script> compnents provid from Next.js, Can not render MathJax
            <script
              key={idx}
              type={tag.type}
              dangerouslySetInnerHTML={{
                __html: tag.code,
              }}
            >
            </script>
          )
        }
      })}
    </>
  )
}

export default HeaderScriptTagsComponent;
