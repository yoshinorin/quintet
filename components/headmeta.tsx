import Head from 'next/head';
import {
  defaultRobotsMeta,
  externalResources as externalResourcesConfig,
  siteName,
  siteType,
  mainAuthor,
  locale,
  url,
  favicon,
  defaultImage
} from '../config';
import { ExternalResources } from '../types/externalResource';
import HeaderScriptTagsComponent from '../components/headerScriptTags';
import { ScriptTag } from '../types/scriptTag';
import { getScriptTags } from '../utils/scriptTags';
import { Content } from '../types/content';
import { useRouter } from "next/router";
import { convertUnixTimeToISODateSrting } from '../utils/time';

const HeadMetaComponent: React.FunctionComponent<{
  robotsMeta?: string
  externalResources?: Array<ExternalResources>
  content?: Content
}> = ({
  robotsMeta,
  externalResources,
  content
}) => {
  const router = useRouter();
  const currentUrl = new URL(router.asPath, url).href

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
    TODO: JSON+LD
  */
  return(
    <Head>
      <meta charSet="UTF-8"/>
      { hasContentMeta ? <title>{content.title}</title> : <title>{siteName}</title> }
      <meta name="author" content={mainAuthor}/>
      <link href={favicon['url']} rel="icon" type={favicon['type']}/>
      { hasContentMeta && <meta name="description" content={content.description} /> }
      <meta property="og:type" content={siteType}/>
      { hasContentMeta ? <meta property="og:title" content={content.title} /> : <meta property="og:title" content={siteName} /> }
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName}/>
      { hasContentMeta && <meta property="og:description" content={content.description} /> }
      <meta property="og:locale" content={locale}/>
      { hasContentMeta && <meta property="article:published_time" content={convertUnixTimeToISODateSrting(content.publishedAt)} /> }
      { hasContentMeta && <meta property="article:modified_time" content={convertUnixTimeToISODateSrting(content.updatedAt)} /> }
      { hasContentMeta ? <meta property="article:author" content={content.authorName} /> : <meta property="article:author" content={mainAuthor}/> }
      {
        (() => {
          if (hasContentMeta && content.tags) {
            return(
              content.tags.map((t => {
                return(
                  <meta property="article:tag" content={t.name} key={t.id} />
                )
              }))
            )
          }
        })()
      }
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta property="og:image" content={defaultImage}/>
      <meta name="robots" content={robotsMeta}/>
      <HeaderScriptTagsComponent
        scriptTags={externalResourceMetas}
      />
    </Head>
  )
}

export default HeadMetaComponent;
