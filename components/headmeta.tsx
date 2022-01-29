import Head from 'next/head';
import {
  defaultRobotsMeta,
  externalResources as externalResourcesConfig,
  siteName,
  siteType,
  mainAuthor,
  lang,
  url,
  favicon
} from '../config';
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
  /* TODO: JSON+LD, og:image
  */
  return(
    <Head>
      <meta charSet="UTF-8"/>
      <title>${siteName}</title>
      <meta name="author" content={mainAuthor}/>
      <link href={favicon['url']} rel="icon" type={favicon['type']}/>
      <meta property="og:type" content={siteType}/>
      <meta property="og:title" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName}/>
      <meta property="og:locale" content={lang}/>
      <meta property="article:author" content={mainAuthor}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content={robotsMeta}/>
      <HeaderScriptTagsComponent
        scriptTags={externalResourceMetas}
      />
    </Head>
  )
}

export default HeadMetaComponent;
