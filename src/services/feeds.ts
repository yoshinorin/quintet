import { Feed } from "../models/models";
import { toISODateSrting } from "../utils/time";

const FEED_URL = "/feeds/index.xml";

export async function generateFeedsString(
  url: string,
  siteName: string,
  mainAuthor: string,
  feeds: Array<Feed>
): Promise<string> {
  const latest = feeds[0];

  // https://validator.w3.org/feed/docs/atom.html
  let atomFeedXml = `
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${siteName}</title>
    <link href="${url}${FEED_URL}" rel="self"/>
    <link href="${url}"/>
    <updated>${toISODateSrting(latest.updated)}</updated>
    <id>${url}</id>
    <author>
      <name>${mainAuthor}</name>
    </author>
  `;

  feeds.forEach((f) => {
    const u = `${url}${f.link}`;
    // TODO: fix trailing slash
    atomFeedXml += `
      <entry>
        <title>${f.title}</title>
        <link href="${u}" />
        <id>${u}</id>
        <published>${toISODateSrting(f.published)}</published>
        <updated>${toISODateSrting(f.updated)}</updated>
      </entry>
    `;
  });
  return (atomFeedXml += "</feed>");
}
