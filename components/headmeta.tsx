import Head from 'next/head';

export default function HeadMeta({}) {
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
