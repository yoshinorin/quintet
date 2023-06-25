import { Article } from "./article"

export interface SeriesResponse {
  id: string,
  name: string,
  title: number,
  description: string
}

export type Series = SeriesResponse

export interface SeriresWithArticlesResponse {
  id: string,
  name: string,
  title: number,
  description: string,
  articles: Array<Article>
}

export type SeriresWithArticles = SeriresWithArticlesResponse
