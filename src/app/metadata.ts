import { Metadata } from "next";
import {
  defaultImage,
  defaultRobotsMeta,
  locale,
  siteName
} from "../../config";
import { Content } from "../models/content";
import { toISODateSrting } from "../utils/time";
import { fullUrl } from "../utils/url";

// TODO: write test code
export async function generateForArticleOrPage(
  url: string,
  content: Content
): Promise<Metadata> {
  const robotsAttributes =
    content.robotsAttributes === undefined ||
    content.robotsAttributes === null ||
    !content.robotsAttributes.trim()
      ? defaultRobotsMeta
      : content.robotsAttributes;

  const nf = robotsAttributes.includes("nofollow") ? { follow: false } : {};
  const ni = robotsAttributes.includes("noindex") ? { index: false } : {};

  const tags = content.tags ?? [];

  return {
    title: content.title,
    authors: [{ name: content.authorName }],
    description: content.description,
    robots: {
      noarchive: robotsAttributes.includes("noarchive"),
      noimageindex: robotsAttributes.includes("noimageindex"),
      ...nf,
      ...ni
    },
    /* NOTE:
      I don't want insert `twitter:<field>` to head. But how to...???
      If enable openGraph, `twitter:<field>` will be generate automatically.
    */
    openGraph: {
      siteName: siteName,
      locale: locale,
      type: "article",
      url: fullUrl(url, true),
      images: fullUrl(defaultImage, false),
      authors: [content.authorName],
      tags: tags.length !== 0 ? content.tags.map((t) => t.name) : [],
      publishedTime: toISODateSrting(content.publishedAt),
      modifiedTime: toISODateSrting(content.updatedAt)
    }
  };
}
