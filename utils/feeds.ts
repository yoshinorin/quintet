import { Feed } from '../types/feed';
import { convertUnixTimeToISODateSrting } from '../utils/time';
import { siteName, mainAuthor } from '../config';

const FEED_URL = '/feeds/index.xml';

export async function generateFeedsString(url: string, feeds: Array<Feed>): Promise<string> {

  const latest = feeds[feeds.length - 1]

  // TODO: format all of DateTime to `YYYY-MM-DDThh:mm:ss.000Z`
  // https://validator.w3.org/feed/docs/atom.html
  let atomFeedXml = `
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${siteName}</title>
    <link href="${url}${FEED_URL}" rel="self"/>
    <link href="${url}"/>
    <updated>${convertUnixTimeToISODateSrting(latest.updated)}</updated>
    <id>${url}</id>
    <author>
      <name>${mainAuthor}</name>
    </author>
  `

  feeds.forEach((f) => {
    const u = `${url}${f.link}/`;
    atomFeedXml += `
      <entry>
        <title>${f.title}</title>
        <link href="${u}" />
        <id>${u}</id>
        <published>${convertUnixTimeToISODateSrting(f.published)}</published>
        <updated>${convertUnixTimeToISODateSrting(f.updated)}</updated>
      </entry>
    `
  });
  return atomFeedXml += '</feed>';
}
