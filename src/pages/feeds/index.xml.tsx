import { Feed } from '../../models/feed';
import { getFeed } from '../../api/feed';
import { generateFeedsString } from '../../services/feeds';
import { url } from '../../../config';
import { getRequestContext } from '../../utils/requestContext';
import { siteName, mainAuthor } from '../../../config';

const SitemapXml = () => null;

export async function getServerSideProps(ctx: any) {
  const response: Response = await getFeed(getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  let feedResponses = null;
  if (response.status !== 200) {
    return {
      props: {
        statusCode: 404
      }
    }
  }
  feedResponses = await response.json() as Array<Feed>;
  const feeds = feedResponses.map(feed => {
    return {
      title: feed.title,
      link: feed.link,
      id: feed.id,
      published: feed.published,
      updated: feed.updated
    }
  }) as Array<Feed>;

  const feedXmlString = await generateFeedsString(url, siteName, mainAuthor, feeds);
  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.write(feedXmlString);
  ctx.res.end();

  return {
    props: {}
  }
}

export default SitemapXml;
