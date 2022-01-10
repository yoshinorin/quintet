import { Feed } from '../types/feed';

export async function generateFeedsString(url: string, feeds: Array<Feed>): Promise<string> {
  // https://validator.w3.org/feed/docs/atom.html
  let atomFeedXml = `
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>TODO</title>
    <link href="TODO" rel="self"/>
    <link href="TODO"/>
    <updated>TODO</updated>
    <id>TODO</id>
  `

  // TODO: format DateTime to `YYYY-MM-DDThh:mm:ss.000Z`
  feeds.forEach((f) => {
    const u = `${url}${f.link}/`;
    atomFeedXml += `
      <entry>
        <title>${url}${f.title}</title>
        <link href="${u}" />
        <id>${u}</id>
        <published>${f.published}</published>
        <updated>${f.updated}</updated>
      </entry>
    `
  });
  return atomFeedXml += '</feed>';
}
