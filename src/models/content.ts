import { ExternalResources } from './externalResource';
import { Tag } from './tag';

export interface Content {
  id: string,
  title: string,
  robotsAttributes: string,
  externalResources: Array<ExternalResources>,
  tags?: Array<Tag>,
  description: string,
  content: string,
  length: number,
  authorName: string,
  publishedAt: number,
  updatedAt: number
}

export type ContentResponse = Content;

// TODO: Rename
export interface ContentResponseWithFetchResponse {
  res: Response,
  body: Content
}

export interface ContentCover {
  title: string,
  tags?: Array<Tag>,
  publishedAt: number,
}

export interface ContentMeta {
  id: string,
  robots: string,
  words: number,
  shouldInjectResources: Array<ExternalResources>,
  tags: Array<Tag>,
  authorName: string,
  publishedAt: number,
  updatedAt: number
}
