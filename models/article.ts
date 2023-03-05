export interface Article {
  path: string,
  title: string,
  content: string,
  publishedAt: number,
  updatedAt: number
}

export interface ArticleResponse {
  path: string,
  title: string,
  content: string,
  publishedAt: number,
  updatedAt: number
}

export interface ArticleResponseWithCount {
  count: number,
  articles: Array<ArticleResponse>
}
