'use client';

// import Script from 'next/script'
import Script from 'next/script'
import { InjectScript } from '../models/models';

export const InjectScriptComponent: React.FunctionComponent<{
  injectScript: Array<InjectScript>
}> = ({ injectScript }) => {
  if (!injectScript) {
    return;
  }

  return(
    <>
      {injectScript.map((tag: InjectScript) => {
        console.log(tag)
        return(
          <>
            <Script
              key={tag.key}
              src={tag.src}
              // type={tag.code.type}
              // TODO: more configulable.
              onLoad={() => {
                eval(tag.code.code)
              }}
              // TODO: more configulable.
              strategy='lazyOnload'
            >
            </Script>
          </>
        )
      })}
    </>
  )
}
