import { ExternalResources } from './externalResource';

export interface Content {
  title: string,
  robotsAttributes: string,
  externalResources: ExternalResources,
  content: string,
  publishedAt: string
}

export interface ContentResponse {
  title: string,
  robotsAttributes: string,
  externalResources: ExternalResources,
  content: string,
  publishedAt: number
}
