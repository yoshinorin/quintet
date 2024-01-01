import { headers } from 'next/headers';

import { Feed } from '../../../models/feed';
import { getFeed } from '../../../api/feed';
import { generateFeedsString } from '../../../services/feeds';
import { url } from '../../../../config';
import { getRequestContext } from '../../../utils/requestContext';

//export async function get(ctx: any) {
export async function GET() {
  const response: Response = await getFeed(getRequestContext(headers()));
  // ctx.res.statusCode = response.status;  // TODO

  if (response.status !== 200) {
    return new Response(new Blob(), { status: 404 });
  }
  let feedResponses = await response.json() as Array<Feed>;
  const feeds = feedResponses.map(feed => {
    return {
      title: feed.title,
      link: feed.link,
      id: feed.id,
      published: feed.published,
      updated: feed.updated
    }
  }) as Array<Feed>;

  const feedXmlString = await generateFeedsString(url, feeds);
  return new Response(feedXmlString, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
