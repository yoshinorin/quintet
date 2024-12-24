import { headers } from "next/headers";
import { mainAuthor, siteName, url } from "../../../../config";
import { fetchFeeds } from "../../../api";
import { Feed } from "../../../models/models";
import { generateFeedsString } from "../../../services/feeds";

//export async function get(ctx: any) {
export async function GET() {
  const response: Response = await fetchFeeds(await headers());

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
    return feed;
  });

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
