import Head from 'next/head';
import { defaultRobotsMeta } from '../config';

const HeadMetaComponent: React.FunctionComponent<{ robotsMeta: string | null }> = ({ robotsMeta }) => {
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
    </Head>
  )
}

export default HeadMetaComponent;
