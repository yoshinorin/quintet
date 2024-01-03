import { headers } from 'next/headers';

import { Feed } from '../../../models/models';
import { getFeed } from '../../../api/feed';
import { generateFeedsString } from '../../../services/feeds';
import { url } from '../../../../config';
import { getRequestContext } from '../../../utils/requestContext';

//export async function get(ctx: any) {
export async function GET() {
  const response: Response = await getFeed(getRequestContext(headers()));

  if (response.status !== 200) {
    /* NOTE:
    res.statusCode = response.status;
    res.send;
    */
    return new Response('', {
      status: 404 ,
      headers: {
        "Content-Type": "text/xml",
      },
    });
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
