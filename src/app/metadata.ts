import { Content } from '../models/content';
import { defaultRobotsMeta } from '../../config';
import { convertUnixTimeToISODateSrting } from '../utils/time';
import { Metadata } from 'next';

// TODO: write test code
export async function generateForArticleOrPage(content: Content): Promise<Metadata> {
  const robotsAttributes = content.robotsAttributes === undefined ? defaultRobotsMeta : content.robotsAttributes;

  // TODO: add more attributes.
  return {
    title: content.title,
    authors: [{ name: content.authorName }],
    description: content.description,
    robots: {
      noarchive: robotsAttributes.includes('noarchive'),
      follow: !robotsAttributes.includes('nofollow'),                // TODO: DO NOT return `follow` object if `nofollow` is false
      noimageindex: robotsAttributes.includes('noimageindex'),
      index: !robotsAttributes.includes('noindex'),                  // TODO: DO NOT return `index` object if `noindex` is false
    },
    /* NOTE:
      I don't want insert `twitter:<field>` to head. But how to...???
      If enable openGraph, `twitter:<field>` will be generate automatically.
    */
    openGraph: {
      type: 'article',
      publishedTime: convertUnixTimeToISODateSrting(content.publishedAt),
      modifiedTime: convertUnixTimeToISODateSrting(content.updatedAt)
    }
  };
}
