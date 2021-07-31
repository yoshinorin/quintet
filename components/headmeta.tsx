import Head from 'next/head';

const HeadMetaComponent: React.FunctionComponent<{}> = () => {
  /* TODO:
      meta: author
      title: title
      link: favicon
      opengraph:
      meta: robots
      meta: ogimage
      link: feed
  */
  return(
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
  )
}

export default HeadMetaComponent;
