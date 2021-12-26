import Head from 'next/head';
import { defaultRobotsMeta, externalResources as externalResourcesConfig } from '../config';
import { ExternalResources } from '../types/externalResource';

const HeadMetaComponent: React.FunctionComponent<{
  robotsMeta?: string
  externalResources?: Array<ExternalResources>
}> = ({
  robotsMeta,
  externalResources
}) => {
  if (!robotsMeta) {
    robotsMeta = defaultRobotsMeta;
  }
  /* TODO:
      meta: author
      title: title
      link: favicon
      opengraph:
      meta: ogimage
      link: feed
  */
  return(
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content={robotsMeta}/>
      {
        (() => {
          if(externalResources.length > 0 && externalResourcesConfig.length > 0) {
            externalResources.forEach(er => {
              // TODO: impl
            })
          }
        })
      }
    </Head>
  )
}

export default HeadMetaComponent;
