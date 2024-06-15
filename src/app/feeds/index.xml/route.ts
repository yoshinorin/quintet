import { headers } from "next/headers";
import { api, mainAuthor, siteName, url } from "../../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../../api/request";
import { Feed } from "../../../models/models";
import { generateFeedsString } from "../../../services/feeds";
import { requestContextFrom } from "../../../utils/requestContext";
import { buildUrl, sluggize } from "../../../utils/url";

//export async function get(ctx: any) {
export async function GET() {
  // TODO: devide into another `function` and move `api` dir.
  const apiUrl = buildUrl(api.url, sluggize(["v1", "feeds", "index"]), false);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx)
  };
  const response: Response = await fetchFromApi(apiUrl, options);

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
