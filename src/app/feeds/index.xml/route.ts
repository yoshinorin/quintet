import { headers } from 'next/headers';
import { Feed } from '../../../models/models';
import { fetchFromApi } from '../../../api/request';
import { generateFeedsString } from '../../../services/feeds';
import { api, siteName, mainAuthor } from '../../../../config';
import { requestContextFrom } from '../../../utils/requestContext';
import { sluggize } from '../../../utils/slug';
import { buildUrl } from '../../../utils/url';

//export async function get(ctx: any) {
export async function GET() {
  const ctx = requestContextFrom(headers());
  const url = buildUrl(api.url, sluggize(['feeds', 'index']), false);
  const response: Response = await fetchFromApi(url, null, ctx, null);

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

  const feedXmlString = await generateFeedsString(url, siteName, mainAuthor, feeds);
  return new Response(feedXmlString, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
