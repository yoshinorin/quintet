import { headers } from 'next/headers';

import { Sitemap } from '../../models/sitemap';
import { getSitemap } from '../../api/sitemap';
import { generateSitemapString } from '../../services/sitemap';
import { url } from '../../../config';
import { getRequestContext } from '../../utils/requestContext';

export async function GET() {
  const response: Response = await getSitemap(getRequestContext(headers()));

  /* TODO
  ctx.res.statusCode = response.status;

  let sitemapResponse = null;
  if (response.status !== 200) {
    return {
      props: {
        statusCode: 404
      }
    }
  }
  */
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
