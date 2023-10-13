export interface Article {
  path: string,
  title: string,
  content: string,
  publishedAt: number,
  updatedAt: number
}

export type ArticleResponse = Article

export interface ArticleResponseWithCount {
  count: number,
  articles: Array<ArticleResponse>
}
