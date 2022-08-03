import { Sitemap } from '../types/sitemap';
import { getSitemap } from './api/sitemap';
import { generateSitemapString } from '../utils/sitemap';
import { url } from '../config';
import { getRequestContext } from '../utils/requestContext';

const SitemapXml = () => null;

export async function getServerSideProps(ctx: any) {
  const response: Response = await getSitemap(getRequestContext(ctx.req))
  ctx.res.statusCode = response.status;

  let sitemapResponse = null;
  if (response.status !== 200) {
    return ctx.res = 404;
  }
  sitemapResponse = await response.json() as Array<Sitemap>;
  const sitemap = sitemapResponse.map(sitemap => {
    return {
      loc: sitemap.loc,
      lastMod: sitemap.lastMod
    }
  }) as Array<Sitemap>;

  const sitemapXmlString = await generateSitemapString(url, sitemap);
  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.write(sitemapXmlString);
  ctx.res.end();

  return {
    props: {}
  }
}

export default SitemapXml;
