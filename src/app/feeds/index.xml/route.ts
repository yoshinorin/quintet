import { headers } from "next/headers";
import { mainAuthor, siteName, url } from "../../../../config";
import { Feed } from "../../../models/models";
import { generateFeedsString } from "../../../services/feeds";
import { fetchFeeds } from "../../../api";

//export async function get(ctx: any) {
export async function GET() {
  const response: Response = await fetchFeeds(headers());

  if (response.status !== 200) {
    /* NOTE:
    res.statusCode = response.status;
    res.send;
    */
    return new Response("", {
      status: 404,
      headers: {
        "Content-Type": "text/xml"
      }
    });
  }

  let feedResponses = (await response.json()) as Array<Feed>;
  const feeds = feedResponses.map((feed) => {
    return {
      title: feed.title,
      link: feed.link,
      id: feed.id,
      published: feed.published,
      updated: feed.updated
    };
  }) as Array<Feed>;

  const feedXmlString = await generateFeedsString(
    url,
    siteName,
    mainAuthor,
    feeds
  );
  return new Response(feedXmlString, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
}
