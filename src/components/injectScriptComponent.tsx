'use client';

import Script from 'next/script'
import { InjectScript } from '../models/models';

export const InjectScriptComponent: React.FunctionComponent<{
  injectScripts: Array<InjectScript>
}> = ({ injectScripts }) => {
  if (injectScripts.length === 0) {
    return;
  }

  return(
    <>
      {injectScripts.map((s: InjectScript) => {
        return(
          <Script
            key={s.key}
            src={s.src}
            // type={tag.code.type}
            // TODO: more configulable.
            onLoad={() => {
              eval(s.code.code)
            }}
            // TODO: more configulable.
            strategy='lazyOnload'
          >
          </Script>
        )
      })}
    </>
  )
}
