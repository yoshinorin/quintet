import { Sitemap } from '../types/sitemap';
import { getSitemap } from './api/sitemap';
import { generateSitemapString } from '../utils/sitemap';

const SitemapXml = () => null;

export async function getServerSideProps(ctx: any) {
  const response: Response = await getSitemap()
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

  const sitemapXmlString = await generateSitemapString(sitemap);
  ctx.res.end(sitemapXmlString);

  return {
    props: {}
  }
}

export default SitemapXml;
