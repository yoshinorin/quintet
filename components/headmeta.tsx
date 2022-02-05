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
import { Content } from '../types/content';

const HeadMetaComponent: React.FunctionComponent<{
  robotsMeta?: string
  externalResources?: Array<ExternalResources>
  content?: Content
}> = ({
  robotsMeta,
  externalResources,
  content
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
  const hasContentMeta = content ? true : false;
  /*
    TODO: JSON+LD, og:image
  */
  return(
    <Head>
      <meta charSet="UTF-8"/>
      { hasContentMeta ? <title>{content.title}</title> : <title>{siteName}</title> }
      <meta name="author" content={mainAuthor}/>
      <link href={favicon['url']} rel="icon" type={favicon['type']}/>
      { hasContentMeta && <meta name="description" content="TODO: return description from api " /> }
      <meta property="og:type" content={siteType}/>
      { hasContentMeta ? <meta property="og:title" content={content.title} /> : <meta property="og:title" content={siteName} /> }
      { hasContentMeta ? <meta property="og:url" content="TODO: URL" /> : <meta property="og:url" content={url} /> }
      <meta property="og:site_name" content={siteName}/>
      { hasContentMeta && <meta property="og:description" content="TODO: return description from api " /> }
      <meta property="og:locale" content={lang}/>
      { hasContentMeta && <meta property="article:published_time" content="TODO: published_at" /> }
      { hasContentMeta && <meta property="article:modified_time" content="TODO: modified_time" /> }
      { hasContentMeta ? <meta property="article:author" content="TODO: return author from api" /> : <meta property="article:author" content={mainAuthor}/> }
      {
        (() => {
          if (hasContentMeta && content.tags) {
            return(
              content.tags.map((t => {
                return(
                  <meta property="article:tag" content={t.name} />
                )
              }))
            )
          }
        })()
      }
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content={robotsMeta}/>
      <HeaderScriptTagsComponent
        scriptTags={externalResourceMetas}
      />
    </Head>
  )
}

export default HeadMetaComponent;
