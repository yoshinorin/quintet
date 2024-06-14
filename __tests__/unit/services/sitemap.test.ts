import { expect, test } from "vitest";
import { generateSitemapString } from "../../../src/services/sitemap";
import { Sitemap } from "../../../src/models/sitemap";

test("generate sitemap.xml", async () => {
  const data: Array<Sitemap> = [
    {
      loc: "/articles/abc",
      lastMod: "2020-01-01"
    },
    {
      loc: "/articles/def",
      lastMod: "2022-02-02"
    },
    {
      loc: "/diary/",
      lastMod: "2023-03-03"
    }
  ];

  const result = await generateSitemapString("https://example.com", data);
  expect(result.replace(/\s/g, "")).toEqual(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://example.com/articles/abc</loc>
    <lastmod>2020-01-01</lastmod>
    </url>
    <url>
    <loc>https://example.com/articles/def</loc>
    <lastmod>2022-02-02</lastmod>
    </url>
    <url>
    <loc>https://example.com/diary/</loc>
    <lastmod>2023-03-03</lastmod>
    </url>
    </urlset>
    `.replace(/\s/g, "")
  );
});
