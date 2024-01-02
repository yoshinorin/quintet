import { headers } from 'next/headers';

import { Sitemap } from '../../models/sitemap';
import { getSitemap } from '../../api/sitemap';
import { generateSitemapString } from '../../services/sitemap';
import { url } from '../../../config';
import { getRequestContext } from '../../utils/requestContext';
import { NextApiResponse } from 'next';

export async function GET(res: NextApiResponse) {
  const response: Response = await getSitemap(getRequestContext(headers()));

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