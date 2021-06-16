export interface Content {
  path: String,
  title: String,
  content: String,
  publishedAt: String,
  updatedAt: String
}

export interface ContentResponse {
  path: String,
  title: String,
  htmlContent: String,
  publishedAt: number,
  updatedAt: number
}
