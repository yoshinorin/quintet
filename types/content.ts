import { ExternalResources } from './externalResource';
import { Tag } from './tag';

export interface Content {
  title: string,
  robotsAttributes: string,
  externalResources: Array<ExternalResources>,
  tags: Array<Tag>,
  description: string,
  content: string,
  authorName: string,
  publishedAt: number,
  updatedAt: number
}

export interface ContentResponse {
  title: string,
  robotsAttributes: string,
  externalResources: Array<ExternalResources>,
  tags: Array<Tag>,
  description: string,
  content: string,
  authorName: string,
  publishedAt: number,
  updatedAt: number
}

export interface ContentCover {
  title: string,
  tags: Array<Tag> | null,
  publishedAt: number,
}
