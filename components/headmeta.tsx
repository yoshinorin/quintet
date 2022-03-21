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
import HeaderScriptSrcsComponent from './headerScriptSrcs';
import { ScriptSrc } from '../types/script';
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
  let externalResourceMetas: Array<ScriptSrc> = [];
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
      { hasContentMeta ?
        <title key="title">{content.title}</title>
        :
        <title key="title">{siteName}</title>
      }
      { hasContentMeta ?
        <meta name="author" content={content.authorName}/>
        :
        <meta name="author" content={mainAuthor}/>
      }

      <link href={favicon['url']} rel="icon" type={favicon['type']}/>
      { hasContentMeta && <meta name="description" content={content.description} key="description" /> }
      <meta property="og:type" content={siteType}/>
      { hasContentMeta ?
        <meta property="og:title" content={content.title} key="og:title" />
        :
        <meta property="og:title" content={siteName} key="og:title" />
      }
      <meta property="og:url" content={currentUrl} key="og:url" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      { hasContentMeta && <meta property="og:description" content={content.description} key="og:description" /> }
      <meta property="og:locale" content={locale}/>
      { hasContentMeta && <meta property="article:published_time" content={convertUnixTimeToISODateSrting(content.publishedAt)} key="article:published_time" /> }
      { hasContentMeta && <meta property="article:modified_time" content={convertUnixTimeToISODateSrting(content.updatedAt)} key="article:modified_time" /> }
      { hasContentMeta ?
        <meta property="article:author" content={content.authorName} key="article:author" />
        :
        <meta property="article:author" content={mainAuthor} key="article:author" />
      }
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
      <meta property="og:image" content={defaultImage} key="og:image" />
      <meta name="robots" content={robotsMeta} key="robots" />
      <HeaderScriptSrcsComponent
        scriptSrcs={externalResourceMetas}
      />
    </Head>
  )
}

export default HeadMetaComponent;
