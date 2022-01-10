import { Sitemap } from '../types/sitemap';

export async function generateSitemapString(url: string, sitemap: Array<Sitemap>): Promise<string> {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  sitemap.forEach((s) => {
    sitemapXml += `
      <url>
        <loc>${url}${s.loc}</loc>
        <lastmod>${s.lastMod}</lastmod>
      </url>
    `
  });
  return sitemapXml += '</urlset>';
}
