import Head from 'next/head';
import { defaultRobotsMeta, externalResources as externalResourcesConfig } from '../config';
import { ExternalResources } from '../types/externalResource';
import HeaderScriptTagsComponent from '../components/headerScriptTags';
import { ScriptTag } from '../types/scriptTag';
import { getScriptTags } from '../utils/scriptTags';

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
  const hasExternalResources = (externalResources && externalResourcesConfig)
  let externalResourceMetas: Array<ScriptTag> = [];
  if(hasExternalResources) {
    // NOTE: currently support only <script> tag
    externalResourceMetas = getScriptTags(externalResources, externalResourcesConfig);
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
      <HeaderScriptTagsComponent
        scriptTags={externalResourceMetas}
      />
    </Head>
  )
}

export default HeadMetaComponent;
