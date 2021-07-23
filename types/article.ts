export interface Article {
  path: string,
  title: string,
  content: string,
  publishedAt: string,
  updatedAt: string
}

export interface ArticleResponse {
  path: string,
  title: string,
  content: string,
  publishedAt: number,
  updatedAt: number
}
