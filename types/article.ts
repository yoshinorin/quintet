export interface Article {
  path: String,
  title: String,
  content: String,
  publishedAt: String,
  updatedAt: String
}

export interface ArticleResponse {
  path: String,
  title: String,
  content: String,
  publishedAt: number,
  updatedAt: number
}
