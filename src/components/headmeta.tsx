export const HeadMetaComponent: React.FunctionComponent<{
  favicon;
  injectMetas;
}> = ({ favicon, injectMetas }) => {
  // TODO: JSON + LD
  return (
    <head>
      {(() => {
        if (injectMetas) {
          return injectMetas.map((m) => {
            return <meta name={m.name} content={m.content} key={m.name} />;
          });
        }
      })()}
      <link href={favicon["url"]} rel="icon" type={favicon["type"]} />
    </head>
  );
};

/* NOTE: Before migrate to AppRouter's head metas
const HeadMetaComponent: React.FunctionComponent<{
  robotsMeta?: string
  content?: Content,
  slug: string
}> = ({
  robotsMeta,
  content,
  slug
}) => {
  // TODO: I want to get trailingSlash settings from `next.config.js`
  // const { trailingSlash } = getConfig();
  const currentSlug = slug === undefined ? '' : slug + "/"
  const currentUrl = new URL(currentSlug, url).href

  if (!robotsMeta) {
    robotsMeta = defaultRobotsMeta;
  }
  const hasContent = content ? true : false;

  // TODO: JSON + LD
  return(
    <head>
      <meta charSet="UTF-8"/>
      {
        (() => {
          if (hasContent) {
            return(
              <>
                <title key="title">{content.title}</title>
                <meta name="author" content={content.authorName} key="author" />
                <meta property="article:author" content={content.authorName} key="article:author" />
                <meta name="description" content={content.description} key="description" />
                <meta property="og:description" content={content.description} key="og:description" />
                <meta property="og:title" content={content.title} key="og:title" />
                <meta property="article:published_time" content={toISODateSrting(content.publishedAt)} key="article:published_time" />
                <meta property="article:modified_time" content={toISODateSrting(content.updatedAt)} key="article:modified_time" />
              </>
            );
          } else {
            return(
              <>
                <title key="title">{siteName}</title>
                <meta name="author" content={mainAuthor} key="author" />
                <meta property="article:author" content={mainAuthor} key="article:author" />
                <meta property="og:title" content={siteName} key="og:title" />
              </>
            );
          }
        })()
      }
      <meta property="og:type" content={siteType} key="og:type" />
      <meta property="og:url" content={currentUrl} key="og:url" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      <meta property="og:locale" content={locale} key="og:locale" />
      {
        (() => {
          if (hasContent && content.tags) {
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
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <meta property="og:image" content={defaultImage} key="og:image" />
      <meta name="robots" content={robotsMeta} key="robots" />
      {
        (() => {
          if (injectMetas) {
            return(
              injectMetas.map((m => {
                return(
                  <meta name={m.name} content={m.content} key={m.name} />
                )
              }))
            )
          }
        })()
      }
      <link href={favicon['url']} rel="icon" type={favicon['type']}/>
    </head>
  )
}

export default HeadMetaComponent;
*/
