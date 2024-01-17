import { expect, test } from 'vitest'
import { generateFeedsString } from '../../../src/services/feeds';;
import { Feed } from '../../../src/models/feed';

test('generate sitemap.xml', async () => {

  const data: Array<Feed> = [
    {
      "title": "Standard nested post",
      "link": "/articles/nested/standard/",
      "id": "/articles/nested/standard/",
      "published": 1705489274,
      "updated": 1705492983
    },
    {
      "title": "Empty robots",
      "link": "/articles/nested/empty-robots/",
      "id": "/articles/nested/empty-robots/",
      "published": 1705406325,
      "updated": 1705490022
    },
    {
      "title": "Empty tags",
      "link": "/articles/nested/empty-tags/",
      "id": "/articles/nested/empty-tags/",
      "published": 1705315068,
      "updated": 1888888888
    },
    {
      "title": "With externalResources",
      "link": "/articles/nested/with-externalresources/",
      "id": "/articles/nested/with-externalresources/",
      "published": 1705239702,
      "updated": 1705241495
    },
    {
      "title": "Partially robots",
      "link": "/articles/nested/partially-robots/",
      "id": "/articles/nested/partially-robots/",
      "published": 1705236309,
      "updated": 1705239665
    }
  ]

  const result = await generateFeedsString('https://example.com', data);
  expect(result.replace(/\s/g,"")).toEqual(
    `<feed xmlns="http://www.w3.org/2005/Atom">
    <title>yourSiteName</title>
    <link href="https://example.com/feeds/index.xml" rel="self"/>
    <link href="https://example.com"/>
    <updated>2024-01-17T12:03:03.000Z</updated>
    <id>https://example.com</id>
    <author>
    <name>john doe</name>
    </author>
    <entry>
    <title>Standard nested post</title>
    <link href="https://example.com/articles/nested/standard/"/>
    <id>https://example.com/articles/nested/standard/</id>
    <published>2024-01-17T11:01:14.000Z</published>
    <updated>2024-01-17T12:03:03.000Z</updated>
    </entry>
    <entry>
    <title>Empty robots</title>
    <link href="https://example.com/articles/nested/empty-robots/"/>
    <id>https://example.com/articles/nested/empty-robots/</id>
    <published>2024-01-16T11:58:45.000Z</published>
    <updated>2024-01-17T11:13:42.000Z</updated>
    </entry>
    <entry>
    <title>Empty tags</title>
    <link href="https://example.com/articles/nested/empty-tags/"/>
    <id>https://example.com/articles/nested/empty-tags/</id>
    <published>2024-01-15T10:37:48.000Z</published>
    <updated>2029-11-09T03:21:28.000Z</updated>
    </entry>
    <entry>
    <title>With externalResources</title>
    <link href="https://example.com/articles/nested/with-externalresources/"/>
    <id>https://example.com/articles/nested/with-externalresources/</id>
    <published>2024-01-14T13:41:42.000Z</published>
    <updated>2024-01-14T14:11:35.000Z</updated>
    </entry>
    <entry>
    <title>Partially robots</title>
    <link href="https://example.com/articles/nested/partially-robots/"/>
    <id>https://example.com/articles/nested/partially-robots/</id>
    <published>2024-01-14T12:45:09.000Z</published>
    <updated>2024-01-14T13:41:05.000Z</updated>
    </entry>
    </feed>
    `.replace(/\s/g,"")
  );
});
