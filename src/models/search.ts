export interface SearchResponse {
  path: string;
  title: string;
  content: string;
  publishedAt: number;
  updatedAt: number;
}

export interface SearchResponseWithCount {
  count: number;
  contents: Array<SearchResponse>;
}
