import { headers } from 'next/headers';
import { Sitemap } from '../../models/models';
import { fetchFromApi } from '../../api/request';
import { generateSitemapString } from '../../services/sitemap';
import { requestContextFrom } from '../../utils/requestContext';
import { api } from '../../../config';
import { buildUrl, sluggize } from '../../utils/url';

export async function GET() {
  const ctx = requestContextFrom(headers());
  const url = buildUrl(api.url, sluggize(['sitemaps']), true);
  const response: Response = await fetchFromApi(url, null, ctx, null);

  if (response.status !== 200) {
    return new Response('', {
      status: 404 ,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }

  const sitemapResponse = await response.json() as Array<Sitemap>;
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
