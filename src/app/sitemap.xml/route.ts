import { headers } from "next/headers";
import { api } from "../../../config";
import {
  RequestOptions,
  fetchFromApi,
  requestHeaderFrom
} from "../../api/request";
import { Sitemap } from "../../models/models";
import { generateSitemapString } from "../../services/sitemap";
import { requestContextFrom } from "../../utils/requestContext";
import { buildUrl, sluggize } from "../../utils/url";

export async function GET() {
  // TODO: devide into another `function` and move `api` dir.
  const url = buildUrl(api.url, sluggize(["v1", "sitemaps"]), true);
  const ctx = requestContextFrom(headers());
  const options: RequestOptions = {
    headers: requestHeaderFrom(ctx)
  };
  const response: Response = await fetchFromApi(url, options);

  if (response.status !== 200) {
    return new Response("", {
      status: 404,
      headers: {
        "Content-Type": "text/xml"
      }
    });
  }

  const sitemapResponse = (await response.json()) as Array<Sitemap>;
  const sitemap = sitemapResponse.map((sitemap) => {
    return {
      loc: sitemap.loc,
      lastMod: sitemap.lastMod
    };
  }) as Array<Sitemap>;

  const sitemapXmlString = await generateSitemapString(url, sitemap);
  return new Response(sitemapXmlString, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
}
