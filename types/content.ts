import { ExternalResources } from './externalResource';
import { Tag } from './tag';

export interface Content {
  title: string,
  robotsAttributes: string,
  externalResources: ExternalResources,
  tags: Array<Tag>,
  content: string,
  publishedAt: string
}

export interface ContentResponse {
  title: string,
  robotsAttributes: string,
  externalResources: ExternalResources,
  tags: Array<Tag>,
  content: string,
  publishedAt: number
}

export interface ContentCover {
  title: string,
  tags: Array<Tag> | null,
  publishedAt: string,
}
