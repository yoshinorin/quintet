import { Article } from "./article"

export interface Series {
  id: string,
  name: string,
  title: number,
  description: string
}

export type SeriesResponse = Series

export interface SeriresWithArticles {
  id: string,
  name: string,
  title: number,
  description: string,
  articles: Array<Article>
}

export type SeriresWithArticlesResponse = SeriresWithArticles

