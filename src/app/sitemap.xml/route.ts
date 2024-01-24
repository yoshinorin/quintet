import { Sitemap } from '../../models/models';
import { getSitemap } from '../../api/sitemap';
import { generateSitemapString } from '../../services/sitemap';
import { url } from '../../../config';
import { getRequestContext } from '../../utils/requestContext';

export async function GET() {
  const response: Response = await getSitemap(getRequestContext());

  if (response.status !== 200) {
    return new Response('', {
      status: 404 ,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }

  let sitemapResponse = await response.json() as Array<Sitemap>;
  const sitemap = sitemapResponse.map(sitemap => {
    return {
      loc: sitemap.loc,
      lastMod: sitemap.lastMod
    }
  }) as Array<Sitemap>;

  const sitemapXmlString = await generateSitemapString(url, sitemap);
  return new Response(sitemapXmlString, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
