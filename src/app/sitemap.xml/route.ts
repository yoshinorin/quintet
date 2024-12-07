import { headers } from "next/headers";
import { fetchSitemap } from "../../api";
import { Sitemap } from "../../models/models";
import { generateSitemapString } from "../../services/sitemap";

export async function GET() {
  const response: Response = await fetchSitemap(await headers());

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

  const sitemapXmlString = await generateSitemapString(response.url, sitemap);
  return new Response(sitemapXmlString, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
}
